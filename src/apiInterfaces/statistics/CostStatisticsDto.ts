export interface CostStatisticsDto {
  data: Record<string, { costs: number }>;
  sum: number;
}
