export interface Expense {
  id: number | null
  name: string | null
  amount: number | null
  date: Date | null
  expenseSource: {
    id: number | null
    name: string | null
  }
  userId: number | null
}
