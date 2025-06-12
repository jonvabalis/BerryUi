import { MRT_Cell } from "material-react-table";
import { BaseTableDataLine } from "../../../../apiInterfaces/historyData/BaseTableDataLine";

export const validateRequired = (value: string) => !!value.length;
export const validateNumber = (value: number) => value > 0;

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
