import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import CreateAccountScreen from './CreateAccountScreen';
import SettingsScreen from './SettingsScreen';
import AddressListScreen from './AddressListScreen';
import AddressFormScreen from './AddressFormScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SupportScreen from './SupportScreen';
import OrdersScreen from './OrdersScreen';
import MapScreen from './MapScreen';
import LocationScreen from './LocationScreen';
import DashboardScreen from './DashboardScreen';

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
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AddressListScreen" 
        component={AddressListScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AddressFormScreen" 
        component={AddressFormScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SupportScreen" 
        component={SupportScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="OrdersScreen" 
        component={OrdersScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="MapScreen" 
        component={MapScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="LocationScreen" 
        component={LocationScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="DashboardScreen" 
        component={DashboardScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;