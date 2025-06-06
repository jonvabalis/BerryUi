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

interface ChartTitleParams {
  metricName: string;
  radioValue: string;
  year: number;
  month: number;
}

export const getChartTitle = ({
  metricName,
  radioValue,
  year,
  month,
}: ChartTitleParams): string => {
  const timePeriodString =
    radioValue === "alltime"
      ? "all-time"
      : year === 0 && month !== 0
      ? `in month ${month < 10 ? `0${month}` : month} total`
      : month === 0
      ? `in ${year}`
      : `in ${year}-${month < 10 ? `0${month}` : month}`;

  return `${metricName} ${timePeriodString}`;
};
