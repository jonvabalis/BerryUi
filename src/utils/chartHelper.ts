import { CollectionStatisticsLine } from "../apiInterfaces/statistics/CollectionStatisticsLine";

export interface HarvestSaleDataEntry {
  time: string;
  count: number;
}

export interface HarvestSaleChartData {
  harvests: HarvestSaleDataEntry[];
  salesKilograms: HarvestSaleDataEntry[];
  salesTotalPrices: HarvestSaleDataEntry[];
}

export default function getChartData(
  sourceData: Record<string, CollectionStatisticsLine>
): HarvestSaleChartData {
  const harvests: HarvestSaleDataEntry[] = [];
  const salesKilograms: HarvestSaleDataEntry[] = [];
  const salesTotalPrices: HarvestSaleDataEntry[] = [];

  if (sourceData && typeof sourceData === "object") {
    const timeEntries = Object.keys(sourceData);

    for (const timeEntry of timeEntries) {
      const timeData = sourceData[timeEntry];

      if (timeData) {
        harvests.push({
          time: timeEntry,
          count: timeData.harvestKilograms,
        });
        salesKilograms.push({
          time: timeEntry,
          count: timeData.saleKilograms,
        });
        salesTotalPrices.push({
          time: timeEntry,
          count: timeData.saleTotalPrice,
        });
      }
    }
  }

  return {
    harvests,
    salesKilograms,
    salesTotalPrices,
  };
}
