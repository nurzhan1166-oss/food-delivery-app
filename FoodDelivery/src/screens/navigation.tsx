
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import VerificationScreen from './VerificationScreen';
import LocationScreen from './LocationScreen';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import CartScreen from './CartScreen';
import ProfileScreen from './ProfileScreen';
import RecipeDetailScreen from './RecipeDetailScreen';
import PersonalInformationScreen from './account/PersonalInformationScreen';
import DeliveryAddressesScreen from './account/DeliveryAddressesScreen';
import PaymentMethodsScreen from './account/PaymentMethodsScreen';
import SettingsScreen from './account/SettingsScreen';
import { HomeProvider } from './home/HomeContext';
import type { Recipe } from './home/types';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Verification: undefined;
  Location: undefined;
  Home: undefined;
  Search: undefined;
  Cart: undefined;
  Profile: undefined;
  RecipeDetail: { recipe: Recipe };
  PersonalInformation: undefined;
  DeliveryAddresses: undefined;
  PaymentMethods: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <HomeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
          <Stack.Screen name="PersonalInformation" component={PersonalInformationScreen} />
          <Stack.Screen name="DeliveryAddresses" component={DeliveryAddressesScreen} />
          <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </HomeProvider>
  );
}
