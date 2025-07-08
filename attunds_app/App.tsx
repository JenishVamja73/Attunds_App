import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AttendanceSheet from './Screen/AttendanceSheet';
import LoginScreen from './Screen/LoginScreen';
import OtpVerificationScreen from './Screen/OtpVerificationScreen';
import TeacherDashboardWithAttendance from './Screen/TeacherDashboardHeader';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Login" component={LoginScreen}  options={{headerShown:false}}/>
          <Stack.Screen name ="otp" component={OtpVerificationScreen} />

          <Stack.Screen name="Teacher" component={TeacherDashboardWithAttendance} />
          <Stack.Screen name = "AttendanceSheet" component={AttendanceSheet}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>

  );
}
