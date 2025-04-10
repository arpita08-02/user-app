import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import CreateAccountScreen from './CreateAccountScreen';
import SettingsScreen from './SettingsScreen';
import AddressListScreen from './AddressListScreen';
import AddressFormScreen from './AddressFormScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SignupScreen" 
        component={SignupScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CreateAccountScreen" 
        component={CreateAccountScreen} 
        options={{ headerShown: false }}
      />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;