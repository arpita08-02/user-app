

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// import { auth } from './FirebaseConfig';

// const BASE_URL = 'https://avijo-571935621051.asia-south2.run.app';

// WebBrowser.maybeCompleteAuthSession();

// const LoginScreen = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   // Google Sign-In config (unchanged)
//   const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
//     expoClientId: '571935621051-lcg7u9n4e4j3irimi5tmc8afpjph7all.apps.googleusercontent.com',
//     androidClientId: '571935621051-jqco95bikj99p7fjaak47qd5u7fek136.apps.googleusercontent.com',
//   });

//   // ✅ Modified OTP handler with user existence check
//   // const handleSendOTP = async () => {
//   //   if (phoneNumber.length !== 10) {
//   //     Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
//   //     return;
//   //   }

//   //   try {
//   //     setLoading(true);
//   //     const response = await fetch(${BASE_URL}/user/login, {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({ mobileNumber: phoneNumber }),
//   //     });

//   //     const data = await response.json();
//   //     console.log('API Response:', data);

//   //     if (response.ok) {
//   //       await AsyncStorage.setItem('phoneNumber', phoneNumber);
        
//   //       // ✅ Critical change: Routing based on isExistingUser
//   //       navigation.navigate(
//   //         data.isExistingUser ? 'SignupScreen' : 'CreateAccountScreen',
//   //         { mobileNumber: phoneNumber }
//   //       );
//   //     } else {
//   //       Alert.alert('Error', data.message || 'Failed to send OTP');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error:', error);
//   //     Alert.alert('Error', 'An error occurred. Please try again.');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSendOTP = async () => {
//     if (phoneNumber.length !== 10) {
//       Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
//       return;
//     }
  
//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ mobileNumber: phoneNumber }),
//       });
  
//       const data = await response.json();
//       console.log('API Response:', data);
  
//       await AsyncStorage.setItem('phoneNumber', phoneNumber);
  
//       if (response.ok) {
//         // Existing user - navigate to SignupScreen
//         navigation.navigate('SignupScreen', { 
//           mobileNumber: phoneNumber
//         });
//       } else if (data.message === "User not found. Please register.") {
//         // New user - navigate to CreateAccountScreen
//         navigation.navigate('CreateAccountScreen', { 
//           mobileNumber: phoneNumber
//         });
//       } else {
//         Alert.alert('Error', data.message || 'Failed to send OTP');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Alert.alert('Error', 'An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Rest remains EXACTLY THE SAME (no UI/other logic changes)
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await googlePromptAsync();
//       if (result.type !== 'success') throw new Error('Google login cancelled');
      
//       const { idToken } = result.params;
//       const credential = auth.GoogleAuthProvider.credential(idToken);
//       const userCredential = await auth().signInWithCredential(credential);
      
//       await AsyncStorage.setItem('userInfo', JSON.stringify(userCredential.user));
//       navigation.navigate('HomeScreen');
//     } catch (error) {
//       Alert.alert('Error', 'Google login failed');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* ✅ ALL UI COMPONENTS REMAIN UNCHANGED */}
//       <Text style={styles.heading}>Login/Signup</Text>
//       <Text style={styles.text}>Sign up or Sign in to access your orders, special offers, health tips and more!</Text>
      
//       <View style={styles.phoneContainer}>
//         <Text style={styles.phoneText}>PHONE NUMBER</Text>
//         <View style={styles.inputContainer}>
//           <Text style={styles.countryCode}>+91</Text>
//           <TextInput
//             style={styles.phoneInput}
//             placeholder="Enter your mobile no"
//             keyboardType="numeric"
//             maxLength={10}
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//           />
//         </View>
//       </View>

//       <View style={styles.buttonContainer}>
//         {loading ? (
//           <ActivityIndicator color="#0000ff" />
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
//             <Text style={styles.buttonText}>USE OTP</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       <View style={styles.orContainer}>
//         <View style={styles.line} />
//         <Text style={styles.or}>Or</Text>
//         <View style={styles.line} />
//       </View>

