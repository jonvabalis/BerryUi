import { Button } from "@mui/material";
import { UseMutationResult } from "@tanstack/react-query";

interface CreateButtonProps<T> {
  data: T;
  onSuccess: () => void;
  onError: (error: Error) => void;
  createMutation: UseMutationResult<string, Error, T, unknown>;
  text: string;
}

export const CreateButton = <T,>({
  data,
  onSuccess,
  onError,
  createMutation,
  text,
}: CreateButtonProps<T>) => {
  const handleClick = () => {
    createMutation.mutate(data, {
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
      disabled={createMutation.isPending}
    >
      {createMutation.isPending ? `Creating ${text}...` : `Create ${text}`}
    </Button>
  );
};
