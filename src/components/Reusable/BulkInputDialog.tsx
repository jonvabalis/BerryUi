import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { ChangeEvent, SetStateAction, useState } from "react";
import { text } from "stream/consumers";
import AgricultureIcon from "@mui/icons-material/Agriculture";

interface BulkInputDialogProps {
  open: boolean;
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}

export default function BulkInputDialog({
  open,
  onClose,
}: BulkInputDialogProps) {
  const [values, setValues] = useState<string[]>([]);
  const [text, setText] = useState("");

  const handleClose = () => {
    onClose;
    setValues([]);
  };

  const handleChangeText = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setText(e.target.value);
  };
  const addValue = () => {
    setValues([...values, ""]);
  };
  const handleValueChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    values[index] = e.target.value;
    console.log(values);
    setValues(values);
  };
  const deleteValue = (jump: string) => {
    setValues(values.filter((j) => j !== jump));
  };
  return (
    <>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Dialog</DialogTitle>
        <DialogContent>
          <DialogContentText>Sample Text.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={text}
            onChange={handleChangeText}
            label="Text"
            fullWidth
          />
          {values.map((jump, index) => (
            <Box key={"jump" + index}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={10}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Value"
                    value={jump || ""}
                    onChange={(e) => handleValueChange(index, e)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <Box
                    className="font-icon-wrapper"
                    onClick={() => deleteValue(jump)}
                  >
                    <IconButton aria-label="delete">
                      <AgricultureIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </DialogContent>
        <Button onClick={addValue} color="primary">
          Add
        </Button>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