//       <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
//         <Image source={require('./assets/google.png')} style={styles.icon} />
//         <Text style={styles.socialButtonText}>Log In with Google</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('CreateAccountScreen', { mobileNumber: phoneNumber })}>
//         <Text style={styles.createAccountText}>Don't have an account? Create one</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// // ✅ Styles remain 100% identical (no changes)
// const styles = StyleSheet.create({
//   container: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', backgroundColor: 'white' },
//   heading: { color: '#0095D9', fontSize: 32, fontFamily: 'Gilroy-Bold' },
//   text: { color: 'gray', marginTop: 10 },
//   phoneContainer: { width: '100%', marginTop: 20 },
//   phoneText: { fontSize: 12, fontFamily: 'Gilroy-SemiBold', color: '#0097DB' },
//   inputContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'gray', marginTop: 5, paddingBottom: 5 },
//   countryCode: { fontSize: 14, fontFamily: 'Poppins-Regular', color: 'black', marginRight: 10 },
//   phoneInput: { flex: 1, fontSize: 14, fontFamily: 'Poppins-Regular', color: 'black' },
//   buttonContainer: { marginTop: 30 },
//   button: { width: '100%', height: 46, backgroundColor: '#0097DB', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
//   buttonText: { color: 'white', fontSize: 18, fontFamily: 'Gilroy-SemiBold' },
//   orContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
//   line: { width: '40%', height: 1, backgroundColor: 'black' },
//   or: { fontSize: 16, color: 'black' },
//   socialButton: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', height: 46, backgroundColor: 'white', marginTop: 20, elevation: 5, borderRadius: 10 },
//   icon: { height: 23, width: 23 },
//   socialButtonText: { paddingLeft: 10, fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: 'darkgray' },
//   createAccountText: { color: '#0097DB', fontSize: 16, marginTop: 20, marginLeft: 50 }
// });

// export default LoginScreen;





















// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// import { auth } from './FirebaseConfig';

// const BASE_URL = 'https://avijo-571935621051.asia-south2.run.app';

// WebBrowser.maybeCompleteAuthSession();

// const LoginScreen = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
//     expoClientId: '571935621051-lcg7u9n4e4j3irimi5tmc8afpjph7all.apps.googleusercontent.com',
//     androidClientId: '571935621051-jqco95bikj99p7fjaak47qd5u7fek136.apps.googleusercontent.com',
//   });

//   const handleSendOTP = async () => {
//     if (phoneNumber.length !== 10) {
//       Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ mobileNumber: phoneNumber }),
//       });

//       const data = await response.json();
//       console.log('API Response:', data);

//       await AsyncStorage.setItem('phoneNumber', phoneNumber);

//       if (response.ok) {
//         // Existing user - navigate to SignupScreen with OTP
//         navigation.navigate('SignupScreen', { 
//           mobileNumber: phoneNumber,
//           otp: data.otp
//         });
//       } else if (data.message === "User not found. Please register.") {
//         // New user - send OTP for account creation
//         const otpResponse = await fetch(`${BASE_URL}/user/send-otp`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ mobileNumber: phoneNumber, isNewUser: true }),
//         });
        
//         const otpData = await otpResponse.json();
        
//         if (otpResponse.ok) {
//           // Navigate to CreateAccountScreen with number and OTP
//           navigation.navigate('CreateAccountScreen', { 
//             mobileNumber: phoneNumber,
//             otp: otpData.otp
//           });
//         } else {
//           Alert.alert('Error', otpData.message || 'Failed to send OTP for new user');
//         }
//       } else {
//         Alert.alert('Error', data.message || 'Failed to send OTP');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Alert.alert('Error', 'An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await googlePromptAsync();
//       if (result.type !== 'success') throw new Error('Google login cancelled');
      
//       const { idToken } = result.params;
//       const credential = auth.GoogleAuthProvider.credential(idToken);
//       const userCredential = await auth().signInWithCredential(credential);
      
//       await AsyncStorage.setItem('userInfo', JSON.stringify(userCredential.user));
//       navigation.navigate('HomeScreen');
//     } catch (error) {
//       Alert.alert('Error', 'Google login failed');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Login/Signup</Text>
//       <Text style={styles.text}>Sign up or Sign in to access your orders, special offers, health tips and more!</Text>
      
//       <View style={styles.phoneContainer}>
//         <Text style={styles.phoneText}>PHONE NUMBER</Text>
//         <View style={styles.inputContainer}>
//           <Text style={styles.countryCode}>+91</Text>
//           <TextInput
//             style={styles.phoneInput}
//             placeholder="Enter your mobile no"
//             keyboardType="numeric"
//             maxLength={10}
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//           />
//         </View>
//       </View>

//       <View style={styles.buttonContainer}>
//         {loading ? (
//           <ActivityIndicator color="#0000ff" />
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
//             <Text style={styles.buttonText}>USE OTP</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       <View style={styles.orContainer}>
//         <View style={styles.line} />
//         <Text style={styles.or}>Or</Text>
//         <View style={styles.line} />
//       </View>

