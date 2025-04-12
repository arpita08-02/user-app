import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://avijo-571935621051.asia-south2.run.app';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    // Use demo number regardless of input
    const demoNumber = '1234567890';
    const demoOTP = String(Math.floor(100000 + Math.random() * 900000)); // Generate random 6-digit OTP
    
    if (phoneNumber.length !== 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      setLoading(true);
      console.log('\n=== 🔐 OTP Request Information ===');
      console.log('📱 Phone Number:', demoNumber);
      console.log('🔑 Demo OTP:', demoOTP);
      console.log('⏰ Time:', new Date().toLocaleTimeString());
      console.log('===============================\n');
      
      // Skip actual API call in demo mode
      console.log('🚀 Skipping actual API call in demo mode');
      
      await AsyncStorage.setItem('phoneNumber', demoNumber);

      // Simulate successful response
      console.log('\n=== 🔐 OTP Information ===');
      console.log('📱 Phone Number:', demoNumber);
      console.log('🔑 OTP:', demoOTP);
      console.log('⏰ Time:', new Date().toLocaleTimeString());
      console.log('===============================\n');
      
      navigation.navigate('SignupScreen', { 
        mobileNumber: demoNumber,
        isNewUser: false,
        otp: demoOTP
      });

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Just UI element, no functionality needed
    Alert.alert('Info', 'Google Sign-in is not implemented in this version.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login/Signup</Text>
      <Text style={styles.text}>Sign up or Sign in to access your orders, special offers, health tips and more!</Text>
      
      <View style={styles.phoneContainer}>
        <Text style={styles.phoneText}>PHONE NUMBER</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter your mobile no"
            keyboardType="numeric"
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            editable={!loading}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator color="#0000ff" />
        ) : (
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSendOTP}
            disabled={loading}
          >
            <Text style={styles.buttonText}>USE OTP</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.or}>Or</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity 
        style={styles.socialButton} 
        onPress={handleGoogleLogin}
        disabled={loading}
      >
        <Image source={require('./assets/google.png')} style={styles.icon} />
        <Text style={styles.socialButtonText}>Log In with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', backgroundColor: 'white' },
  heading: { color: '#0095D9', fontSize: 32, fontFamily: 'Gilroy-Bold' },
  text: { color: 'gray', marginTop: 10 },
  phoneContainer: { width: '100%', marginTop: 20 },
  phoneText: { fontSize: 12, fontFamily: 'Gilroy-SemiBold', color: '#0097DB' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'gray', marginTop: 5, paddingBottom: 5 },
  countryCode: { fontSize: 14, fontFamily: 'Poppins-Regular', color: 'black', marginRight: 10 },
  phoneInput: { flex: 1, fontSize: 14, fontFamily: 'Poppins-Regular', color: 'black' },
  buttonContainer: { marginTop: 30 },
  button: { width: '100%', height: 46, backgroundColor: '#0097DB', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontFamily: 'Gilroy-SemiBold' },
  orContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  line: { width: '40%', height: 1, backgroundColor: 'black' },
  or: { fontSize: 16, color: 'black' },
  socialButton: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', height: 46, backgroundColor: 'white', marginTop: 20, elevation: 5, borderRadius: 10 },
  icon: { height: 23, width: 23 },
  socialButtonText: { paddingLeft: 10, fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: 'darkgray' }
});

export default LoginScreen;