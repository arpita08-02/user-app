// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const LoginScreen = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const navigation = useNavigation();

//   const handleSendOTP = async () => {
//     if (phoneNumber.length !== 10) {
//       Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
//       return;
//     }
    
//     // Store phone number in AsyncStorage
//     await AsyncStorage.setItem('phoneNumber', phoneNumber);
    
//     // Navigate to SignupScreen directly
//     navigation.navigate('SignupScreen');
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
//         <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to Avijo!!</Text>
//       <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Enter Your Phone Number</Text>
//       <TextInput
//         style={{
//           width: '100%',
//           height: 50,
//           borderColor: 'gray',
//           borderWidth: 1,
//           borderRadius: 10,
//           paddingHorizontal: 10,
//           fontSize: 18,
//           marginBottom: 20,
//         }}
//         placeholder="Enter phone number"
//         keyboardType="numeric"
//         maxLength={10}
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//       />
//       <TouchableOpacity
//         onPress={handleSendOTP}
//         style={{
//           backgroundColor: 'blue',
//           padding: 15,
//           borderRadius: 10,
//           width: '100%',
//           alignItems: 'center',
//           marginBottom: 10,
//         }}
//       >
//         <Text style={{ color: 'white', fontSize: 18 }}>Send OTP</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity
//         onPress={() => Alert.alert('Google Login', 'Google login functionality will be implemented here.')}
//         style={{
//           backgroundColor: 'red',
//           padding: 15,
//           borderRadius: 10,
//           width: '100%',
//           alignItems: 'center',
//           marginBottom: 10,
//         }}
//       >
//         <Text style={{ color: 'white', fontSize: 18 }}>Login with Google</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity
//         onPress={() => Alert.alert('Facebook Login', 'Facebook login functionality will be implemented here.')}
//         style={{
//           backgroundColor: 'blue',
//           padding: 15,
//           borderRadius: 10,
//           width: '100%',
//           alignItems: 'center',
//           marginBottom: 20,
//         }}
//       >
//         <Text style={{ color: 'white', fontSize: 18 }}>Login with Facebook</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity
//         onPress={() => navigation.navigate('CreateAccountScreen')}
//       >
//         <Text style={{ color: 'blue', fontSize: 16 }}>Don't have an account? Create one</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;



















// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";

// const BASE_URL = "https://avijobackend-production.up.railway.app";

// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSendOTP = async () => {
//     if (phoneNumber.length !== 10) {
//       Alert.alert("Invalid Number", "Please enter a valid 10-digit phone number.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ mobileNumber: phoneNumber }),
//       });

//       const data = await response.json();
//       console.log("OTP Response:", data); // Log the OTP response

//       if (response.ok) {
//         // Navigate to SignupScreen with the mobile number
//         navigation.navigate("SignupScreen", { mobileNumber: phoneNumber });
//       } else {
//         Alert.alert("Error", data.message || "Failed to send OTP.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       Alert.alert("Error", "Failed to send OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
//       <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to Avijo!!</Text>
//       <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Enter Your Phone Number</Text>
//       <TextInput
//         style={{
//           width: "100%",
//           height: 50,
//           borderColor: "gray",
//           borderWidth: 1,
//           borderRadius: 10,
//           paddingHorizontal: 10,
//           fontSize: 18,
//           marginBottom: 20,
//         }}
//         placeholder="Enter phone number"
//         keyboardType="numeric"
//         maxLength={10}
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//       />
//       <TouchableOpacity
//         onPress={handleSendOTP}
//         style={{
//           backgroundColor: "blue",
//           padding: 15,
//           borderRadius: 10,
//           width: "100%",
//           alignItems: "center",
//           marginBottom: 10,
//         }}
//       >
//         {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: "white", fontSize: 18 }}>Send OTP</Text>}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;









// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const BASE_URL = 'https://avijobackend-production.up.railway.app';

// const LoginScreen = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   const handleSendOTP = async () => {
//     if (phoneNumber.length !== 10) {
//       Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
//       return;
//     }

//     try {
//       setLoading(true);

//       // Call the Send OTP API
//       const response = await fetch(`${BASE_URL}/user/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ mobileNumber: phoneNumber }),
//       });

//       const data = await response.json();
//       console.log('OTP Response:', data); // Log the response

//       if (response.ok) {
//         // Store phone number in AsyncStorage
//         await AsyncStorage.setItem('phoneNumber', phoneNumber);