//       <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
//         <Image source={require('./assets/google.png')} style={styles.icon} />
//         <Text style={styles.socialButtonText}>Log In with Google</Text>
//       </TouchableOpacity>

//       {/* <TouchableOpacity onPress={() => navigation.navigate('CreateAccountScreen', { mobileNumber: phoneNumber })}>
//         <Text style={styles.createAccountText}>Don't have an account? Create one</Text>
//       </TouchableOpacity> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', backgroundColor: 'white' },
//   heading: { color: '#0095D9', fontSize: 32, fontFamily: 'Gilroy-Bold' },
//   text: { color: 'gray', marginTop: 10 },
//   phoneContainer: { width: '100%', marginTop: 20 },
//   phoneText: { fontSize: 12, fontFamily: 'Gilroy-SemiBold', color: '#0097DB' },
//   inputContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'gray', marginTop: 5, paddingBottom: 5 },
//   countryCode: { fontSize: 14, fontFamily: 'Poppins-Regular', color: 'black', marginRight: 10 },
//   phoneInput: { flex: 1, fontSize: 14, fontFamily: 'Poppins-Regular', color: 'black' },
//   buttonContainer: { marginTop: 30 },
//   button: { width: '100%', height: 46, backgroundColor: '#0097DB', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
//   buttonText: { color: 'white', fontSize: 18, fontFamily: 'Gilroy-SemiBold' },
//   orContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
//   line: { width: '40%', height: 1, backgroundColor: 'black' },
//   or: { fontSize: 16, color: 'black' },
//   socialButton: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', height: 46, backgroundColor: 'white', marginTop: 20, elevation: 5, borderRadius: 10 },
//   icon: { height: 23, width: 23 },
//   socialButtonText: { paddingLeft: 10, fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: 'darkgray' },
//   createAccountText: { color: '#0097DB', fontSize: 16, marginTop: 20, marginLeft: 50 }
// });

// export default LoginScreen;



























// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// import { auth } from './FirebaseConfig';

// const BASE_URL = 'https://avijo-571935621051.asia-south2.run.app';

// WebBrowser.maybeCompleteAuthSession();

// const LoginScreen = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
//     expoClientId: '571935621051-lcg7u9n4e4j3irimi5tmc8afpjph7all.apps.googleusercontent.com',
//     androidClientId: '571935621051-jqco95bikj99p7fjaak47qd5u7fek136.apps.googleusercontent.com',
//   });

//   const handleSendOTP = async () => {
//     if (phoneNumber.length !== 10) {
//       Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/login`, {
//         method: 'POST',
//         credentials: 'include', // Essential for cookies
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ mobileNumber: phoneNumber }),
//       });

//       const data = await response.json();
//       console.log('Login Response:', data);

//       if (response.ok) {
//         // JWT cookie is automatically stored by browser
//         if (data.isNewUser) {
//           navigation.navigate('CreateAccountScreen', { 
//             mobileNumber: phoneNumber,
//             otp: data.otp 
//           });
//         } else {
//           navigation.navigate('SignupScreen', { 
//             mobileNumber: phoneNumber,
//             otp: data.otp 
//           });
//         }
//       } else {
//         Alert.alert('Error', data.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//       Alert.alert('Error', 'Network request failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await googlePromptAsync();
//       if (result.type !== 'success') throw new Error('Google login cancelled');
      
//       const { idToken } = result.params;
//       const credential = auth.GoogleAuthProvider.credential(idToken);
//       const userCredential = await auth().signInWithCredential(credential);
      
//       // Send Google token to backend to get JWT cookie
//       const response = await fetch(`${BASE_URL}/auth/google`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token: idToken }),
//       });

//       if (response.ok) {
//         navigation.navigate('HomeScreen');
//       } else {
//         throw new Error('Google auth failed');
//       }
//     } catch (error) {
//       Alert.alert('Error', error.message || 'Google login failed');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Login/Signup</Text>
//       <Text style={styles.text}>Sign up or Sign in to access your orders, special offers, health tips and more!</Text>
      
//       <View style={styles.phoneContainer}>
//         <Text style={styles.phoneText}>PHONE NUMBER</Text>
//         <View style={styles.inputContainer}>
//           <Text style={styles.countryCode}>+91</Text>
//           <TextInput
//             style={styles.phoneInput}
//             placeholder="Enter your mobile no"
//             keyboardType="numeric"
//             maxLength={10}
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//           />
//         </View>
//       </View>

