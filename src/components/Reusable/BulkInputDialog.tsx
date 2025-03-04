import React, {
  useState,
  useEffect,
  useCallback,
  ReactElement,
  ReactNode,
} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  StandardTextFieldProps,
  Stack,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
interface BulkInputDialogProps<T extends Record<string, any>> {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: T[]) => void;
  title: string;
  defaultItem: T;
  children: ReactElement | ReactElement[];
  addButtonText: string;
  itemLabel: string;
}
interface FormFieldProps extends StandardTextFieldProps {
  name: string;
}

export default function BulkInputDialog<T extends Record<string, any>>({
  open,
  onClose,
  onSubmit,
  title,
  defaultItem,
  children,
  addButtonText,
  itemLabel,
}: BulkInputDialogProps<T>): JSX.Element {
  const [items, setItems] = useState<T[]>([{ ...defaultItem }]);
  const [confirmWindowOpen, setConfirmWindowOpen] = useState<boolean>(false);

  const handleChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const newItems = [...items];
      newItems[index] = { ...newItems[index], [name]: value };
      setItems(newItems);
    };

  const handleAddItem = () => {
    setItems([...items, { ...defaultItem }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems.length > 0 ? newItems : [{ ...defaultItem }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(items);
    onClose();
  };

  const handleClose = useCallback(() => {
    setConfirmWindowOpen(true);
  }, [onClose]);

  const handleDiscardChanges = () => {
    setConfirmWindowOpen(false);
    onClose();
  };

  const handleConfirmWindowClose = () => {
    setConfirmWindowOpen(false);
  };

  const isFormField = (
    element: React.ReactElement
  ): element is React.ReactElement<FormFieldProps> => {
    return element.props !== undefined;
  };

  const renderItemFields = (itemIndex: number): ReactNode => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && isFormField(child)) {
        const fieldName = child.props.name;
        return React.cloneElement(child, {
          onChange: handleChange(itemIndex),
          value: items[itemIndex][fieldName] || "",
          fullWidth: true,
          margin: "normal",
          ...child.props,
        });
      }
      return child;
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onSubmit={handleSubmit}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {items.map((_item, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Typography variant="subtitle1">
                  {itemLabel} #{index + 1}
                </Typography>

                {items.length > 1 && (
                  <IconButton
                    onClick={() => handleRemoveItem(index)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Stack>

              <Box sx={{ pl: 1 }}>{renderItemFields(index)}</Box>

              {index < items.length - 1 && <Divider sx={{ my: 2 }} />}
            </Box>
          ))}

          <Button
            startIcon={<AddIcon />}
            onClick={handleAddItem}
            variant="outlined"
            sx={{ mt: 2 }}
          >
            {addButtonText}
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmWindowOpen} onClose={handleConfirmWindowClose}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have unsaved changes. Are you sure you want to close this bulk
            input form? All your changes will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmWindowClose} color="primary">
            Continue Editing
          </Button>
          <Button onClick={handleDiscardChanges} color="error">
            Discard Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
