import { CircularProgress } from "@mui/material";

function LoadingState() {
  return (
    <div className="state-container">
      <CircularProgress />
      <p>Loading users...</p>
    </div>
  );
}

export default LoadingState;
