import Alert from '@mui/material/Alert';

const AlertMessage = ({ message, color="error" }) => {
  return (
    <>
      <Alert variant="filled" severity={color}>
        {message}
      </Alert>
    </>
  )
}

export default AlertMessage