//         // Navigate to OTP Verification Screen
//         navigation.navigate('SignupScreen', { mobileNumber: phoneNumber });
//       } else {
//         Alert.alert('Error', data.message || 'Failed to send OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       Alert.alert('Error', 'An error occurred while sending OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     // Placeholder for Google Login
//     Alert.alert('Google Login', 'Google login functionality will be implemented here.');
//   };

//   const handleFacebookLogin = () => {
//     // Placeholder for Facebook Login
//     Alert.alert('Facebook Login', 'Facebook login functionality will be implemented here.');
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
//       <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to Avijo!!</Text>
//       <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Enter Your Phone Number</Text>
//       <TextInput
//         style={{
//           width: '100%',
//           height: 50,
//           borderColor: 'gray',
//           borderWidth: 1,
//           borderRadius: 10,
//           paddingHorizontal: 10,
//           fontSize: 18,
//           marginBottom: 20,
//         }}
//         placeholder="Enter phone number"
//         keyboardType="numeric"
//         maxLength={10}
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//       />
//       <TouchableOpacity
//         onPress={handleSendOTP}
//         style={{
//           backgroundColor: 'blue',
//           padding: 15,
//           borderRadius: 10,
//           width: '100%',
//           alignItems: 'center',
//           marginBottom: 10,
//         }}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="white" />
//         ) : (
//           <Text style={{ color: 'white', fontSize: 18 }}>Send OTP</Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={handleGoogleLogin}
//         style={{
//           backgroundColor: 'red',
//           padding: 15,
//           borderRadius: 10,
//           width: '100%',
//           alignItems: 'center',
//           marginBottom: 10,
//         }}
//       >
//         <Text style={{ color: 'white', fontSize: 18 }}>Login with Google</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={handleFacebookLogin}
//         style={{
//           backgroundColor: 'blue',
//           padding: 15,
//           borderRadius: 10,
//           width: '100%',
//           alignItems: 'center',
//           marginBottom: 20,
//         }}
//       >
//         <Text style={{ color: 'white', fontSize: 18 }}>Login with Facebook</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('CreateAccountScreen',{ mobileNumber: phoneNumber })}>
//         <Text style={{ color: 'blue', fontSize: 16 }}>Don't have an account? Create one</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;



















// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// import { auth } from './FirebaseConfig'; // Import Firebase auth

// const BASE_URL = 'https://avijobackend-production.up.railway.app';

// WebBrowser.maybeCompleteAuthSession();

// const LoginScreen = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   // Configure Google Sign-In
//   const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
//     expoClientId: '571935621051-lcg7u9n4e4j3irimi5tmc8afpjph7all.apps.googleusercontent.com', // Replace with your Expo Client ID
//     // iosClientId: 'YOUR_IOS_CLIENT_ID', // Replace with your iOS Client ID
//     androidClientId: 'http://571935621051-jqco95bikj99p7fjaak47qd5u7fek136.apps.googleusercontent.com', // Replace with your Android Client ID
//   });

//   const handleSendOTP = async () => {
//     if (phoneNumber.length !== 10) {
//       Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
//       return;
//     }

//     try {
//       setLoading(true);

//       // Call the Send OTP API
//       const response = await fetch(`${BASE_URL}/user/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ mobileNumber: phoneNumber }),
//       });

//       const data = await response.json();
//       console.log('OTP Response:', data); // Log the response

//       if (response.ok) {
//         // Store phone number in AsyncStorage
//         await AsyncStorage.setItem('phoneNumber', phoneNumber);

//         // Navigate to OTP Verification Screen
//         navigation.navigate('SignupScreen', { mobileNumber: phoneNumber });
//       } else {
//         Alert.alert('Error', data.message || 'Failed to send OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       Alert.alert('Error', 'An error occurred while sending OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       // Step 1: Prompt Google Sign-In
//       const result = await googlePromptAsync();
//       if (result.type !== 'success') {
//         throw new Error('Google Sign-In was cancelled');
//       }

//       // Step 2: Get the ID token
//       const { idToken } = result.params;

//       // Step 3: Create a Firebase credential with the Google ID token
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//       // Step 4: Sign in to Firebase with Google credentials
//       const firebaseUser = await auth().signInWithCredential(googleCredential);

//       // Step 5: Log the user's information
//       console.log('Firebase User:', firebaseUser);

//       // Step 6: Store user info in AsyncStorage (optional)
//       await AsyncStorage.setItem('userInfo', JSON.stringify(firebaseUser.user));

