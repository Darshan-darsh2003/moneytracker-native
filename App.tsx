// App.tsx

import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import AddTransactionScreen from "./screens/AddTransactionScreen";
import CurrentBalanceScreen from "./screens/CurrentBalanceScreen";
import LoansScreen from "./screens/LoansScreen";
import { createTable } from "./database";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function App() {
  createTable();

  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="AddTransaction"
              component={AddTransactionScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="add-circle" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="CurrentBalance"
              component={CurrentBalanceScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="wallet" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Loans"
              component={LoansScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="cash" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}

export default App;
