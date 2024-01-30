// CurrentBalanceScreen.tsx

import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentBalance } from "../redux/services/dataService";
import { RootState } from "../redux/reducers";
import { styles } from "../styles";

const CurrentBalanceScreen: React.FC = () => {
  const dispatch = useDispatch();
  const currentBalance = useSelector(
    (state: RootState) => state.data.currentBalance
  );

  const [newBalance, setNewBalance] = useState(currentBalance.toString());

  const handleUpdateBalance = () => {
    const updatedBalance = parseFloat(newBalance);

    if (!isNaN(updatedBalance)) {
      dispatch(updateCurrentBalance(updatedBalance) as any);
    } else {
      console.error("Invalid input. Please enter a valid number.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Balance:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter New Balance"
        value={newBalance}
        onChangeText={(text) => setNewBalance(text)}
        keyboardType="numeric"
      />
      <Button title="Update Balance" onPress={handleUpdateBalance} />
    </View>
  );
};

export default CurrentBalanceScreen;
