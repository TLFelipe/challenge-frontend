import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    dataGrid: {
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    },
    container: {
        height: 650,
        width: '80%',
        textAlign: 'right',
        margin: 'auto',
    },
}))