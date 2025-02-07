import { CollectionStatisticsLine } from "./CollectionStatisticsLine";

export interface CollectionStatisticsDto {
  data: Record<string, CollectionStatisticsLine>;
  sum: CollectionStatisticsLine;
}
