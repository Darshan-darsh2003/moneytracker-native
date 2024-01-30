// src/redux/actions.ts
import { updateCurrentBalance } from "./slices/dataSlice";

export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
export const fetchDataSuccess = (data: any) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});
export const fetchDataFailure = (error: any) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const DELETE_TRANSACTION_REQUEST = "DELETE_TRANSACTION_REQUEST";
export const DELETE_TRANSACTION_SUCCESS = "DELETE_TRANSACTION_SUCCESS";
export const DELETE_TRANSACTION_FAILURE = "DELETE_TRANSACTION_FAILURE";

export const deleteTransactionRequest = () => ({
  type: DELETE_TRANSACTION_REQUEST,
});
export const deleteTransactionSuccess = (id: number) => ({
  type: DELETE_TRANSACTION_SUCCESS,
  payload: id,
});
export const deleteTransactionFailure = (error: any) => ({
  type: DELETE_TRANSACTION_FAILURE,
  payload: error,
});
export const updateCurrentBalanceAction =
  (newBalance: number) => (dispatch: any) => {
    dispatch(updateCurrentBalance(newBalance));
  };
