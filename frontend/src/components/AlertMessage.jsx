import Alert from '@mui/material/Alert';

const AlertMessage = ({ message = "this is an alert message" }) => {
  return (
    <>
      <Alert variant="filled" severity="error">
        {message}
      </Alert>
    </>
  )
}

export default AlertMessage