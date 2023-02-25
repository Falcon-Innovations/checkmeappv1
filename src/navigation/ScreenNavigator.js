import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AllAppointments,
  AllBlogs,
  AppointmentDetails,
  BlogDetails,
  BookMammogram,
  BookSpecialist,
  Dashboard,
  DetailHospital,
  EditProfile,
  Help,
  Hospitals,
  MenstraulCycle,
  PersonalDashboard,
  ProfileOverview,
  Referal,
  RiskFactors,
  SelfExamination,
  SetCycle,
  Settings,
  SpecialistDetails,
  Specialists,
} from '../screens';

const Stack = createNativeStackNavigator();

function ScreenNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Specialists" component={Specialists} />
      <Stack.Screen name="SpecialistDetails" component={SpecialistDetails} />
      <Stack.Screen name="BookSpecialist" component={BookSpecialist} />
      <Stack.Screen name="Hospitals" component={Hospitals} />
      <Stack.Screen name="detailHospitals" component={DetailHospital} />
      <Stack.Screen name="ProfileOverview" component={ProfileOverview} />
      <Stack.Screen name="PersonalDashboard" component={PersonalDashboard} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Settings" component={Settings} />
      {/* <Stack.Screen name="ResetPassword" component={ResetPassword} /> */}
      <Stack.Screen name="Blogs" component={AllBlogs} />
      <Stack.Screen name="BlogDetails" component={BlogDetails} />
      <Stack.Screen name="BookMammogram" component={BookMammogram} />
      <Stack.Screen name="SelfExamination" component={SelfExamination} />
      <Stack.Screen name="MenstraulCycle" component={MenstraulCycle} />
      <Stack.Screen name="SetCycle" component={SetCycle} />
      <Stack.Screen name="Referals" component={Referal} />
      <Stack.Screen name="Help" component={Help} />

      {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
      <Stack.Screen name="RiskFactors" component={RiskFactors} />
      <Stack.Screen name="AllAppointments" component={AllAppointments} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
    </Stack.Navigator>
  );
}

export default ScreenNavigator;
