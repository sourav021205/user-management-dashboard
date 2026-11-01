import { Alert, Button } from "@mui/material";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="state-container">
      <Alert severity="error">{message}</Alert>
      <Button variant="contained" onClick={onRetry}>
        Try Again
      </Button>
    </div>
  );
}

export default ErrorState;
