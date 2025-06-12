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
  handleCancelPress: () => void;
  handleSubmitPress: () => void;
}

export default function ConfirmationDialog({
  dialogTitleText,
  dialogContentText,
  cancelText,
  submitText,
  dialogOpen,
  handleDialogClose,
  handleCancelPress,
  handleSubmitPress,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <DialogTitle>{dialogTitleText}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelPress} color="primary">
          {cancelText}
        </Button>
        <Button onClick={handleSubmitPress} color="error">
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
