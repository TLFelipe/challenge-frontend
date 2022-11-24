import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    container: {
      position: 'absolute',
      top: '30%',
      left: '35%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white',
      border: '1px solid #e0e0e0',
      padding: '24px',
    },
    modalColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      width: '100%',
      justifyContent: 'space-between'
    },
    modalTwoFields: {
      width: '100%',
      fontSize: '14px',
      display: 'grid',
      columnGap: '32px',
      gap: '4px',
      gridTemplateColumns: '1fr 1fr',
    },
    modalContent: {
      width: '650px',
      fontSize: '14px',
      display: 'grid',
      columnGap: '48px',
      gridTemplateColumns: '1fr 1fr',
    },
    modalButton: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '16px',
    },
    textField: {
      width: '25ch',
    },
    title: {
      paddingBottom: '16px',
    },
}))