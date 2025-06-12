import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmationDialogProps {
  dialogTitleText: string;
  dialogContentText: string;
  cancelText: string;
  submitText: string;
  dialogOpen: boolean;
  handleDialogClose: () => void;
  handleSubmitPress: () => void;
  submitColor?: "error" | "success";
}

export default function ConfirmationDialog({
  dialogTitleText,
  dialogContentText,
  cancelText,
  submitText,
  dialogOpen,
  handleDialogClose,
  handleSubmitPress,
  submitColor = "error",
}: ConfirmationDialogProps) {
  return (
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <DialogTitle>{dialogTitleText}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          {cancelText}
        </Button>
        <Button onClick={handleSubmitPress} color={submitColor}>
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
