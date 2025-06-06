import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import { HistoryTotalBriefByDay } from "../../api/history/useGetBriefByDay";

const tableRowStyle = {
  "& > td, & > th": {
    color: "primary.contrastText",
  },
};

const addTableCells = (
  dataArray: {
    key: string;
    value: number;
  }[]
) => {
  return dataArray.map((element) => (
    <TableCell key={element.key}>
      {element.key !== "soldSum"
        ? `${element.value} kg`
        : formatCurrency(element.value)}
    </TableCell>
  ));
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("lt-LT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};

const header = ["Harvested", "Sold", "Sold for"];

export default function HistoryTotalDataBriefTable({
  data,
}: {
  data: HistoryTotalBriefByDay;
}) {
  const dataArray = Object.keys(data).map((key) => {
    return {
      key: key,
      value: data[key as keyof HistoryTotalBriefByDay],
    };
  });

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto" }}>
      <Table
        sx={{
          backgroundColor: "primary.dark",
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
          <TableRow hover sx={tableRowStyle}>
            {addTableCells(dataArray)}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
