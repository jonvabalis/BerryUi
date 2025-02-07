export interface YearSelect {
  value: number;
  text: string;
}

export interface MonthSelect {
  value: number;
  text: string;
}

export const YEAR_SELECT_DATA: YearSelect[] = [
  { value: 2024, text: "2024" },
  { value: 2025, text: "2025" },
];

export const MONTH_SELECT_DATA: MonthSelect[] = [
  { value: 1, text: "January" },
  { value: 2, text: "February" },
  { value: 3, text: "March" },
  { value: 4, text: "April" },
  { value: 5, text: "May" },
  { value: 6, text: "June" },
  { value: 7, text: "July" },
  { value: 8, text: "August" },
  { value: 9, text: "September" },
  { value: 10, text: "October" },
  { value: 11, text: "November" },
  { value: 12, text: "December" },
];
