export interface BulkHarvestCreate {
  kilograms: number;
  employeeId: string;
  berryTypeId: string;
  berryKindId: string | null;
  eventTime: Date;
}
