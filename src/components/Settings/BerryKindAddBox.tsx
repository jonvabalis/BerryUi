import { Button, Grid2 } from "@mui/material";
import { BoxPaper } from "../Reusable/BoxPaper";
import { ChangeEvent, useState } from "react";
import { TextField } from "../Reusable/TextField";
import { useCreateBerryKind } from "../../api/berryKinds/useCreateBerryKind";
import { toast } from "react-toastify";
import { getBerryType } from "../../utils/berryTypeHelper";
import ConfirmationDialog from "../Reusable/ConfirmationDialog";

export default function BerryKindAddBox() {
  const createBerryKindMutation = useCreateBerryKind();
  const [berryKindText, setBerryKindText] = useState("");
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);

  const handleBerryKindChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBerryKindText(value);
  };

  const handleBerryKindSubmit = async () => {
    await createBerryKindMutation.mutateAsync(
      {
        berryTypeId: getBerryType().id,
        kind: berryKindText,
      },
      {
        onSuccess: () => {
          toast.success(`Berry kind ${berryKindText} created succesfully!`);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );

    handleConfirmWindowClose();
  };

  const handleConfirmWindowClose = () => {
    setConfirmWindowOpen(false);
  };

  const handleConfirmWindowOpen = () => {
    setConfirmWindowOpen(true);
  };

  return (
    <>
      <BoxPaper>
        <Grid2 container spacing={4}>
          <Grid2
            container
            spacing={1}
            size={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              text={berryKindText}
              handleChange={handleBerryKindChange}
              label="Berry kind"
            />
          </Grid2>
          <Grid2
            container
            spacing={1}
            size={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              onClick={handleConfirmWindowOpen}
              disabled={createBerryKindMutation.isPending}
            >
              {createBerryKindMutation.isPending
                ? `Adding new berry kind...`
                : `Add new berry kind`}
            </Button>
          </Grid2>
        </Grid2>
      </BoxPaper>
      <ConfirmationDialog
        dialogTitleText={"Berry kind"}
        dialogContentText={`Do you really want to add berry kind ${berryKindText}?`}
        cancelText={"Cancel"}
        submitText={"Submit"}
        dialogOpen={confirmWindowOpen}
        handleDialogClose={handleConfirmWindowClose}
        handleSubmitPress={handleBerryKindSubmit}
        submitColor="success"
      />
    </>
  );
}
