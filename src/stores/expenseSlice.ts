import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Expense } from "../interfaces/expense";
import myAxios from "../helpers/axios";
import { IncomeExpense } from "../interfaces/incomeExpense";

const expenses: [Expense] = [
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

export const getExpenseSourcesAsync = createAsyncThunk(
  "expense/getExpenseSources",
  async (token: string | null) => {
    const response = await myAxios.get(`/expense-source`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  }
);

export const createNewExpenseAsync = createAsyncThunk(
  "expense/createNewExpense",
  async (data: { expenseData: IncomeExpense; token: string | null }) => {
    await myAxios.post(`/expense`, data.expenseData, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
  }
);

export const deleteExpenseAsync = createAsyncThunk(
  "expense/deleteExpense",
  async (data: { expenseId: number; token: string | null }) => {
    await myAxios.delete(`/expense/${data.expenseId}`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
  }
);

export const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: expenses,
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

        state.expenses = newRecords;
      })
      .addCase(getExpenseListAsync.rejected, (_, action) => {
        console.error("getExpenseList, error", action.error);
        throw action.error;
      })
      // expenseSources
      .addCase(getExpenseSourcesAsync.fulfilled, (state, action) => {
        state.expenseSources = action.payload;
      })
      .addCase(getExpenseSourcesAsync.rejected, (_, action) => {
        console.error("getExpenseSources, error", action.error);
        throw action.error;
      })
      // add new expense
      .addCase(createNewExpenseAsync.rejected, (_, action) => {
        console.error("Create new expense, error", action.error);
        throw action.error;
      })
      // delete expense
      .addCase(deleteExpenseAsync.rejected, (_, action) => {
        console.error("Delete expense, error", action.error);
        throw action.error;
      });
  },
});

export default expenseSlice.reducer;
