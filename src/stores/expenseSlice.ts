import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Expense } from "../interfaces/expense";
import myAxios from "../helpers/axios";

const expense: [Expense] = [
  {
    id: null,
    name: null,
    amount: null,
    date: null,
    expenseSource: {
      id: null,
      name: null,
    },
    userId: null,
  },
];

const singleExpense: Expense = {
  id: null,
  name: null,
  amount: null,
  date: null,
  expenseSource: {
    id: null,
    name: null,
  },
  userId: null,
};

const expenseSources: [{ id: number | null; name: string | null }] = [
  {
    id: null,
    name: null,
  },
];

export const getExpenseListAsync = createAsyncThunk(
  "expense/getExpenseList",
  async (data: { userId: number | null; token: string | null }) => {
    const response = await myAxios.get(`/expense/user/${data.userId}`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });

    return response.data;
  }
);

export const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expense: expense,
    singleExpense: singleExpense,
    expenseSources: expenseSources,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // expenseList
      .addCase(getExpenseListAsync.fulfilled, (state, action) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newRecords: [Expense] = action.payload.map((item: any) => ({
          id: item.id,
          name: item.name,
          amount: item.amount,
          date: item.date,
          expenseSource: {
            id: item.expenseSource.id,
            name: item.expenseSource.name,
          },
          userId: item.user.id,
        }));

        state.expense = newRecords;
      })
      .addCase(getExpenseListAsync.rejected, (_, action) => {
        console.error("getExpenseList, error", action.error);
        throw action.error;
      });
  },
});

export default expenseSlice.reducer;
