import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Income } from "../interfaces/income";
import myAxios from "../helpers/axios";

const income: [Income] = [
  {
    id: null,
    name: null,
    amount: null,
    date: null,
    incomeSource: {
      id: null,
      name: null,
    },
    userId: null,
  },
];

const singleIncome: Income = {
  id: null,
  name: null,
  amount: null,
  date: null,
  incomeSource: {
    id: null,
    name: null,
  },
  userId: null,
};

const incomeSources: [{ id: number | null; name: string | null }] = [
  {
    id: null,
    name: null,
  },
];

export const getIncomeListAsync = createAsyncThunk(
  "income/getIncomeList",
  async (data: { userId: number | null; token: string | null }) => {
    const response = await myAxios.get(`/income/user/${data.userId}`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });

    return response.data;
  }
);

export const incomeSlice = createSlice({
  name: "income",
  initialState: {
    income: income,
    singleIncome: singleIncome,
    incomeSources: incomeSources,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // incomeList
      .addCase(getIncomeListAsync.fulfilled, (state, action) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newRecords: [Income] = action.payload.map((item: any) => ({
          id: item.id,
          name: item.name,
          amount: item.amount,
          date: item.date,
          incomeSource: {
            id: item.incomeSource.id,
            name: item.incomeSource.name,
          },
          userId: item.user.id,
        }));

        state.income = newRecords;
      })
      .addCase(getIncomeListAsync.rejected, (_, action) => {
        console.error("getIncomeList, error", action.error);
        throw action.error;
      });
  },
});

// export const { test } = incomeSlice.actions;
export default incomeSlice.reducer;