//       // Step 7: Navigate to HomeScreen
//       Alert.alert('Success', 'Google login successful!');
//       navigation.navigate('HomeScreen');
//     } catch (error) {
//       console.error('Google Sign-In Error:', error);
//       Alert.alert('Error', 'Google login failed. Please try again.');
//     }
//   };
//   // const handleGoogleLogin = async () => {
//   //   try {
//   //     // Step 1: Prompt Google Sign-In
//   //     const result = await googlePromptAsync();
//   //     if (result.type !== 'success') {
//   //       throw new Error('Google Sign-In was cancelled');
//   //     }
  
//   //     // Step 2: Get the ID token
//   //     const { idToken } = result.params;
  
//   //     // Step 3: Create a Firebase credential with the Google ID token
//   //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
//   //     // Step 4: Sign in to Firebase with Google credentials
//   //     const firebaseUser = await auth().signInWithCredential(googleCredential);
  
//   //     // Step 5: Log the user's information
//   //     console.log('Firebase User:', firebaseUser);
  
//   //     // Step 6: Store user info in AsyncStorage (optional)
//   //     await AsyncStorage.setItem('userInfo', JSON.stringify(firebaseUser.user));
  
//   //     // Step 7: Navigate to HomeScreen
//   //     Alert.alert('Success', 'Google login successful!');
//   //     navigation.navigate('HomeScreen');
//   //   } catch (error) {
//   //     console.error('Google Sign-In Error:', error);
  
//   //     if (error.message === 'Google Sign-In was cancelled') {
//   //       Alert.alert('Cancelled', 'Google Sign-In was cancelled by the user.');
//   //     } else {
//   //       Alert.alert('Error', 'Google login failed. Please try again.');
//   //     }
//   //   }
//   // };
//   const handleFacebookLogin = () => {
//     Alert.alert('Coming Soon', 'Facebook login will be available soon!');
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
//       <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to Avijo!!</Text>
//       <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Enter Your Phone Number</Text>
//       <TextInput
//         style={{
//           width: '100%',
//           height: 50,
//           borderColor: 'gray',
//           borderWidth: 1,
//           borderRadius: 10,
//           paddingHorizontal: 10,
//           fontSize: 18,
//           marginBottom: 20,
//         }}
//         placeholder="Enter phone number"
//         keyboardType="numeric"
//         maxLength={10}
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//       />
//       <TouchableOpacity
//         onPress={handleSendOTP}
//         style={{
//           backgroundColor: 'blue',
//           padding: 15,
//           borderRadius: 10,
//           width: '100%',
//           alignItems: 'center',
//           marginBottom: 10,
//         }}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="white" />
//         ) : (
//           <Text style={{ color: 'white', fontSize: 18 }}>Send OTP</Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={handleGoogleLogin}
//         style={{
//           backgroundColor: 'red',
//           padding: 15,
//           borderRadius: 10,
//           width: '100%',
//           alignItems: 'center',
//           marginBottom: 10,
//         }}
//       >
//         <Text style={{ color: 'white', fontSize: 18 }}>Login with Google</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={handleFacebookLogin}
//         style={{
//           backgroundColor: 'blue',
//           padding: 15,
//           borderRadius: 10,
//           width: '100%',
//           alignItems: 'center',
//           marginBottom: 20,
//         }}
//       >
//         <Text style={{ color: 'white', fontSize: 18 }}>Login with Facebook</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('CreateAccountScreen', { mobileNumber: phoneNumber })}>
//         <Text style={{ color: 'blue', fontSize: 16 }}>Don't have an account? Create one</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;






















// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// import { auth } from './FirebaseConfig'; // Import Firebase auth

// const BASE_URL = 'https://avijobackend-production.up.railway.app';

// WebBrowser.maybeCompleteAuthSession();

// const LoginScreen = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   // Configure Google Sign-In
//   const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
//     expoClientId: 'http://571935621051-lcg7u9n4e4j3irimi5tmc8afpjph7all.apps.googleusercontent.com', // Replace with your Expo Client ID
//     androidClientId: 'http://571935621051-jqco95bikj99p7fjaak47qd5u7fek136.apps.googleusercontent.com', // Replace with your Android Client ID
//   });

//   const handleSendOTP = async () => {
//     if (phoneNumber.length !== 10) {
//       Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
//       return;
//     }

//     try {
//       setLoading(true);

//       // Call the Send OTP API
//       const response = await fetch(`${BASE_URL}/user/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ mobileNumber: phoneNumber }),
//       });

//       const data = await response.json();
//       console.log('OTP Response:', data); // Log the response

//       if (response.ok) {
//         // Store phone number in AsyncStorage
//         await AsyncStorage.setItem('phoneNumber', phoneNumber);

