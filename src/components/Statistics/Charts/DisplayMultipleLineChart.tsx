import { useTheme } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ComparisonEntry } from "../../../api/statistics/useGetCompareByYearStatistics";
import { useMemo } from "react";
import { findOverallMaxChartValue } from "../../../utils/chartHelper";
import ChartContainer from "./ChartContainer";

interface DisplayLineChartProps {
  chartName: string;
  chartData: ComparisonEntry[];
  xAxisLabel: string;
  yAxisLabel: string;
  years: number[];
}

export default function DisplayMultipleLineChart({
  chartName,
  chartData,
  xAxisLabel,
  yAxisLabel,
  years,
}: DisplayLineChartProps) {
  const theme = useTheme();
  const maxYAxisDomain = useMemo(
    () => findOverallMaxChartValue(chartData),
    [chartData]
  );
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
          domain={[0, maxYAxisDomain]}
          allowDataOverflow={true}
        />
        <Tooltip
          formatter={(value, name) => {
            return [`${value} ${yAxisLabel}`, name];
          }}
          labelStyle={{
            fontWeight: "bold",
            color: theme.palette.text.primary,
            marginBottom: "4px",
          }}
          animationDuration={1}
        />
        {years.map((year, index) => {
          const color = `hsl(${(index * 360) / years.length + 1}, 70%, 50%)`;

          return (
            <Line
              key={`line_${year}`}
              type="monotone"
              dataKey={year}
              stroke={color}
              activeDot={{ r: 8 }}
              isAnimationActive={false}
              dot={false}
            />
          );
        })}
        <Legend
          wrapperStyle={{
            paddingTop: "24px",
            marginLeft: "24px",
          }}
        />
      </LineChart>
    </ChartContainer>
  );
}
