export interface Income {
  id: number | null
  name: string | null
  amount: number | null
  date: Date | null
  incomeSource: {
    id: number | null
    name: string | null
  }
  userId: number | null
}
