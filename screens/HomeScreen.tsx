// src/screens/HomeScreen.tsx

import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromDatabase } from "../redux/services/dataService";
import TransactionCard from "../components/TransactionCard";
import { RootState } from "../redux/reducers";
import { styles } from "../styles";

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, loading, error, currentBalance } = useSelector(
    (state: RootState) => state.data
  );

  useEffect(() => {
    dispatch(fetchDataFromDatabase() as any);
  }, [dispatch]);

  const handleDelete = (id: number) => {
    // Implement your delete logic here
    dispatch(fetchDataFromDatabase() as any);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TransactionCard
      transaction={item}
      onDelete={() => handleDelete(item.id)}
    />
  );

  // Calculate remaining balance
  const totalAmount = data.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
  const remainingBalance = currentBalance - totalAmount;

  const keyExtractor = (item: any) => item.id.toString();

  const renderHeader = () => (
    <View>
      <Text style={styles.pageTitle}>
        Current Balance: ₹ {remainingBalance.toFixed(2)}
      </Text>
      <Text style={styles.pageTitle}>Transactions:</Text>
    </View>
  );

  const renderFooter = () => (
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => navigation.navigate("AddTransaction")}
    >
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
    />
  );
};

export default HomeScreen;
