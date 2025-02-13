import { Button } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";

interface GetButtonProps<T, U> {
  onSuccess: (data: { firstResultData: T; secondResultData: U }) => void;
  onError: (error: Error) => void;
  handleHeaderTypeChange: () => void;
  firstQuery: UseQueryResult<T, Error>;
  secondQuery: UseQueryResult<U, Error>;
}

export const GetButton = <T, U>({
  onSuccess,
  onError,
  handleHeaderTypeChange,
  firstQuery,
  secondQuery,
}: GetButtonProps<T, U>) => {
  const handleClick = async () => {
    const [firstResult, secondResult] = await Promise.all([
      firstQuery.refetch(),
      secondQuery.refetch(),
    ]);

    if (firstResult.error) {
      onError(firstResult.error);
      return;
    } else if (secondResult.error) {
      onError(secondResult.error);
      return;
    }

    onSuccess({
      firstResultData: firstResult.data as T,
      secondResultData: secondResult.data as U,
    });
  };

  const isPending = firstQuery.isFetching || secondQuery.isFetching;

  return (
    <Button
      variant="contained"
      onClick={() => {
        handleClick();
        handleHeaderTypeChange();
      }}
      disabled={isPending}
    >
      {isPending ? `Searching...` : `Search`}
    </Button>
  );
};
