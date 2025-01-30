import { Button } from "@mui/material";
import { SaleCreate, useCreateSale } from "../../api/sales/useCreateSale";

interface SaleButtonProps {
  saleData: SaleCreate;
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const CreateSaleButton = ({
  saleData,
  onSuccess,
  onError,
}: SaleButtonProps) => {
  const createSaleMutation = useCreateSale();

  const handleClick = () => {
    createSaleMutation.mutate(saleData, {
      onSuccess: () => {
        onSuccess();
      },
      onError: (error) => {
        onError(error);
      },
    });
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      disabled={createSaleMutation.isPending}
    >
      {createSaleMutation.isPending ? "Creating Sale..." : "Create Sale"}
    </Button>
  );
};
