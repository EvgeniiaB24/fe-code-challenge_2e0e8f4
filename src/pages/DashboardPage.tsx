import { ReactElement, useEffect, useState } from "react"
import { Box, makeStyles, useTheme } from "@material-ui/core"
import { DataGrid, GridColDef } from "@material-ui/data-grid"
import Loader from 'react-loader-spinner'
import {FetchShipmentsDashboardResult,fetchShipmentsDashboard} from "../data/fetch-dashboard-data"
 
const COLUMNES: GridColDef[] = [
    {
        field: 'currentWeek',
        width: 250,
        renderHeader: () => {
        return (
        <h4>Current Week</h4>
        )}
        },
    {
        field: 'weekDays',
        headerName: 'Day of the Week',
        width: 200
    },
    {
        field: 'houseBillNumber',
        headerName: 'House Bill Number',
        width: 200
    }, 
    {
        field: 'client',
        headerName: 'Client',
        width: 300
    },

    {
        field: 'arrivalDate',
        headerName: 'Date of Arrival',
        width: 200
    },
    {
        field: 'destination',
        headerName: 'Destination',
        width: 400
    },
]

const useStyles = makeStyles({
    grid: {
        marginInline: 16,
        height: '100%',
        display: "flex",
        flexDirection: "column-reverse"
    },
    loader: {
        margin: 'auto',
        width: 'fit-content',
        marginTop: 200
    }
})

type LoadingResult = {
    status: 'LOADING'
}
const INITIAL_RESULT: LoadingResult = {
    status: 'LOADING'
}

export const DashboardPage: React.FC = () => {
    const classes = useStyles()
    const theme = useTheme()

    const [fetchShipmentsResultDashboard, setFetchShipmentsResultDashboard] = useState <FetchShipmentsDashboardResult | LoadingResult>(INITIAL_RESULT)
    useEffect(() => {
        fetchShipmentsDashboard().then(result => setFetchShipmentsResultDashboard(result))
    }, [])

    let component: ReactElement
    switch (fetchShipmentsResultDashboard.status) {
        case 'SUCCESS':
            component = <DataGrid
                className={classes.grid}
                autoPageSize
                rows={fetchShipmentsResultDashboard.shipments}
                columns={COLUMNES}
                pagination={true}
                // // pageSize={20}
                disableSelectionOnClick
            />
            break;
 
        case 'LOADING':
            component = <Box className={classes.loader}>
                <Loader type="Grid" color={theme.palette.primary.main} />
            </Box >
            break
        case 'ERROR':
            component = <p>Error</p>
            break
    }

    return component
}