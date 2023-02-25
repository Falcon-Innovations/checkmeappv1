/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  Onboard,
  Register,
  Login,
  OTPVerification,
  ProfileOverview,
  AllBlogs,
} from '../screens';
import useGetOnboardingStatus from '../utility/checkIfFirstLaunch';
import { navigationRef } from './customNavigator';
import ResolveAuth from '../screens/auth/ResolveAuth';
import { COLORS } from '../utility';
import ScreenNavigator from './ScreenNavigator';

const Stack = createNativeStackNavigator();

function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
}

function BottomTabNavigator() {
  const Tab = createMaterialBottomTabNavigator();
  const { t } = useTranslation();
  /**
   * The best approach for using a tab navigator,
   * is to nest Stack navigators for each respective tab
   * For instance a tab like "Profile"
   * We can nest everything profile like, settings,paswords and the rest
   */

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor={COLORS.primary}
      barStyle={{ backgroundColor: COLORS.white }}>
      <Tab.Screen
        name="Feed"
        component={ScreenNavigator}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Learn"
        component={AllBlogs}
        options={{
          tabBarLabel: t('blog'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={Notifications}
        options={{
          tabBarLabel: t("notifications"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" color={color} size={26} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Yo"
        component={ProfileOverview}
        options={{
          tabBarLabel: t('profile'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { isFirstLaunch, isLoading } = useGetOnboardingStatus();

  if (isLoading) {
    return null;
  }

  const handleOnboardingDone = () => {
    navigationRef?.navigate('Signup');
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch && (
        <Stack.Screen name="Onboard">
          {(props) => <Onboard {...props} handleDone={handleOnboardingDone} />}
        </Stack.Screen>
      )}
      <Stack.Screen name="Resolve" component={ResolveAuth} />
      <Stack.Screen name="Signup" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

export default Navigation;
