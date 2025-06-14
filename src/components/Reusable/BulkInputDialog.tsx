import React, {
  useState,
  useCallback,
  ReactElement,
  ReactNode,
  useRef,
} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useToast } from "../../hooks/useToast";
import { CreateButton } from "../Sale/CreateButton";
import { UseMutationResult } from "@tanstack/react-query";
import ConfirmationDialog from "./ConfirmationDialog";

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
  onRefetch?: () => Promise<void>;
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
  onRefetch,
}: BulkInputDialogProps<T>): JSX.Element {
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const [items, setItems] = useState<T[]>([
    { ...defaultItem, listId: uuidv4() },
  ]);
  const [confirmWindowOpen, setConfirmWindowOpen] = useState<boolean>(false);

  const handleItemDataChange = useCallback((index: number, newData: any) => {
    setItems((currentItems) => {
      const newItems = [...currentItems];
      newItems[index] = { ...newData, listId: currentItems[index].listId };
      return newItems;
    });
  }, []);

  const handleAddItem = useCallback(() => {
    setItems((currentItems) => [
      ...currentItems,
      { ...defaultItem, listId: uuidv4() },
    ]);
    setTimeout(() => {
      addButtonRef.current?.scrollIntoView({
        behavior: "auto",
        block: "nearest",
      });
    }, 0);
  }, [defaultItem]);

  const handleRemoveItem = useCallback(
    (index: number) => {
      setItems((currentItems) => {
        const updatedItems = [...currentItems];
        updatedItems.splice(index, 1);
        return updatedItems.length > 0 ? updatedItems : [{ ...defaultItem }];
      });
    },
    [defaultItem]
  );

  const handleSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItems([{ ...defaultItem, _internalId: uuidv4() }]);
    onClose();
    onRefetch?.();
  }, []);

  const handleCloseDialog = useCallback(() => {
    setConfirmWindowOpen(true);
  }, []);

  const handleDiscardChanges = useCallback(() => {
    setItems([{ ...defaultItem, _internalId: uuidv4() }]);
    setConfirmWindowOpen(false);
    onClose();
  }, [defaultItem, onClose]);

  const handleConfirmWindowClose = useCallback(() => {
    setConfirmWindowOpen(false);
  }, []);

  const renderItemFields = useCallback(
    (itemIndex: number): ReactNode => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const newProps = {
            ...(child.props as Record<string, any>),
            onChange: handleItemDataChange,
            itemIndex: itemIndex,
            data: items[itemIndex],
          };
          return React.cloneElement(child, newProps as any);
        }
        return child;
      });
    },
    [children, items, handleItemDataChange]
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={(_event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialog();
          }
        }}
        disableEscapeKeyDown
        maxWidth={false}
        sx={{
          width: "100%",
          maxWidth: "1000px",
          mx: "auto",
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {items.map((item, index) => (
            <Box
              key={item.listId || "defaultListId"}
              sx={{ mb: 3, width: "100%", maxWidth: "1000px", mx: "auto" }}
            >
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
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
              </Box>

              <Box key={`child-${item.listId}`}>{renderItemFields(index)}</Box>

              {index < items.length - 1 && <Divider sx={{ my: 2 }} />}
            </Box>
          ))}

          <Button
            ref={addButtonRef}
            startIcon={<AddIcon />}
            onClick={handleAddItem}
            variant="outlined"
            sx={{ mt: 2 }}
          >
            {addButtonText}
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Box>
            <CreateButton<T[]>
              data={items}
              onSuccess={() => {
                toast.success(toastSuccess);
              }}
              text={itemLabel}
              createMutation={createMutation}
              handleSubmit={handleSubmit}
            />
          </Box>
        </DialogActions>
      </Dialog>

      <ConfirmationDialog
        dialogTitleText={"Unsaved Changes"}
        dialogContentText={
          "You have unsaved changes. Are you sure you want to close this bulkinput form? All your changes will be lost."
        }
        cancelText={"Continue Editing"}
        submitText={"Discard Changes"}
        dialogOpen={confirmWindowOpen}
        handleDialogClose={handleConfirmWindowClose}
        handleSubmitPress={handleDiscardChanges}
      />
    </>
  );
}
