import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import { CollectionStatisticsDto } from "../../apiInterfaces/statistics/CollectionStatisticsDto";
import { CostStatisticsDto } from "../../apiInterfaces/statistics/CostStatisticsDto";

interface TableProps<T> {
  data: T | undefined;
  header: string[];
}

const tableRowStyle = {
  "& > td, & > th": {
    color: "primary.contrastText",
  },
};

const addTableCells = (dataArray: number[]) => {
  return dataArray.map((value, index) => (
    <TableCell key={index}>
      {dataArray.length - 1 !== index ? value : formatCurrency(Number(value))}
    </TableCell>
  ));
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("lt-LT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};

const StatisticsTable = <
  T extends CollectionStatisticsDto | CostStatisticsDto
>({
  data,
  header,
}: TableProps<T>) => {
  if (!data) {
    return <p>Please select the desired filter for search</p>;
  }

  const dataArray = Object.keys(data.data).map((key) => {
    const row = data.data[key];
    const mappedRow: number[] = Object.values(row);

    return {
      id: key,
      values: mappedRow,
    };
  });

  const sumArray: number[] = Object.values(data.sum);

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 800, margin: "auto", mt: 3 }}
    >
      <Table
        sx={{
          backgroundColor: "primary.dark",
        }}
      >
        <TableHead>
          <TableRow sx={{ tableRowStyle }}>
            {header.map((headerElement) => (
              <TableCell key={headerElement}>{headerElement}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataArray.map((row) => (
            <TableRow key={row.id} hover sx={{ tableRowStyle }}>
              <TableCell>{row.id}</TableCell>
              {addTableCells(row.values)}
            </TableRow>
          ))}
          <TableRow sx={{ tableRowStyle }}>
            <TableCell>Total</TableCell>
            {addTableCells(sumArray)}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatisticsTable;
