import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    enrollmentNo: '',
    facultyNo: '',
    adminId: '',
    mobile: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const { enrollmentNo, facultyNo, adminId, mobile, password } = formData;

    if (
      (selectedRole === 'student' && !enrollmentNo) ||
      (selectedRole === 'teacher' && !facultyNo) ||
      (selectedRole === 'admin' && !adminId) ||
      !mobile ||
      !password
    ) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      // Generate a 6-digit OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

      console.log('--- LoginScreen Console ---');
      console.log(`Generated OTP: ${generatedOtp}`); // <-- This logs the generated OTP
      console.log(`Simulating OTP send to mobile: ${mobile}`);
      console.log('---------------------------');


      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500));

      setLoading(false);

      // Navigate to OTPVerification screen
      // For development/testing: Pass the generated OTP for easy verification.
      // REMOVE `generatedOtpForTesting` IN PRODUCTION!
      navigation.navigate('Teacher', {
        mobile,
        role: selectedRole,
        generatedOtpForTesting: generatedOtp, // <-- TEMPORARY FOR DEV/TESTING
      });

    } catch (error) {
      setLoading(false);
      console.error('Error sending OTP:', error);
      Alert.alert('OTP Send Failed', error.message || 'Could not send OTP. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Sign in to continue your journey</Text>

      {/* Role Selection */}
      <View style={styles.roleContainer}>
        {['student', 'teacher', 'admin'].map(role => (
          <TouchableOpacity
            key={role}
            style={[
              styles.roleButton,
              selectedRole === role && styles.selectedRoleButton,
            ]}

            onPress={() => setSelectedRole(role)}
          >
            <Text
              style={[
                styles.roleText,
                selectedRole === role && styles.selectedRoleText,
              ]}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Inputs */}
      {selectedRole === 'student' && (
        <TextInput
          style={styles.input}
          placeholder="Enrollment Number"
          placeholderTextColor="black"
          value={formData.enrollmentNo}
          onChangeText={val => handleChange('enrollmentNo', val)}
          keyboardType="numeric"
        />
      )}
      {selectedRole === 'teacher' && (
        <TextInput
          style={styles.input}
          placeholder="Faculty Number"
          placeholderTextColor="black"
          value={formData.facultyNo}
          onChangeText={val => handleChange('facultyNo', val)}
          keyboardType="numeric"
        />
      )}
      {selectedRole === 'admin' && (
        <TextInput
          style={styles.input}
          placeholder="Admin ID"
          value={formData.adminId}
          onChangeText={val => handleChange('adminId', val)}
          autoCapitalize="none"
          placeholderTextColor="black"

        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={formData.mobile}
        onChangeText={val => handleChange('mobile', val)}
        maxLength={10}
        placeholderTextColor="black"

      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={formData.password}
          onChangeText={val => handleChange('password', val)}
          placeholderTextColor="black"

        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, loading && styles.disabled]}
        onPress={handleSubmit}
        disabled={loading}
        
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginText}>login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.note}>🔒 Secure login with OTP verification</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedRoleButton: {
    backgroundColor: '#6366f1',
  },
  roleText: {
    color: '#6366f1',
    fontWeight: '600',
  },
  selectedRoleText: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    elevation: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 1,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color:"black"
  },
  loginButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.7,
  },
  note: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6b7280',
  },
});

export default LoginScreen;