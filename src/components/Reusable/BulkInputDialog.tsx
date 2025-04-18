import React, { useState, useCallback, ReactElement, ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Stack,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useToast } from "../../hooks/useToast";
import { CreateButton } from "../Sale/CreateButton";
import { UseMutationResult } from "@tanstack/react-query";
interface BulkInputDialogProps<T extends Record<string, any>> {
  open: boolean;
  onClose: () => void;
  title: string;
  defaultItem: T;
  children: ReactElement | ReactElement[];
  addButtonText: string;
  itemLabel: string;
  createMutation: UseMutationResult<string, Error, T[], unknown>;
  toastSuccess: string;
}

export default function BulkInputDialog<T extends Record<string, any>>({
  open,
  onClose,
  title,
  defaultItem,
  children,
  addButtonText,
  itemLabel,
  createMutation,
  toastSuccess,
}: BulkInputDialogProps<T>): JSX.Element {
  const toast = useToast();
  const [items, setItems] = useState<T[]>([{ ...defaultItem }]);
  const [confirmWindowOpen, setConfirmWindowOpen] = useState<boolean>(false);

  const handleChange = (index: number) => (data: any) => {
    const newItems = [...items];
    newItems[index] = data;
    console.log(newItems);
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

  const handleSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
  }, []);

  const handleClose = useCallback(() => {
    setConfirmWindowOpen(true);
  }, []);

  const handleDiscardChanges = useCallback(() => {
    setItems([{ ...defaultItem }]);
    setConfirmWindowOpen(false);
    onClose();
  }, []);

  const handleConfirmWindowClose = useCallback(() => {
    setConfirmWindowOpen(false);
  }, []);

  const renderItemFields = useCallback(
    (itemIndex: number): ReactNode => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const newProps = {
            ...(child.props as Record<string, any>),
            onChange: handleChange(itemIndex),
            data: items[itemIndex],
          };
          return React.cloneElement(child, newProps as any);
        }
        return child;
      });
    },
    [handleAddItem, handleRemoveItem]
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={(_event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        disableEscapeKeyDown
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
          <CreateButton<T[]>
            data={items}
            onSuccess={() => {
              toast.success(toastSuccess);
            }}
            onError={(error) => {
              toast.error(error.message);
            }}
            text={"Harvest"}
            createMutation={createMutation}
            handleSubmit={handleSubmit}
          />
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
