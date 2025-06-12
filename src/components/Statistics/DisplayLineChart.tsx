import { Box, Typography, useTheme } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { HarvestSaleDataEntry } from "../../utils/chartHelper";

interface DisplayLineChartProps {
  chartName: string;
  chartData: HarvestSaleDataEntry[];
  xAxisLabel: string;
  yAxisLabel: string;
}

export default function DisplayLineChart({
  chartName,
  chartData,
  xAxisLabel,
  yAxisLabel,
}: DisplayLineChartProps) {
  const theme = useTheme();
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
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 15,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              label={{
                value: xAxisLabel,
                position: "insideBottom",
                offset: -10,
              }}
            />
            <YAxis
              label={{
                value: yAxisLabel,
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              formatter={(value) => {
                return [`${value} ${yAxisLabel}`, null];
              }}
              labelStyle={{
                fontWeight: "bold",
                color: theme.palette.text.primary,
                marginBottom: "4px",
              }}
              animationDuration={1}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke={theme.palette.primary.main}
              activeDot={{ r: 8 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
}
