// LoansScreen.tsx

import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { db } from "../database";
import { styles } from "../styles";
import Toast from "react-native-toast-message"; // Import the library

const LoansScreen: React.FC = () => {
  const [borrower, setBorrower] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const addLoan = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO loans (borrower, amount, reason, date) VALUES (?, ?, ?, ?)",
        [borrower, amount, reason, new Date().toDateString()],
        (_, result) => {
          if (result.insertId) {
            // Successfully inserted
            Toast.show({
              type: "success",
              text1: "Loan added successfully!",
            });

            // Clear inputs after success
            setBorrower("");
            setAmount("");
            setReason("");
          } else {
            // Error in insertion
            Toast.show({
              type: "error",
              text1: "Error adding loan. Please try again.",
            });
          }
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Borrower:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Borrower"
        value={borrower}
        onChangeText={(text) => setBorrower(text)}
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

      <Button title="Add Loan" onPress={addLoan} />
    </View>
  );
};

export default LoansScreen;
