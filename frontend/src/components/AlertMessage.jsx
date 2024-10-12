import Alert from '@mui/material/Alert';

const AlertMessage = ({ message }) => {
  return (
    <>
      <Alert variant="filled" severity="error">
        {message}
      </Alert>
    </>
  )
}

export default AlertMessage