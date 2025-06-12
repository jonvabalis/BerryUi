import { MRT_Cell } from "material-react-table";
import { BaseTableDataLine } from "../../../../apiInterfaces/historyData/BaseTableDataLine";

const validateRequired = (value: string) => !!value.length;
const validateNumber = (value: number) => value > 0;

export const createDropdownCell = <T extends BaseTableDataLine>(
  options: { value: string; text: string }[] | undefined,
  textIfNull: string
) => {
  return ({ cell }: { cell: MRT_Cell<T, unknown> }) => {
    const optionId = cell.getValue<string>();
    const option = options?.find((opt) => opt.value === optionId);

    return option ? option.text : textIfNull;
  };
};

export const validateNumberField = (
  value: number,
  emptyFieldText: string
): string => {
  return !validateRequired(value.toString()) || isNaN(value)
    ? emptyFieldText
    : !validateNumber(value)
    ? "Please input positive value"
    : "";
};
