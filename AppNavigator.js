import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import CreateAccountScreen from './CreateAccountScreen';
import HomeScreen from './HomeScreen';
// import MapScreen from './MapScreen';
import ProfileScreen from './ProfileScreen';
import NotificationScreen from './NotificationScreen';
import LocationScreen from './LocationScreen';
import SettingsScreen from './SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerShown: false}}/>
        <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} options={{headerShown: false}} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name='LocationScreen' component={LocationScreen} options={{title: "Add Location"}}/>
        <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
