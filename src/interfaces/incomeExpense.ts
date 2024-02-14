export interface IncomeExpense {
  name: string | null;
  amount: number | null;
  date: string | Date | null;
  sourceId: number | null;
  userId?: number | null;
}
