import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";
import { ResponsiveContainer } from "recharts";

interface ChartContainerProps {
  chartName: string;
  children: ReactElement;
}

export default function ChartContainer({
  chartName,
  children,
}: ChartContainerProps) {
  return (
    <>
      <Typography
        style={{
          margin: "0 0 20px 60px",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#666666",
        }}
      >
        {chartName}
      </Typography>
      <Box style={{ width: "100%", height: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </Box>
    </>
  );
}
