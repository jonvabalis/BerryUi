import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import { HistoryEmployeeBriefByDay } from "../../api/history/useGetBriefByDay";

const tableRowStyle = {
  "& > td, & > th": {
    color: "primary.contrastText",
  },
};

const addTableCells = (
  key: string,
  data: Record<string, HistoryEmployeeBriefByDay>
) => {
  return (
    <>
      <TableCell key={`${key}-1`}>{`${data[key].name}`}</TableCell>
      <TableCell key={`${key}-2`}>{`${data[key].harvestedCount} kg`}</TableCell>
      <TableCell key={`${key}-3`}>{`${data[key].soldCount} kg`}</TableCell>
    </>
  );
};

const header = ["Name", "Harvested", "Sold"];

export default function HistoryTotalDataBriefTable({
  data,
}: {
  data: Record<string, HistoryEmployeeBriefByDay>;
}) {
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
          {Object.keys(data).map((key) => (
            <TableRow key={key} hover sx={tableRowStyle}>
              {addTableCells(key, data)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
