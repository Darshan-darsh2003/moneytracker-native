// database.js
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("moneyTracker.db");

const createTable = async () => {
  const database = await db;
  database.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, place TEXT, amount REAL, date TEXT, reason TEXT)",
      []
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS loans (id INTEGER PRIMARY KEY AUTOINCREMENT, borrower TEXT, amount REAL, reason TEXT, date TEXT)",
      []
    );
  });
};

export { db, createTable };
