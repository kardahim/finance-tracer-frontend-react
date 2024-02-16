import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Income } from "../interfaces/income";
import myAxios from "../helpers/axios";
import { IncomeExpense } from "../interfaces/incomeExpense";

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

export const getIncomeSourcesAsync = createAsyncThunk(
  "income/getIncomeSources",
  async (token: string | null) => {
    const response = await myAxios.get(`/income-source`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  }
);

export const createNewIncomeAsync = createAsyncThunk(
  "income/createNewIncome",
  async (data: { incomeData: IncomeExpense; token: string | null }) => {
    await myAxios.post(`/income`, data.incomeData, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
  }
);

export const deleteIncomeAsync = createAsyncThunk(
  "income/deleteIncome",
  async (data: { incomeId: number; token: string | null }) => {
    await myAxios.delete(`/income/${data.incomeId}`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
  }
);

export const getIncomeByIdAsync = createAsyncThunk(
  "income/getIncomeById",
  async (data: { id: number; token: string | null }) => {
    const response = await myAxios.get(`/income/${data.id}`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });

    return response.data;
  }
);

export const editIncomeAsync = createAsyncThunk(
  "income/editIncome",
  async (data: { id: number; data: IncomeExpense; token: string | null }) => {
    await myAxios.put(`/income/${data.id}`, data.data, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
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
      })
      // incomeSources
      .addCase(getIncomeSourcesAsync.fulfilled, (state, action) => {
        state.incomeSources = action.payload;
      })
      .addCase(getIncomeSourcesAsync.rejected, (_, action) => {
        console.error("getIncomeSources, error", action.error);
        throw action.error;
      })
      // add new income
      .addCase(createNewIncomeAsync.rejected, (_, action) => {
        console.error("Refresh token, error", action.error);
        throw action.error;
      })
      // delete income
      .addCase(deleteIncomeAsync.rejected, (_, action) => {
        console.error("Delete income, error", action.error);
        throw action.error;
      })
      // getincome by id
      .addCase(getIncomeByIdAsync.fulfilled, (state, action) => {
        state.singleIncome.id = action.payload.id;
        state.singleIncome.name = action.payload.name;
        state.singleIncome.amount = action.payload.amount;
        state.singleIncome.date = action.payload.date;
        state.singleIncome.incomeSource.id = action.payload.incomeSource.id;
        state.singleIncome.incomeSource.name = action.payload.incomeSource.name;
        state.singleIncome.userId = action.payload.user.id;
      })
      .addCase(getIncomeByIdAsync.rejected, (_, action) => {
        console.error("get income by id, error", action.error);
        throw action.error;
      })
      // edit income
      .addCase(editIncomeAsync.rejected, (_, action) => {
        console.error("edit income, error", action.error);
        throw action.error;
      });
  },
});

// export const { test } = incomeSlice.actions;
export default incomeSlice.reducer;
