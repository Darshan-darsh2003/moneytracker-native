// src/redux/services/dataService.ts

import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  updateTransactionSuccess,
  updateTransactionRequest,
  updateTransactionFailure,
} from "../slices/dataSlice";
import {
  deleteTransactionRequest,
  deleteTransactionSuccess,
  deleteTransactionFailure,
} from "../actions";
import { updateCurrentBalanceAction } from "../actions";

import { db } from "../../database";

export const fetchDataFromDatabase = () => async (dispatch: any) => {
  try {
    dispatch(fetchDataStart());
    const transactions = await queryDatabaseForData();
    dispatch(fetchDataSuccess(transactions));
  } catch (error: any) {
    dispatch(fetchDataFailure(error.message || "An error occurred"));
  }
};

const queryDatabaseForData = () => {
  return new Promise<any[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM transactions ORDER BY date DESC",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const deleteTransactionFromDatabase =
  (id: number) => async (dispatch: any) => {
    try {
      dispatch(deleteTransactionRequest());

      // Perform deletion logic based on your database structure
      console.log("Deleting transaction with ID:", id);

      // Example: Execute the SQL query to delete from the database
      let response = await db.transaction(async (tx) => {
        await tx.executeSql("DELETE FROM transactions WHERE id = ?", [id]);
      });

      // Log the response
      console.log("Response from deletion:", response);

      // Dispatch success action with the deleted transaction id
      dispatch(deleteTransactionSuccess(id));

      // Fetch data again after deleting a transaction
      dispatch(fetchDataFromDatabase());
    } catch (error: any) {
      dispatch(deleteTransactionFailure(error.message || "An error occurred"));
    }
  };

export const updateTransactionInDatabase =
  (id: number, updatedTransaction: any) => async (dispatch: any) => {
    try {
      dispatch(updateTransactionRequest());

      // Perform update logic based on your database structure
      console.log("Updating transaction with ID:", id);

      // Example: Execute the SQL query to update the transaction in the database
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "UPDATE transactions SET place = ?, amount = ?, date = ?, reason = ? WHERE id = ?",
          [
            updatedTransaction.place,
            updatedTransaction.amount,
            updatedTransaction.date,
            updatedTransaction.reason,
            id,
          ]
        );
      });

      // Dispatch success action with the updated transaction
      dispatch(updateTransactionSuccess(updatedTransaction));

      // Fetch data again after updating a transaction
      dispatch(fetchDataFromDatabase());
    } catch (error: any) {
      dispatch(updateTransactionFailure(error.message || "An error occurred"));
    }
  };

export const updateCurrentBalance =
  (newBalance: number) => async (dispatch: any) => {
    dispatch(updateCurrentBalanceAction(newBalance));
  };
