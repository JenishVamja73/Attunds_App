import React, { useRef, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';

function OtpVerificationScreen({ route, navigation }) {
  const { confirmationResult } = route.params; // Pass confirmationResult from AuthScreen
  const [otp, setOtp] = useState('');
  const otpInputRef = useRef(null);

  const handleVerifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      Alert.alert('Success', 'OTP Verified! Navigating to Home...');
      navigation.replace('HomeScreen'); // Replace with your actual home screen
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    // Implement resend logic here. You might need to re-call signInWithPhoneNumber
    // with the original phone number.
    Alert.alert('Resend OTP', 'OTP has been resent. Check your phone.');
    // Example: (you'll need to pass the original phoneNumber to this screen)
    // await auth().signInWithPhoneNumber(phoneNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>
        A 6-digit code has been sent to your phone number.
      </Text>

      <OtpInput
        ref={otpInputRef}
        numberOfDigits={6}
        focusColor="green"
        focusStickBlinkingDuration={500}
        onTextChange={(text) => setOtp(text)}
        onFilled={(text) => {
          setOtp(text);
          // Optional: automatically verify when all digits are entered
          // handleVerifyOtp();
        }}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          focusedPinCodeContainerStyle: styles.focusedPinCodeContainer,
        }}
      />

      <Button title="Verify OTP" onPress={handleVerifyOtp} disabled={otp.length !== 6} />
      <View style={{ marginTop: 20 }}>
        <Button title="Resend Code" onPress={handleResendOtp} color="gray" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  otpContainer: {
    width: '90%',
    height: 60,
    marginBottom: 30,
  },
  pinCodeContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 45,
    height: 50,
  },
  pinCodeText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  focusedPinCodeContainer: {
    borderColor: 'blue',
  },
});

export default OtpVerificationScreen;