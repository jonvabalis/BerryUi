export interface SaleType {
  text: string;
  value: number;
}

export const SALETYPE_DATA: SaleType[] = [
  {
    text: "Local",
    value: 0,
  },
  {
    text: "Order",
    value: 1,
  },
];
