// src/components/TransactionCard.tsx

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { styles } from "../styles";
import Toast from "react-native-toast-message";
import { deleteTransactionFromDatabase } from "../redux/services/dataService";

interface TransactionCardProps {
  transaction: {
    id: number;
    place: string;
    amount: number;
    date: string;
    reason?: string;
  };
  onDelete?: (id: any) => void; // Optional onDelete prop
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onDelete,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log(transaction.id);
    dispatch(deleteTransactionFromDatabase(transaction.id) as any);
    onDelete && onDelete(transaction.id);
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{transaction.place}</Text>
      <Text style={styles.cardText}>Amount: ₹ {transaction.amount}</Text>
      <Text style={styles.cardText}>Date: {transaction.date}</Text>
      {transaction.reason && (
        <Text style={styles.cardText}>Reason: {transaction.reason}</Text>
      )}

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionCard;
