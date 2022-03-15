import { format } from 'date-fns'
import { ShipmentDashboard } from "./Shipment-dashboard"
import { DASHBOARD_DATA } from './dashboard-data'

type ErrorResult = {
    status: 'ERROR'
    message: string
}

type SuccessResult = {
    status: 'SUCCESS'
    shipments: ShipmentDashboard[]
}

export type FetchShipmentsDashboardResult =
    | ErrorResult
    | SuccessResult


const milliToAdd = new Date().getTime() - new Date("3/14/2022").getTime()
const adjustDateStrings = (dateString: string): string => {
    const originalTimeInMilliss = new Date(dateString).getTime()
    const newTimeInMilliss = originalTimeInMilliss + milliToAdd
    const adjustedDates = new Date(newTimeInMilliss)
    return format(adjustedDates, 'MM/dd/yyyy')
}

const adjustShipmentsDates = (shipments: ShipmentDashboard[]): ShipmentDashboard[] =>  shipments.map(shipment => ({
    ...shipment,
    estimatedArrival: adjustDateStrings(shipment.arrivalDate),
}))


const FAILURE_RATIOS = 0.05

const setsTimeoutAsync = async (millis: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, millis))
}

export const fetchShipmentsDashboard = async (): Promise<FetchShipmentsDashboardResult> => {
    const waitTimeMilliss = 200 + 1800 * Math.random()
    await setsTimeoutAsync(waitTimeMilliss)
    const shouldFails = Math.random() < FAILURE_RATIOS
    if (shouldFails) {
        return {
            status: 'ERROR',
            message: 'Something went wrong'
        }
    }
    return {
        status: 'SUCCESS',
        shipments: adjustShipmentsDates(DASHBOARD_DATA)
    }
}