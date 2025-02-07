import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TableSortLabel,
  Paper,
} from "@mui/material";
import { CollectionStatisticsLine } from "../../apiInterfaces/statistics/CollectionStatisticsLine";
import { CollectionStatisticsDto } from "../../apiInterfaces/statistics/CollectionStatisticsDto";

interface TableProps {
  data: CollectionStatisticsDto | undefined;
}

const MuiTableComponent: React.FC<TableProps> = ({ data }) => {
  if (!data) {
    return <p>No data guys.</p>;
  }

  const dataArray = Object.keys(data.data).map((key) => ({
    id: key,
    ...data.data[key],
  }));

  const headers = ["id", "Kilograms harvested", "Kilograms sold", "Sold for"];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("lt-LT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

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
          <TableRow
            sx={{
              "& > td, & > th": {
                color: "primary.contrastText",
              },
            }}
          >
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataArray.map((row, index) => (
            <TableRow
              key={index}
              hover
              sx={{
                "& > td, & > th": {
                  color: "primary.contrastText",
                },
              }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.harvestKilograms}</TableCell>
              <TableCell>{row.saleKilograms}</TableCell>
              <TableCell>{formatCurrency(row.saleTotalPrice)}</TableCell>
            </TableRow>
          ))}
          <TableRow
            sx={{
              "& > td, & > th": {
                color: "primary.contrastText",
              },
            }}
          >
            <TableCell>Total</TableCell>
            <TableCell>{data.sum.harvestKilograms}</TableCell>
            <TableCell>{data.sum.saleKilograms}</TableCell>
            <TableCell>{formatCurrency(data.sum.saleTotalPrice)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MuiTableComponent;
