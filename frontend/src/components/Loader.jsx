import { CircularProgress } from "@mui/material"
import { Box } from "@mui/material"

const Loader = () => {
    return <>
        <Box
            sx={{ display: 'flex' }}
            size={50}
            className="h-screen flex items-center justify-center"
        >
            <CircularProgress />
        </Box>
    </>
}

export default Loader