//         // Navigate to OTP Verification Screen
//         navigation.navigate('SignupScreen', { mobileNumber: phoneNumber });
//       } else {
//         Alert.alert('Error', data.message || 'Failed to send OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       Alert.alert('Error', 'An error occurred while sending OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       // Step 1: Prompt Google Sign-In
//       const result = await googlePromptAsync();
//       if (result.type !== 'success') {
//         throw new Error('Google Sign-In was cancelled');
//       }

//       // Step 2: Get the ID token
//       const { idToken } = result.params;

//       // Step 3: Create a Firebase credential with the Google ID token
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//       // Step 4: Sign in to Firebase with Google credentials
//       const firebaseUser = await auth().signInWithCredential(googleCredential);

//       // Step 5: Log the user's information
//       console.log('Firebase User:', firebaseUser);

//       // Step 6: Store user info in AsyncStorage (optional)
//       await AsyncStorage.setItem('userInfo', JSON.stringify(firebaseUser.user));

//       // Step 7: Navigate to HomeScreen
//       Alert.alert('Success', 'Google login successful!');
//       navigation.navigate('HomeScreen');
//     } catch (error) {
//       console.error('Google Sign-In Error:', error);
//       Alert.alert('Error', 'Google login failed. Please try again.');
//     }
//   };

//   const handleFacebookLogin = () => {
//     Alert.alert('Coming Soon', 'Facebook login will be available soon!');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Login/Signup</Text>
//       <Text style={styles.text}>
//         Sign up or Sign in to access your orders, special offers, health tips and more!
//       </Text>

//       {/* Phone Number Input */}
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

//       {/* Send OTP Button */}
//       <View style={styles.buttonContainer}>
//         {loading ? (
//           <ActivityIndicator color="#0000ff" size="large" />
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
//             <Text style={styles.buttonText}>USE OTP</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Or Divider */}
//       <View style={styles.orContainer}>
//         <View style={styles.line} />
//         <Text style={styles.or}>Or</Text>
//         <View style={styles.line} />
//       </View>

//       {/* Google Login Button */}
//       <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
//         <Image source={require('./assets/google.png')} style={styles.icon} />
//         <Text style={styles.socialButtonText}>Log In with Google</Text>
//       </TouchableOpacity>

//       {/* Facebook Login Button */}
//       {/* <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
//         <Image source={require('./assets/facebook.png')} style={styles.icon} />
//         <Text style={styles.socialButtonText}>Log In with Facebook</Text>
//       </TouchableOpacity> */}

//       {/* Create Account Link */}
//       <TouchableOpacity onPress={() => navigation.navigate('CreateAccountScreen', { mobileNumber: phoneNumber })}>
//         <Text style={styles.createAccountText}>Don't have an account? Create one</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
    
//     flex: 1,
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//     padding: 20,
//   },
//   heading: {
//     color: '#0095D9',
//     fontSize: 32,
//     fontFamily: 'Gilroy-Bold',
//     alignSelf: 'flex-start',
//     marginLeft: '5%',
//   },
//   text: {
//     color: 'gray',
//     width: '90%',
//     marginTop: '5%',
//   },
//   phoneContainer: {
//     width: '80%',
//     alignItems: 'center',
//     alignSelf: 'flex-start',
//     marginLeft: '2%',
//     marginTop: '10%',
//   },
//   phoneText: {
//     fontSize: 12,
//     fontFamily: 'Gilroy-SemiBold',
//     alignSelf: 'flex-start',
//     marginLeft: '5%',
//     color: '#0097DB',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     width: '100%',
//     height: 52,
//     backgroundColor: 'white',
//     borderRadius: 6,
//     borderColor: 'gray',
//     borderWidth: 1,
//     alignItems: 'center',
//     paddingLeft: 15,
//   },
//   countryCode: {
//     fontSize: 14,
//     fontFamily: 'Poppins-Regular',
//     color: 'black',
//     marginRight: 10,
//   },
//   phoneInput: {
//     flex: 1,
//     fontSize: 14,
//     fontFamily: 'Poppins-Regular',
//     color: 'black',
//     height: 48,
//   },
//   buttonContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginTop: '15%',
//   },
//   button: {
//     width: '90%',
//     height: 46,
//     backgroundColor: '#0097DB',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontFamily: 'Gilroy-SemiBold',
//   },
//   orContainer: {
//     flexDirection: 'row',
//     width: '90%',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: '5%',
//   },
//   line: {
//     width: '43%',
//     height: 1,
//     backgroundColor: 'black',
//   },
//   or: {
//     fontSize: 16,
//     color: 'black',
//   },
//   socialButton: {
//     flexDirection: 'row',
//     width: '90%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 46,
//     backgroundColor: 'white',
//     marginTop: '5%',
//     elevation: 5,
//     borderRadius: 10,
//   },
//   icon: {
//     height: 23,
//     width: 23,
//   },
//   socialButtonText: {
//     paddingLeft: '5%',
//     fontSize: 18,
//     fontFamily: 'Gilroy-SemiBold',
//     color: 'darkgray',
//   },
//   createAccountText: {
//     color: '#0097DB',
//     fontSize: 16,
//     marginTop: 20,
//   },
// });

