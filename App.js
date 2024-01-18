import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "./src/screens/Dashboard";
import {
  DASHBOARD,
  MANU_GENIA,
  WHATS_YOUR_NAME,
  FLAVIA,
} from "./src/constants/screens";
import ManuGenia from "./src/screens/ManuGenia";
import WhatsYourName from "./src/features/whatsyourname/screens/WhatsYourName";
import Flavia from "./src/screens/Flavia/Index";

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name={DASHBOARD}
        component={Dashboard}
        options={{ headerTitle: "Bad UX Animation Challenge" }}
      />
      <Stack.Screen
        name={MANU_GENIA}
        component={ManuGenia}
        options={{ headerTitle: "How Old Are You?" }}
      />
      <Stack.Screen
        name={WHATS_YOUR_NAME}
        component={WhatsYourName}
        options={{ headerTitle: "What's your name?" }}
      />
      <Stack.Screen
        name={FLAVIA}
        component={Flavia}
        options={{ headerTitle: "Flavia" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