//       <View style={styles.buttonContainer}>
//         {loading ? (
//           <ActivityIndicator color="#0000ff" />
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
//             <Text style={styles.buttonText}>USE OTP</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       <View style={styles.orContainer}>
//         <View style={styles.line} />
//         <Text style={styles.or}>Or</Text>
//         <View style={styles.line} />
//       </View>

//       <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
//         <Image source={require('./assets/google.png')} style={styles.icon} />
//         <Text style={styles.socialButtonText}>Log In with Google</Text>
//       </TouchableOpacity>

//       {/* <TouchableOpacity onPress={() => navigation.navigate('CreateAccountScreen', { mobileNumber: phoneNumber })}>
//         <Text style={styles.createAccountText}>Don't have an account? Create one</Text>
//       </TouchableOpacity> */}
//     </View>
//   );
// };

// // Keep your existing StyleSheet
// const styles = StyleSheet.create({ 
//   container: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', backgroundColor: 'white' },
//   heading: { color: '#0095D9', fontSize: 32, fontFamily: 'Gilroy-Bold' },
//   text: { color: 'gray', marginTop: 10 },
//   phoneContainer: { width: '100%', marginTop: 20 },
//   phoneText: { fontSize: 12, fontFamily: 'Gilroy-SemiBold', color: '#0097DB' },
//   inputContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'gray', marginTop: 5, paddingBottom: 5 },
//   countryCode: { fontSize: 14, fontFamily: 'Poppins-Regular', color: 'black', marginRight: 10 },
//   phoneInput: { flex: 1, fontSize: 14, fontFamily: 'Poppins-Regular', color: 'black' },
//   buttonContainer: { marginTop: 30 },
//   button: { width: '100%', height: 46, backgroundColor: '#0097DB', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
//   buttonText: { color: 'white', fontSize: 18, fontFamily: 'Gilroy-SemiBold' },
//   orContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
//   line: { width: '40%', height: 1, backgroundColor: 'black' },
//   or: { fontSize: 16, color: 'black' },
//   socialButton: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', height: 46, backgroundColor: 'white', marginTop: 20, elevation: 5, borderRadius: 10 },
//   icon: { height: 23, width: 23 },
//   socialButtonText: { paddingLeft: 10, fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: 'darkgray' },
//   createAccountText: { color: '#0097DB', fontSize: 16, marginTop: 20, marginLeft: 50 }
//  });

// export default LoginScreen;





import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { auth } from './FirebaseConfig';

const BASE_URL = 'https://avijo-571935621051.asia-south2.run.app';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    expoClientId: '571935621051-lcg7u9n4e4j3irimi5tmc8afpjph7all.apps.googleusercontent.com',
    androidClientId: '571935621051-jqco95bikj99p7fjaak47qd5u7fek136.apps.googleusercontent.com',
  });

 
  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber: phoneNumber }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      await AsyncStorage.setItem('phoneNumber', phoneNumber);

      if (response.ok) {
        // Existing user - navigate to SignupScreen with OTP
        navigation.navigate('SignupScreen', { 
          mobileNumber: phoneNumber,
          otp: data.otp
        });
      } else if (data.message === "User not found. Please register.") {
        // New user - send OTP for account creation
        const otpResponse = await fetch(`${BASE_URL}/user/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobileNumber: phoneNumber, isNewUser: true }),
        });
        
        const otpData = await otpResponse.json();
        
        if (otpResponse.ok) {
          // Navigate to CreateAccountScreen with number and OTP
          navigation.navigate('CreateAccountScreen', { 
            mobileNumber: phoneNumber,
            otp: otpData.otp
          });
        } else {
          Alert.alert('Error', otpData.message || 'Failed to send OTP for new user');
        }
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googlePromptAsync();
      if (result.type !== 'success') throw new Error('Google login cancelled');
      
      const { idToken } = result.params;
      const credential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(credential);
      
      // Send Google token to backend to get JWT cookie
      const response = await fetch(`${BASE_URL}/auth/google`, {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ token: idToken }),
      });

      const data = await response.json();
      
      if (response.ok) {
        await AsyncStorage.setItem('userInfo', JSON.stringify({
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          photoURL: userCredential.user.photoURL
        }));
        navigation.navigate('HomeScreen');
      } else {
        throw new Error(data.message || 'Google authentication failed');
      }
    } catch (error) {
      console.error('Google Login Error:', error);
      Alert.alert('Error', error.message || 'Google login failed');
    }
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