// export default LoginScreen;








import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { auth } from './FirebaseConfig'; // Import Firebase auth

const BASE_URL = 'https://avijobackend-production.up.railway.app';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Configure Google Sign-In
  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    expoClientId: 'http://571935621051-lcg7u9n4e4j3irimi5tmc8afpjph7all.apps.googleusercontent.com', // Replace with your Expo Client ID
    androidClientId: 'http://571935621051-jqco95bikj99p7fjaak47qd5u7fek136.apps.googleusercontent.com', // Replace with your Android Client ID
  });

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      setLoading(true);

      // Call the Send OTP API
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber: phoneNumber }),
      });

      const data = await response.json();
      console.log('OTP Response:', data); // Log the response

      if (response.ok) {
        // Store phone number in AsyncStorage
        await AsyncStorage.setItem('phoneNumber', phoneNumber);

        // Navigate to OTP Verification Screen
        navigation.navigate('SignupScreen', { mobileNumber: phoneNumber });
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'An error occurred while sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Step 1: Prompt Google Sign-In
      const result = await googlePromptAsync();
      if (result.type !== 'success') {
        throw new Error('Google Sign-In was cancelled');
      }

      // Step 2: Get the ID token
      const { idToken } = result.params;

      // Step 3: Create a Firebase credential with the Google ID token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Step 4: Sign in to Firebase with Google credentials
      const firebaseUser = await auth().signInWithCredential(googleCredential);

      // Step 5: Log the user's information
      console.log('Firebase User:', firebaseUser);

      // Step 6: Store user info in AsyncStorage (optional)
      await AsyncStorage.setItem('userInfo', JSON.stringify(firebaseUser.user));

      // Step 7: Navigate to HomeScreen
      Alert.alert('Success', 'Google login successful!');
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Alert.alert('Error', 'Google login failed. Please try again.');
    }
  };

  const handleFacebookLogin = () => {
    Alert.alert('Coming Soon', 'Facebook login will be available soon!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login/Signup</Text>
      <Text style={styles.text}>
        Sign up or Sign in to access your orders, special offers, health tips and more!
      </Text>

      {/* Phone Number Input */}
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
          />
        </View>
      </View>

      {/* Send OTP Button */}
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator color="#0000ff" size="large" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
            <Text style={styles.buttonText}>USE OTP</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Or Divider */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.or}>Or</Text>
        <View style={styles.line} />
      </View>

      {/* Google Login Button */}
      <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
        <Image source={require('./assets/google.png')} style={styles.icon} />
        <Text style={styles.socialButtonText}>Log In with Google</Text>
      </TouchableOpacity>

      {/* Create Account Link */}
      <TouchableOpacity onPress={() => navigation.navigate('CreateAccountScreen', { mobileNumber: phoneNumber })}>
        <Text style={styles.createAccountText}>Don't have an account? Create one</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  heading: {
    color: '#0095D9',
    fontSize: 32,
    fontFamily: 'Gilroy-Bold',
  },
  text: {
    color: 'gray',
    marginTop: 10,
  },
  phoneContainer: {
    width: '100%',
    marginTop: 20,
  },
  phoneText: {
    fontSize: 12,
    fontFamily: 'Gilroy-SemiBold',
    color: '#0097DB',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1, // Only bottom border (downline)
    borderColor: 'gray',
    marginTop: 5,
    paddingBottom: 5,
  },
  countryCode: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'black',
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    width: '100%',
    height: 46,
    backgroundColor: '#0097DB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Gilroy-SemiBold',
  },
  orContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  line: {
    width: '40%',
    height: 1,
    backgroundColor: 'black',
  },
  or: {
    fontSize: 16,
    color: 'black',
  },
  socialButton: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    backgroundColor: 'white',
    marginTop: 20,
    elevation: 5,
    borderRadius: 10,
  },
  icon: {
    height: 23,
    width: 23,
  },
  socialButtonText: {
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: 'Gilroy-SemiBold',
    color: 'darkgray',
  },
  createAccountText: {
    color: '#0097DB',
    fontSize: 16,
    marginTop: 20,
    marginLeft: 50
  },
});

export default LoginScreen;
