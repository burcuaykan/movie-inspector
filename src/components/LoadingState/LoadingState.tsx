import { Box, CircularProgress } from "@mui/material";

function LoadingState() {
  return (
    <Box
      id="loading-state"
      display="flex"
      justifyContent="center"
      alignItems="center"
      m={2}
    >
      <CircularProgress />
    </Box>
  );
}
export default LoadingState;
