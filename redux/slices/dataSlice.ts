// src/redux/slices/dataSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  data: any[];
  loading: boolean;
  error: string | null;
  currentBalance: number;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
  currentBalance: 0,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // New actions for deleting transactions
    deleteTransactionStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteTransactionSuccess(state, action: PayloadAction<number>) {
      const deletedId = action.payload;
      console.log("Deleting transaction with ID:", deletedId);

      state.loading = false;
      state.data = state.data.filter(
        (transaction) => transaction.id !== deletedId
      );

      // Log the updated state
      console.log("Updated state after deletion:", state);
    },
    deleteTransactionFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateCurrentBalance(state, action: PayloadAction<number>) {
      state.currentBalance = action.payload;
    },
    updateTransactionRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateTransactionSuccess(state, action: PayloadAction<number>) {
      const updatedTransaction = action.payload;
      console.log("Updating transaction with ID:", updatedTransaction);
      state.loading = false;
      state.data = state.data.filter(
        (transaction) => transaction.id !== updatedTransaction
      );
      // Log the updated state
      console.log("Updated state after deletion:", state);
    },
    updateTransactionFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  deleteTransactionStart,
  deleteTransactionSuccess,
  deleteTransactionFailure,
  updateCurrentBalance,
  updateTransactionRequest,
  updateTransactionSuccess,
  updateTransactionFailure,
} = dataSlice.actions;
export default dataSlice.reducer;
