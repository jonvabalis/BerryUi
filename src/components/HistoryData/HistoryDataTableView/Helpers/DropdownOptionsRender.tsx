import MenuItem from "@mui/material/MenuItem/MenuItem";

export const renderDropdownOptions = (
  options: { value: string; text: string }[] | undefined
) => {
  return options?.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.text}
    </MenuItem>
  ));
};
