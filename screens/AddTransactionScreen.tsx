// AddTransactionScreen.tsx

import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";
import { styles } from "../styles";
import Toast from "react-native-toast-message"; // Import the library
import { fetchDataFromDatabase } from "../redux/services/dataService";
import { db } from "../database";

const AddTransactionScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [place, setPlace] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();

  const addTransaction = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toDateString()} ${currentDate.toLocaleTimeString()}`;

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO transactions (place, amount, date, reason) VALUES (?, ?, ?, ?)",
        [place, amount, formattedDate, reason],
        (_, result) => {
          if (result.insertId) {
            // Successfully inserted
            Toast.show({
              type: "success",
              text1: "Transaction added successfully!",
            });

            // Clear inputs after success
            setPlace("");
            setAmount("");
            setReason("");

            // Fetch data again after adding a transaction
            dispatch(fetchDataFromDatabase() as any);
          } else {
            // Error in insertion
            Toast.show({
              type: "error",
              text1: "Error adding transaction. Please try again.",
            });
          }
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Place of Spending:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Place"
        value={place}
        onChangeText={(text) => setPlace(text)}
      />

      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Reason (Optional):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Reason"
        value={reason}
        onChangeText={(text) => setReason(text)}
      />

      <Button title="Add Transaction" onPress={addTransaction} />
    </View>
  );
};

export default AddTransactionScreen;
