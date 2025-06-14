import { Button } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";

interface GetButtonProps<T, U> {
  onSuccess: (data: { firstResultData: T; secondResultData: U }) => void;
  handleHeaderTypeChange: () => void;
  firstQuery: UseQueryResult<T, Error>;
  secondQuery?: UseQueryResult<U, Error>;
}

export const GetButton = <T, U>({
  onSuccess,
  handleHeaderTypeChange,
  firstQuery,
  secondQuery,
}: GetButtonProps<T, U>) => {
  const handleClick = async () => {
    const [firstResult, secondResult] = await Promise.all([
      firstQuery.refetch(),
      secondQuery?.refetch(),
    ]);

    if (firstResult.error || secondResult?.error) {
      return;
    }

    onSuccess({
      firstResultData: firstResult.data as T,
      secondResultData: secondResult?.data as U,
    });
  };

  const isPending = firstQuery.isFetching || secondQuery?.isFetching;

  return (
    <Button
      variant="contained"
      fullWidth
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
