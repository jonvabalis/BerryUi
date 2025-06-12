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
  data: T;
  header: string[];
}

const tableRowStyle = {
  "& > td, & > th": {
    color: "primary.contrastText",
  },
};

const tableEndRowStyle = {
  "& > td, & > th": {
    color: "primary.contrastText",
    fontWeight: "bold",
    fontSize: "16px",
  },
};

const addTableCells = (dataArray: number[]) => {
  return dataArray.map((value, index) => (
    <TableCell key={index}>
      {dataArray.length - 1 !== index
        ? `${value} kg`
        : formatCurrency(Number(value))}
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
      sx={{ maxWidth: "800px", margin: "auto" }}
    >
      <Table
        sx={{
          backgroundColor: "primary.dark",
          tableLayout: "fixed",
        }}
      >
        <TableHead>
          <TableRow sx={{ tableRowStyle }}>
            {header.map((headerElement) => (
              <TableCell
                key={headerElement}
                sx={{
                  color: "primary.contrastText",
                  fontWeight: "bold",
                  wordBreak: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {headerElement}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataArray.map((row) => (
            <TableRow key={row.id} hover sx={tableRowStyle}>
              <TableCell>{row.id}</TableCell>
              {addTableCells(row.values)}
            </TableRow>
          ))}
          <TableRow sx={tableEndRowStyle}>
            <TableCell>Total</TableCell>
            {addTableCells(sumArray)}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatisticsTable;
