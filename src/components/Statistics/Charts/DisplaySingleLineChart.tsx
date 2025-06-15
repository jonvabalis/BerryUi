import { useTheme } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { HarvestSaleDataEntry } from "../../../utils/chartHelper";
import ChartContainer from "./ChartContainer";

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
    <ChartContainer chartName={chartName}>
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
    </ChartContainer>
  );
}
