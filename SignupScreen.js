
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const SignupScreen = () => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [timer, setTimer] = useState(60);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchPhoneNumber = async () => {
//       const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
//       if (storedPhoneNumber) {
//         setPhoneNumber(storedPhoneNumber);
//       }
//     };
//     fetchPhoneNumber();
//   }, []);

//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [timer]);

//   const handleVerifyOTP = () => {
//     if (otp.join('').length !== 6) {
//       Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
//       return;
//     }
//     navigation.navigate('HomeScreen');
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
//       <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Signup</Text>
//       <Text style={{ fontSize: 16, color: 'gray', textAlign: 'center', marginBottom: 20 }}>
//         Sign up or Sign in to access your orders, special offers, health tips and more!
//       </Text>
//       <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue', marginBottom: 10 }}>PHONE NUMBER</Text>
//       <Text style={{ fontSize: 18, marginBottom: 20 }}>+91 | {phoneNumber}</Text>
//       <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>VERIFYING NUMBER</Text>
//       <Text style={{ color: 'gray', marginBottom: 20 }}>We have sent a 6-digit OTP on +91-{phoneNumber}</Text>
//       <View style={{ flexDirection: 'row', marginBottom: 20 }}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             style={{
//               width: 40,
//               height: 50,
//               borderColor: 'gray',
//               borderWidth: 1,
//               borderRadius: 10,
//               textAlign: 'center',
//               fontSize: 18,
//               marginHorizontal: 5,
//             }}
//             keyboardType="numeric"
//             maxLength={1}
//             value={digit}
//             onChangeText={(text) => {
//               let newOtp = [...otp];
//               newOtp[index] = text;
//               setOtp(newOtp);
//             }}
//           />
//         ))}
//       </View>
//       <Text style={{ color: 'gray', marginBottom: 20 }}>Waiting for OTP... {timer} Sec</Text>
//       <TouchableOpacity
//         onPress={handleVerifyOTP}
//         style={{
//           backgroundColor: 'blue',
//           padding: 15,
//           borderRadius: 10,
//           width: '100%',
//           alignItems: 'center',
//           marginBottom: 20,
//         }}
//       >
//         <Text style={{ color: 'white', fontSize: 18 }}>Verify</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SignupScreen;












// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";

// const BASE_URL = "https://avijobackend-production.up.railway.app";

// const SignupScreen = ({ route, navigation }) => {
//   const { mobileNumber } = route.params;
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);

//   const handleVerifyOTP = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/verifyLogin`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ mobileNumber, otp }),
//       });

//       const data = await response.json();
//       console.log("Verification Response:", data); // Log the verification response

//       if (response.ok) {
//         // Navigate to HomeScreen after successful verification
//         navigation.navigate("HomeScreen");
//       } else {
//         Alert.alert("Error", data.message || "OTP verification failed.");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       Alert.alert("Error", "OTP verification failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [countdown]);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
//       <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Signup</Text>
//       <Text style={{ fontSize: 16, color: "gray", textAlign: "center", marginBottom: 20 }}>
//         Sign up or Sign in to access your orders, special offers, health tips, and more!
//       </Text>
//       <Text style={{ fontSize: 18, fontWeight: "bold", color: "blue", marginBottom: 10 }}>PHONE NUMBER</Text>
//       <Text style={{ fontSize: 18, marginBottom: 20 }}>+91 | {mobileNumber}</Text>
//       <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>VERIFYING NUMBER</Text>
//       <Text style={{ color: "gray", marginBottom: 20 }}>We have sent a 6-digit OTP on +91-{mobileNumber}</Text>
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
//         placeholder="Enter OTP"
//         keyboardType="numeric"
//         maxLength={6}
//         value={otp}
//         onChangeText={setOtp}
//       />
//       <Text style={{ color: "gray", marginBottom: 20 }}>Waiting for OTP... {countdown} Sec</Text>
//       <TouchableOpacity
//         onPress={handleVerifyOTP}
//         style={{
//           backgroundColor: "blue",
//           padding: 15,
//           borderRadius: 10,
//           width: "100%",
//           alignItems: "center",
//           marginBottom: 20,
//         }}
//       >
//         {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: "white", fontSize: 18 }}>Verify</Text>}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SignupScreen;






















// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, TextInput } from "react-native";

// const BASE_URL = "https://avijobackend-production.up.railway.app";

// const SignupScreen = ({ route, navigation }) => {
//   const { mobileNumber } = route.params;
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);

//   const handleVerifyOTP = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/verifyLogin`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ mobileNumber, otp }),
//       });

//       const data = await response.json();
//       console.log("Verification Response:", data); // Log the verification response

//       if (response.ok) {
//         // Navigate to HomeScreen after successful verification
//         navigation.navigate("HomeScreen");
//       } else {
//         Alert.alert("Error", data.message || "OTP verification failed.");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       Alert.alert("Error", "OTP verification failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [countdown]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Login & Signup</Text>
//       <Text style={styles.text}>Sign up or Sign in to access your orders, special offers, health tips, and more!</Text>

//       {/* Phone Number Display */}
//       <View style={styles.phoneContainer}>
//         <Text style={styles.phoneText}>PHONE NUMBER</Text>
//         <View style={styles.inputContainer}>
//           <Text style={styles.countryCode}>+91</Text>
//           <Text style={styles.phoneNumber}>{mobileNumber}</Text>
//         </View>
//       </View>

//       {/* OTP Verification Section */}
//       <Text style={styles.otpHeading}>VERIFYING NUMBER</Text>
//       <Text style={styles.otpText}>We have sent a 6-digit OTP to <Text style={{ color: "black" }}>+91 {mobileNumber}</Text></Text>

//       {/* OTP Input */}
//       <View style={styles.otpInputContainer}>
//         <TextInput
//           style={styles.otpInput}
//           placeholder="Enter OTP"
//           keyboardType="numeric"
//           maxLength={6}
//           value={otp}
//           onChangeText={setOtp}
//         />
//       </View>

//       {/* Countdown Timer */}
//       <Text style={styles.countdownText}>Waiting for OTP... {countdown} Sec</Text>

//       {/* Verify Button */}
//       <View style={styles.buttonContainer}>
//         {loading ? (
//           <ActivityIndicator size={"large"} color="#0000ff" />
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
//             <Text style={styles.buttonText}>Verify</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "white",
//     padding: 20,
//   },
//   heading: {
//     color: "#0095D9",
//     fontSize: 32,
//     fontWeight: "bold",
//     alignSelf: "flex-start",
//     marginLeft: "5",
//   },
//   text: {
//     color: "gray",
//     width: "90%",
//     marginTop: "5%",
//     marginRight: "20"
//   },
//   phoneContainer: {
//     width: "80%",
//     alignItems: "center",
//     alignSelf: "flex-start",
//     marginLeft: "2%",
//     marginTop: "10%",
//   },
//   phoneText: {
//     fontSize: 12,
//     fontWeight: "600",
//     alignSelf: "flex-start",
//     marginLeft: "2%",
//     color: "#0095D9",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     width: "100%",
//     height: 52,
//     backgroundColor: "white",
//     borderRadius: 6,
//     borderColor: "gray",
//     borderWidth: 1,
//     alignItems: "center",
//     paddingLeft: 15,
//   },
//   countryCode: {
//     fontSize: 14,
//     color: "black",
//     marginRight: 10,
//   },
//   phoneNumber: {
//     fontSize: 14,
//     color: "black",
  
//   },
//   otpHeading: {
//     fontSize: 12,
//     fontWeight: "500",
//     alignSelf: "flex-start",
//     marginLeft: "3%",
//     marginTop: "10%",
//   },
//   otpText: {
//     fontSize: 10,
//     color: "gray",
//     alignSelf: "flex-start",
//     marginLeft: "3%",
//     marginTop: "2%",
//   },
//   otpInputContainer: {
//     width: "90%",
//     marginTop: "5%",
//     marginRight: "5%"
//   },
//   otpInput: {
//     width: "100%",
//     height: 50,
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 6,
//     paddingHorizontal: 10,
//     fontSize: 18,
//   },
//   countdownText: {
//     fontSize: 10,
//     color: "gray",
//     alignSelf: "flex-start",
//     marginLeft: "5%",
//     marginTop: "2%",
//   },
//   buttonContainer: {
//     width: "100%",
//     alignItems: "center",
//     marginTop: "15%",
//   },
//   button: {
//     width: "90%",
//     height: 46,
//     backgroundColor: "#0095D9",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });

// export default SignupScreen;





























// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   StyleSheet,
//   TextInput
// } from "react-native";

// const BASE_URL = "https://avijo-571935621051.asia-south2.run.app";

// const SignupScreen = ({ route, navigation }) => {
//   const { mobileNumber } = route.params;
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);

//   const handleVerifyOTP = async () => {
//     const enteredOtp = otp.join(""); // Join OTP digits
//     if (enteredOtp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/verifyLogin`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ mobileNumber, otp: enteredOtp }),
//       });

//       const data = await response.json();
//       console.log("Verification Response:", data);

//       if (response.ok) {
//         navigation.navigate("HomeScreen");
//       } else {
//         Alert.alert("Error", data.message || "OTP verification failed.");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       Alert.alert("Error", "OTP verification failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [countdown]);

//   const handleOtpChange = (index, value) => {
//     if (isNaN(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Login & Signin</Text>
//       <Text style={styles.text}>
//         Sign up or Sign in to access your 
//       </Text>
//       <Text style={styles.text2}>orders, special offers, health tips, and more!</Text>

//       {/* Phone Number Section */}
//       <View style={styles.phoneContainer}>
//         <Text style={styles.phoneText}>PHONE NUMBER</Text>
//         <View style={styles.phoneUnderline}>
//           <Text style={styles.countryCode}>+91</Text>
//           <Text style={styles.phoneNumber}>{mobileNumber}</Text>
//         </View>
//       </View>

//       {/* OTP Section */}
//       <Text style={styles.otpHeading}>VERIFYING NUMBER</Text>
//       <Text style={styles.otpText}>
//         We have sent a 6-digit OTP to <Text style={{ color: "black" }}>+91 {mobileNumber}</Text>
//       </Text>

//       {/* OTP Input Boxes */}
//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             style={styles.otpBox}
//             maxLength={1}
//             keyboardType="numeric"
//             value={digit}
//             onChangeText={(value) => handleOtpChange(index, value)}
//           />
//         ))}
//       </View>

//       {/* Countdown Timer */}
//       <Text style={styles.countdownText}>Waiting for OTP... {countdown} Sec</Text>

//       {/* Verify Button */}
//       <View style={styles.buttonContainer}>
//         {loading ? (
//           <ActivityIndicator size={"large"} color="#0095D9" />
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
//             <Text style={styles.buttonText}>Verify</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingHorizontal: 24, // Align everything 24px from the left
//     justifyContent: "center",
//   },
//   heading: {
//     color: "#0095D9",
//     fontSize: 32,
//     fontWeight: "bold",
//     fontFamily: 'Gilroy-Bold'
//   },
//   text: {
//     color: "gray",
//     marginTop: 10,
//     marginBottom: 0,
//     fontSize: 14,
//   },
//   text2: {
//     color: "gray",
//     marginTop: 2,
//     marginBottom: 5,
//     fontSize: 14,
//   },
//   phoneContainer: {
//     marginTop: 20,
//   },
//   phoneText: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#0095D9",
//   },
//   phoneUnderline: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "gray",
//     paddingBottom: 5,
//     marginTop: 5,
//   },
//   countryCode: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "black",
//     marginRight: 10,
//   },
//   phoneNumber: {
//     fontSize: 14,
//     color: "black",
//   },
//   otpHeading: {
//     fontSize: 12,
//     fontWeight: "500",
//     marginTop: 30,
//   },
//   otpText: {
//     fontSize: 12,
//     color: "gray",
//     marginTop: 5,
//   },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 15,
//   },
//   otpBox: {
//     width: 45,
//     height: 50,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 6,
//     fontSize: 18,
//     textAlign: "center",
//   },
//   countdownText: {
//     fontSize: 12,
//     color: "gray",
//     marginTop: 15,
//   },
//   buttonContainer: {
//     marginTop: 30,
//     alignItems: "center",
//   },
//   button: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "#0095D9",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });

// export default SignupScreen;











// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   StyleSheet,
//   TextInput
// } from "react-native";

// const BASE_URL = "https://avijo-571935621051.asia-south2.run.app";

// const SignupScreen = ({ route, navigation }) => {
//   const { mobileNumber } = route.params;
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);

//   const handleVerifyOTP = async () => {
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/verifyLogin`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ mobileNumber, otp: enteredOtp }),
//       });

//       const data = await response.json();
//       console.log("Verification Response:", data);

//       if (response.ok) {
//         navigation.navigate("HomeScreen");
//       } else {
//         Alert.alert("Error", data.message || "OTP verification failed.");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       Alert.alert("Error", "OTP verification failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     try {
//       setResendLoading(true);
//       const response = await fetch(`${BASE_URL}/user/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ mobileNumber }),
//       });

//       const data = await response.json();
//       console.log("Resend OTP Response:", data);

//       if (response.ok) {
//         Alert.alert("Success", "OTP has been resent successfully");
//         setCountdown(60);
//         setOtp(["", "", "", "", "", ""]);
//       } else {
//         Alert.alert("Error", data.message || "Failed to resend OTP");
//       }
//     } catch (error) {
//       console.error("Error resending OTP:", error);
//       Alert.alert("Error", "Failed to resend OTP. Please try again.");
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [countdown]);

//   const handleOtpChange = (index, value) => {
//     if (isNaN(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Login & Signin</Text>
//       <Text style={styles.text}>
//         Sign up or Sign in to access your 
//       </Text>
//       <Text style={styles.text2}>orders, special offers, health tips, and more!</Text>

      
//             <View style={styles.phoneContainer}>
//         <Text style={styles.phoneText}>PHONE NUMBER</Text>
//         <View style={styles.phoneUnderline}>
//           <Text style={styles.countryCode}>+91</Text>
//           <Text style={styles.phoneNumber}>{mobileNumber}</Text>
//         </View>
//       </View>

      
//       <Text style={styles.otpHeading}>VERIFYING NUMBER</Text>
//       <View style={styles.otpTextContainer}>
//         <Text style={styles.otpText}>
//           We have sent a 6-digit OTP to <Text style={styles.otpPhoneNumber}>+91 {mobileNumber}</Text>
//         </Text>
//         <TouchableOpacity 
//           onPress={handleResendOTP}
//           disabled={resendLoading || countdown > 0}
//         >
//           <Text style={[
//             styles.changeText,
//             (resendLoading || countdown > 0) && styles.changeTextDisabled
//           ]}>
//             {resendLoading ? 'Sending...' : 'Change'}
//           </Text>
//         </TouchableOpacity>
//       </View>

      
//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             style={styles.otpBox}
//             maxLength={1}
//             keyboardType="numeric"
//             value={digit}
//             onChangeText={(value) => handleOtpChange(index, value)}
//           />
//         ))}
//       </View>

      
//       <Text style={styles.countdownText}>Waiting for OTP... {countdown} Sec</Text>

      
//       <View style={styles.buttonContainer}>
//         {loading ? (
//           <ActivityIndicator size={"large"} color="#0095D9" />
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
//             <Text style={styles.buttonText}>Verify</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingHorizontal: 24,
//     justifyContent: "center",
//   },
//   heading: {
//     color: "#0095D9",
//     fontSize: 32,
//     fontWeight: "bold",
//     fontFamily: 'Gilroy-Bold'
//   },
//   text: {
//     color: "gray",
//     marginTop: 10,
//     marginBottom: 0,
//     fontSize: 14,
//   },
//   text2: {
//     color: "gray",
//     marginTop: 2,
//     marginBottom: 5,
//     fontSize: 14,
//   },
//   phoneContainer: {
//     marginTop: 20,
//   },
//   phoneText: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#0095D9",
//   },
//   phoneUnderline: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "gray",
//     paddingBottom: 5,
//     marginTop: 5,
//   },
//   countryCode: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "black",
//     marginRight: 10,
//   },
//   phoneNumber: {
//     fontSize: 14,
//     color: "black",
//   },
//   otpHeading: {
//     fontSize: 12,
//     fontWeight: "500",
//     marginTop: 30,
//   },
//   otpTextContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   otpText: {
//     fontSize: 12,
//     color: "gray",
//   },
//   otpPhoneNumber: {
//     color: "black",
//     fontWeight: '500',
//   },
//   changeText: {
//     color: '#0095D9',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   changeTextDisabled: {
//     color: 'lightgray',
//   },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 15,
//   },
//   otpBox: {
//     width: 45,
//     height: 50,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 6,
//     fontSize: 18,
//     textAlign: "center",
//   },
//   countdownText: {
//     fontSize: 12,
//     color: "gray",
//     marginTop: 15,
//   },
//   buttonContainer: {
//     marginTop: 30,
//     alignItems: "center",
//   },
//   button: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "#0095D9",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });

// export default SignupScreen;
















// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   StyleSheet,
//   TextInput,
// } from "react-native";

// const BASE_URL = "https://avijo-571935621051.asia-south2.run.app";

// const SignupScreen = ({ route, navigation }) => {
//   const { mobileNumber } = route.params;
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);
  
//   // Added for OTP auto-focus
//   const otpInputs = Array(6).fill().map(() => useRef(null));

//   // Auto-focus first input on mount
//   useEffect(() => {
//     otpInputs[0].current?.focus();
//   }, []);

//   // Existing verify function (unchanged)
//   // const handleVerifyOTP = async () => {
//   //   const enteredOtp = otp.join("");
//   //   if (enteredOtp.length !== 6) {
//   //     Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
//   //     return;
//   //   }

//   //   try {
//   //     setLoading(true);
//   //     const response = await fetch(`${BASE_URL}/user/verifyLogin`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ mobileNumber, otp: enteredOtp }),
//   //     });

//   //     const data = await response.json();
//   //     console.log("Verification Response:", data);

//   //     if (response.ok) {
//   //       navigation.navigate("HomeScreen");
//   //     } else {
//   //       Alert.alert("Error", data.message || "OTP verification failed.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error verifying OTP:", error);
//   //     Alert.alert("Error", "OTP verification failed. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleVerifyOTP = async (otpString) => {
//     const enteredOtp = otpString || otp.join(""); // Accept passed OTP or use state
//     if (enteredOtp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
//       return;
//     }
  
//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/verifyLogin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber, otp: enteredOtp }),
//       });
  
//       const data = await response.json();
//       if (response.ok) {
//         navigation.navigate("HomeScreen");
//       } else {
//         Alert.alert("Error", data.message || "OTP verification failed.");
//       }
//     } catch (error) {
//       Alert.alert("Error", "OTP verification failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Existing resend function (unchanged)
//   const handleResendOTP = async () => {
//     try {
//       setResendLoading(true);
//       const response = await fetch(`${BASE_URL}/user/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ mobileNumber }),
//       });

//       const data = await response.json();
//       console.log("Resend OTP Response:", data);

//       if (response.ok) {
//         Alert.alert("Success", "OTP has been resent successfully");
//         setCountdown(60);
//         setOtp(["", "", "", "", "", ""]);
//         otpInputs[0].current.focus(); // Added auto-focus on resend
//       } else {
//         Alert.alert("Error", data.message || "Failed to resend OTP");
//       }
//     } catch (error) {
//       console.error("Error resending OTP:", error);
//       Alert.alert("Error", "Failed to resend OTP. Please try again.");
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   // Existing countdown (unchanged)
//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [countdown]);

//   // Updated OTP handler with auto-focus and auto-submit
//   // const handleOtpChange = (index, value) => {
//   //   if (isNaN(value)) return;
//   //   const newOtp = [...otp];
//   //   newOtp[index] = value;
//   //   setOtp(newOtp);

//   //   // Auto-focus next input
//   //   if (value && index < 5) {
//   //     otpInputs[index + 1].current.focus();
//   //   }

//   //   // Auto-submit when last digit entered
//   //   if (index === 5 && value) {
//   //     handleVerifyOTP();
//   //   }
//   // };

//   const handleOtpChange = (index, value) => {
//     if (isNaN(value)) return;
    
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
  
//     // Auto-focus next input
//     if (value && index < 5) {
//       otpInputs[index + 1].current.focus();
//     }
  
//     // Auto-submit if last digit entered (using the updated OTP)
//     if (index === 5 && value) {
//       const finalOtp = [...newOtp]; // Use the latest OTP array
//       finalOtp[index] = value; // Ensure last digit is included
//       setTimeout(() => {
//         handleVerifyOTP(finalOtp.join("")); // Pass the complete OTP
//       }, 0);
//     }
//   };

//   // Added backspace handling
//   const handleKeyPress = (index, e) => {
//     if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
//       otpInputs[index - 1].current.focus();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* ALL UI REMAINS EXACTLY THE SAME */}
//       <Text style={styles.heading}>Login & Signin</Text>
//       <Text style={styles.text}>
//         Sign up or Sign in to access your 
//       </Text>
//       <Text style={styles.text2}>orders, special offers, health tips, and more!</Text>

//       <View style={styles.phoneContainer}>
//         <Text style={styles.phoneText}>PHONE NUMBER</Text>
//         <View style={styles.phoneUnderline}>
//           <Text style={styles.countryCode}>+91</Text>
//           <Text style={styles.phoneNumber}>{mobileNumber}</Text>
//         </View>
//       </View>

//       <Text style={styles.otpHeading}>VERIFYING NUMBER</Text>
//       <View style={styles.otpTextContainer}>
//         <Text style={styles.otpText}>
//           We have sent a 6-digit OTP to <Text style={styles.otpPhoneNumber}>+91 {mobileNumber}</Text>
//         </Text>
//         <TouchableOpacity 
//           onPress={handleResendOTP}
//           disabled={resendLoading || countdown > 0}
//         >
//           <Text style={[
//             styles.changeText,
//             (resendLoading || countdown > 0) && styles.changeTextDisabled
//           ]}>
//             {resendLoading ? 'Sending...' : 'Change'}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Only modified part - OTP inputs with new features */}
//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             ref={otpInputs[index]}
//             style={styles.otpBox}
//             maxLength={1}
//             keyboardType="numeric"
//             value={digit}
//             onChangeText={(value) => handleOtpChange(index, value)}
//             onKeyPress={(e) => handleKeyPress(index, e)}
//             autoFocus={index === 0}
//             textContentType="oneTimeCode" // iOS autofill
//             autoComplete="one-time-code" // Android autofill
//           />
//         ))}
//       </View>

//       <Text style={styles.countdownText}>Waiting for OTP... {countdown} Sec</Text>

//       <View style={styles.buttonContainer}>
//         {loading ? (
//           <ActivityIndicator size={"large"} color="#0095D9" />
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
//             <Text style={styles.buttonText}>Verify</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// // ALL STYLES REMAIN EXACTLY THE SAME
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingHorizontal: 24,
//     justifyContent: "center",
//   },
//   heading: {
//     color: "#0095D9",
//     fontSize: 32,
//     fontWeight: "bold",
//     fontFamily: 'Gilroy-Bold'
//   },
//   text: {
//     color: "gray",
//     marginTop: 10,
//     marginBottom: 0,
//     fontSize: 14,
//   },
//   text2: {
//     color: "gray",
//     marginTop: 2,
//     marginBottom: 5,
//     fontSize: 14,
//   },
//   phoneContainer: {
//     marginTop: 20,
//   },
//   phoneText: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#0095D9",
//   },
//   phoneUnderline: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "gray",
//     paddingBottom: 5,
//     marginTop: 5,
//   },
//   countryCode: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "black",
//     marginRight: 10,
//   },
//   phoneNumber: {
//     fontSize: 14,
//     color: "black",
//   },
//   otpHeading: {
//     fontSize: 12,
//     fontWeight: "500",
//     marginTop: 30,
//   },
//   otpTextContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   otpText: {
//     fontSize: 12,
//     color: "gray",
//   },
//   otpPhoneNumber: {
//     color: "black",
//     fontWeight: '500',
//   },
//   changeText: {
//     color: '#0095D9',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   changeTextDisabled: {
//     color: 'lightgray',
//   },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 15,
//   },
//   otpBox: {
//     width: 45,
//     height: 50,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 6,
//     fontSize: 18,
//     textAlign: "center",
//   },
//   countdownText: {
//     fontSize: 12,
//     color: "gray",
//     marginTop: 15,
//   },
//   buttonContainer: {
//     marginTop: 30,
//     alignItems: "center",
//   },
//   button: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "#0095D9",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });

// export default SignupScreen;

























// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   StyleSheet,
//   TextInput,
// } from "react-native";

// const BASE_URL = "https://avijo-571935621051.asia-south2.run.app";

// const SignupScreen = ({ route, navigation }) => {
//   const { mobileNumber } = route.params;
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);
  
//   const otpInputs = Array(6).fill().map(() => useRef(null));

//   useEffect(() => {
//     otpInputs[0].current?.focus();
//   }, []);

//   // Modified to accept OTP parameter
//   const verifyOTP = async (otpToVerify) => {
//     if (otpToVerify.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
//       return false;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/verifyLogin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber, otp: otpToVerify }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         navigation.navigate("HomeScreen");
//         return true;
//       } else {
//         Alert.alert("Error", data.message || "OTP verification failed.");
//         return false;
//       }
//     } catch (error) {
//       Alert.alert("Error", "OTP verification failed. Please try again.");
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Original handleVerifyOTP remains unchanged
//   const handleVerifyOTP = async () => {
//     await verifyOTP(otp.join(""));
//   };

//   const handleResendOTP = async () => {
//     try {
//       setResendLoading(true);
//       const response = await fetch(`${BASE_URL}/user/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         Alert.alert("Success", "OTP has been resent successfully");
//         setCountdown(60);
//         setOtp(["", "", "", "", "", ""]);
//         otpInputs[0].current.focus();
//       } else {
//         Alert.alert("Error", data.message || "Failed to resend OTP");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to resend OTP. Please try again.");
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
//       return () => clearInterval(timer);
//     }
//   }, [countdown]);

//   const handleOtpChange = (index, value) => {
//     if (isNaN(value)) return;
    
//     // Create new OTP array with the updated value
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Handle paste operation (when user pastes a 6-digit code)
//     if (value.length === 6) {
//       const otpArray = value.split('').slice(0, 6);
//       setOtp(otpArray);
//       otpInputs[5].current.focus();
//       setTimeout(() => verifyOTP(otpArray.join("")), 100);
//       return;
//     }

//     // Auto-focus next input for single digit entry
//     if (value && index < 5) {
//       otpInputs[index + 1].current.focus();
//     }

//     // Auto-submit when last digit is entered
//     if (index === 5 && value) {
//       setTimeout(() => {
//         verifyOTP([...newOtp.slice(0, 5), value].join(""));
//       }, 100);
//     }
//   };

//   const handleKeyPress = (index, e) => {
//     if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
//       otpInputs[index - 1].current.focus();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Your existing UI remains exactly the same */}
//       <Text style={styles.heading}>Login & Signin</Text>
//       <Text style={styles.text}>Sign up or Sign in to access your</Text>
//       <Text style={styles.text2}>orders, special offers, health tips, and more!</Text>

//       <View style={styles.phoneContainer}>
//         <Text style={styles.phoneText}>PHONE NUMBER</Text>
//         <View style={styles.phoneUnderline}>
//           <Text style={styles.countryCode}>+91</Text>
//           <Text style={styles.phoneNumber}>{mobileNumber}</Text>
//         </View>
//       </View>

//       <Text style={styles.otpHeading}>VERIFYING NUMBER</Text>
//       <View style={styles.otpTextContainer}>
//         <Text style={styles.otpText}>
//           We have sent a 6-digit OTP to <Text style={styles.otpPhoneNumber}>+91 {mobileNumber}</Text>
//         </Text>
//         <TouchableOpacity 
//           onPress={handleResendOTP}
//           disabled={resendLoading || countdown > 0}
//         >
//           <Text style={[
//             styles.changeText,
//             (resendLoading || countdown > 0) && styles.changeTextDisabled
//           ]}>
//             {resendLoading ? 'Sending...' : 'Change'}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             ref={otpInputs[index]}
//             style={styles.otpBox}
//             maxLength={6} // Allow pasting full OTP
//             keyboardType="numeric"
//             value={digit}
//             onChangeText={(value) => handleOtpChange(index, value)}
//             onKeyPress={(e) => handleKeyPress(index, e)}
//             autoFocus={index === 0}
//           />
//         ))}
//       </View>

//       <Text style={styles.countdownText}>Waiting for OTP... {countdown} Sec</Text>

//       <View style={styles.buttonContainer}>
//         {loading ? (
//           <ActivityIndicator size={"large"} color="#0095D9" />
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
//             <Text style={styles.buttonText}>Verify</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// // Your original styles remain exactly the same
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingHorizontal: 24,
//     justifyContent: "center",
//   },
//   heading: {
//     color: "#0095D9",
//     fontSize: 32,
//     fontWeight: "bold",
//     fontFamily: 'Gilroy-Bold'
//   },
//   text: {
//     color: "gray",
//     marginTop: 10,
//     marginBottom: 0,
//     fontSize: 14,
//   },
//   text2: {
//     color: "gray",
//     marginTop: 2,
//     marginBottom: 5,
//     fontSize: 14,
//   },
//   phoneContainer: {
//     marginTop: 20,
//   },
//   phoneText: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#0095D9",
//   },
//   phoneUnderline: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "gray",
//     paddingBottom: 5,
//     marginTop: 5,
//   },
//   countryCode: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "black",
//     marginRight: 10,
//   },
//   phoneNumber: {
//     fontSize: 14,
//     color: "black",
//   },
//   otpHeading: {
//     fontSize: 12,
//     fontWeight: "500",
//     marginTop: 30,
//   },
//   otpTextContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   otpText: {
//     fontSize: 12,
//     color: "gray",
//   },
//   otpPhoneNumber: {
//     color: "black",
//     fontWeight: '500',
//   },
//   changeText: {
//     color: '#0095D9',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   changeTextDisabled: {
//     color: 'lightgray',
//   },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 15,
//   },
//   otpBox: {
//     width: 45,
//     height: 50,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 6,
//     fontSize: 18,
//     textAlign: "center",
//   },
//   countdownText: {
//     fontSize: 12,
//     color: "gray",
//     marginTop: 15,
//   },
//   buttonContainer: {
//     marginTop: 30,
//     alignItems: "center",
//   },
//   button: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "#0095D9",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });

// export default SignupScreen;





















// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   StyleSheet,
//   TextInput,
// } from "react-native";

// const BASE_URL = "https://avijo-571935621051.asia-south2.run.app";

// const SignupScreen = ({ route, navigation }) => {
//   const { mobileNumber } = route.params;
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [countdown, setCountdown] = useState(10);
  
//   const otpInputs = Array(6).fill().map(() => useRef(null));

//   useEffect(() => {
//     otpInputs[0].current?.focus();
//   }, []);

//   const verifyOTP = async (otpToVerify) => {
//     if (otpToVerify.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
//       return false;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(${BASE_URL}/user/verifyLogin, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber, otp: otpToVerify }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         navigation.navigate("HomeScreen");
//         return true;
//       } else {
//         Alert.alert("Error", data.message || "OTP verification failed.");
//         return false;
//       }
//     } catch (error) {
//       Alert.alert("Error", "OTP verification failed. Please try again.");
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     await verifyOTP(otp.join(""));
//   };

//   const handleResendOTP = async () => {
//     try {
//       setResendLoading(true);
//       const response = await fetch(${BASE_URL}/user/login, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         Alert.alert("Success", "OTP has been resent successfully");
//         setCountdown(10);
//         setOtp(["", "", "", "", "", ""]);
//         otpInputs[0].current.focus();
//       } else {
//         Alert.alert("Error", data.message || "Failed to resend OTP");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to resend OTP. Please try again.");
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
//       return () => clearInterval(timer);
//     }
//   }, [countdown]);

//   const handleOtpChange = (index, value) => {
//     if (isNaN(value)) return;
    
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value.length === 6) {
//       const otpArray = value.split('').slice(0, 6);
//       setOtp(otpArray);
//       otpInputs[5].current.focus();
//       setTimeout(() => verifyOTP(otpArray.join("")), 100);
//       return;
//     }

//     if (value && index < 5) {
//       otpInputs[index + 1].current.focus();
//     }

//     if (index === 5 && value) {
//       setTimeout(() => {
//         verifyOTP([...newOtp.slice(0, 5), value].join(""));
//       }, 100);
//     }
//   };

//   const handleKeyPress = (index, e) => {
//     if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
//       otpInputs[index - 1].current.focus();
//     }
//   };

//   const handleChangeNumber = () => {
//     navigation.navigate("LoginScreen");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Login & Signin</Text>
//       <Text style={styles.text}>Sign up or Sign in to access your</Text>
//       <Text style={styles.text2}>orders, special offers, health tips, and more!</Text>

//       <View style={styles.phoneContainer}>
//         <Text style={styles.phoneText}>PHONE NUMBER</Text>
//         <View style={styles.phoneUnderline}>
//           <Text style={styles.countryCode}>+91</Text>
//           <Text style={styles.phoneNumber}>{mobileNumber}</Text>
//           <TouchableOpacity onPress={handleChangeNumber}>
//             <Text style={styles.changeText}>Change</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <Text style={styles.otpHeading}>VERIFYING NUMBER</Text>
//       <View style={styles.otpTextContainer}>
//         <Text style={styles.otpText}>
//           We have sent a 6-digit OTP to <Text style={styles.otpPhoneNumber}>+91 {mobileNumber}</Text>
//         </Text>
//       </View>

//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             ref={otpInputs[index]}
//             style={styles.otpBox}
//             maxLength={6}
//             keyboardType="numeric"
//             value={digit}
//             onChangeText={(value) => handleOtpChange(index, value)}
//             onKeyPress={(e) => handleKeyPress(index, e)}
//             autoFocus={index === 0}
//           />
//         ))}
//       </View>

//       {countdown > 0 ? (
//         <Text style={styles.countdownText}>Waiting for OTP... {countdown} Sec</Text>
//       ) : (
//         <TouchableOpacity 
//           onPress={handleResendOTP}
//           disabled={resendLoading}
//           style={styles.resendButton}
//         >
//           {resendLoading ? (
//             <ActivityIndicator color="#0095D9" />
//           ) : (
//             <Text style={styles.resendText}>Resend OTP</Text>
//           )}
//         </TouchableOpacity>
//       )}

//       <View style={styles.buttonContainer}>
//         {loading ? (
//           <ActivityIndicator size={"large"} color="#0095D9" />
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
//             <Text style={styles.buttonText}>Verify</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingHorizontal: 24,
//     justifyContent: "center",
//   },
//   heading: {
//     color: "#0095D9",
//     fontSize: 32,
//     fontFamily: "Lato-Bold",
//   },
//   text: {
//     color: "gray",
//     marginTop: 10,
//     marginBottom: 0,
//     fontSize: 14,
//     fontFamily: "Lato-Regular",
//   },
//   text2: {
//     color: "gray",
//     marginTop: 2,
//     marginBottom: 5,
//     fontSize: 14,
//     fontFamily: "Lato-Regular",
//   },
//   phoneContainer: {
//     marginTop: 20,
//   },
//   phoneText: {
//     fontSize: 12,
//     fontFamily: "Lato-SemiBold",
//     color: "#0095D9",
//   },
//   phoneUnderline: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "gray",
//     paddingBottom: 5,
//     marginTop: 5,
//   },
//   countryCode: {
//     fontSize: 14,
//     fontFamily: "Lato-Regular",
//     color: "black",
//     marginRight: 10,
//   },
//   phoneNumber: {
//     fontSize: 14,
//     fontFamily: "Lato-Regular",
//     color: "black",
//     flex: 1,
//   },
//   changeText: {
//     color: '#0095D9',
//     fontSize: 12,
//     fontFamily: "Lato-SemiBold",
//   },
//   otpHeading: {
//     fontSize: 12,
//     fontFamily: "Lato-SemiBold",
//     marginTop: 30,
//   },
//   otpTextContainer: {
//     marginTop: 5,
//   },
//   otpText: {
//     fontSize: 12,
//     color: "gray",
//     fontFamily: "Lato-Regular",
//   },
//   otpPhoneNumber: {
//     color: "black",
//     fontFamily: "Lato-SemiBold",
//   },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 15,
//   },
//   otpBox: {
//     width: 45,
//     height: 50,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 6,
//     fontSize: 18,
//     textAlign: "center",
//     fontFamily: "Lato-Regular",
//   },
//   countdownText: {
//     fontSize: 12,
//     color: "gray",
//     fontFamily: "Lato-Regular",
//     marginTop: 15,
//     textAlign: "center",
//     marginRight:210
//   },
//   resendButton: {
//     marginTop: 15,
//     alignItems: "center",
//   },
//   resendText: {
//     fontSize: 14,
//     color: "#0095D9",
//     fontFamily: "Lato-SemiBold",
//     marginRight:265
//   },
//   buttonContainer: {
//     marginTop: 30,
//     alignItems: "center",
//   },
//   button: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "#0095D9",
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontFamily: "Lato-SemiBold",
//   },
// });

// export default SignupScreen;




















import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInput,
} from "react-native";

const BASE_URL = "https://avijo-571935621051.asia-south2.run.app";

const SignupScreen = ({ route, navigation }) => {
  const { mobileNumber, otp: initialOtp } = route.params || {};
  const [otp, setOtp] = useState(initialOtp ? initialOtp.split('') : ["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30); // Increased from 10 to 30 seconds
  const [isAutoVerifying, setIsAutoVerifying] = useState(false);
  
  const otpInputs = Array(6).fill().map(() => useRef(null));

  useEffect(() => {
    otpInputs[0].current?.focus();
  }, []);

  const verifyOTP = async (otpToVerify) => {
    if (otpToVerify.length !== 6 || isNaN(otpToVerify)) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
      return false;
    }

    try {
      setLoading(true);
      setIsAutoVerifying(true);
      
      const response = await fetch(`${BASE_URL}/user/verifyLogin`, {
        method: "POST",
        credentials: 'include', // Essential for cookies
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          mobileNumber, 
          otp: otpToVerify 
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // JWT cookie is automatically stored by browser
        navigation.replace("HomeScreen");
        return true;
      } else {
        Alert.alert("Error", data.message || "OTP verification failed.");
        return false;
      }
    } catch (error) {
      console.error("Verification error:", error);
      Alert.alert("Error", "OTP verification failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
      setIsAutoVerifying(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (isAutoVerifying) return;
    await verifyOTP(otp.join(""));
  };

  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        credentials: 'include', // For cookie consistency
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ mobileNumber }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "OTP has been resent successfully");
        setCountdown(30);
        setOtp(["", "", "", "", "", ""]);
        otpInputs[0].current?.focus();
      } else {
        Alert.alert("Error", data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend error:", error);
      Alert.alert("Error", "Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Handle paste operation (6 digits at once)
    if (value.length === 6) {
      const otpArray = value.split('').slice(0, 6);
      setOtp(otpArray);
      otpInputs[5].current?.focus();
      verifyOTP(otpArray.join(""));
      return;
    }

    // Auto-focus next field
    if (value && index < 5) {
      otpInputs[index + 1].current?.focus();
    }

    // Auto-verify when last digit is entered
    if (index === 5 && value) {
      verifyOTP([...newOtp.slice(0, 5), value].join(""));
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs[index - 1].current?.focus();
    }
  };

  const handleChangeNumber = () => {
    navigation.replace("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login & Signin</Text>
      <Text style={styles.text}>Sign up or Sign in to access your</Text>
      <Text style={styles.text2}>orders, special offers, health tips, and more!</Text>

      <View style={styles.phoneContainer}>
        <Text style={styles.phoneText}>PHONE NUMBER</Text>
        <View style={styles.phoneUnderline}>
          <Text style={styles.countryCode}>+91</Text>
          <Text style={styles.phoneNumber}>{mobileNumber}</Text>
          <TouchableOpacity onPress={handleChangeNumber}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.otpHeading}>VERIFYING NUMBER</Text>
      <View style={styles.otpTextContainer}>
        <Text style={styles.otpText}>
          We have sent a 6-digit OTP to <Text style={styles.otpPhoneNumber}>+91 {mobileNumber}</Text>
        </Text>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={otpInputs[index]}
            style={[
              styles.otpBox,
              digit && styles.otpBoxFilled
            ]}
            maxLength={index === 0 ? 6 : 1} // Allow paste in first field
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleOtpChange(index, value)}
            onKeyPress={(e) => handleKeyPress(index, e)}
            autoFocus={index === 0}
            editable={!loading}
          />
        ))}
      </View>

      {countdown > 0 ? (
        <Text style={styles.countdownText}>Waiting for OTP... {countdown} Sec</Text>
      ) : (
        <TouchableOpacity 
          onPress={handleResendOTP}
          disabled={resendLoading}
          style={styles.resendButton}
        >
          {resendLoading ? (
            <ActivityIndicator color="#0095D9" />
          ) : (
            <Text style={styles.resendText}>Resend OTP</Text>
          )}
        </TouchableOpacity>
      )}

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size={"large"} color="#0095D9" />
        ) : (
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleVerifyOTP}
            disabled={otp.join("").length !== 6}
          >
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  heading: {
    color: "#0095D9",
    fontSize: 32,
    fontFamily: "Lato-Bold",
  },
  text: {
    color: "gray",
    marginTop: 10,
    marginBottom: 0,
    fontSize: 14,
    fontFamily: "Lato-Regular",
  },
  text2: {
    color: "gray",
    marginTop: 2,
    marginBottom: 5,
    fontSize: 14,
    fontFamily: "Lato-Regular",
  },
  phoneContainer: {
    marginTop: 20,
  },
  phoneText: {
    fontSize: 12,
    fontFamily: "Lato-SemiBold",
    color: "#0095D9",
  },
  phoneUnderline: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 5,
    marginTop: 5,
  },
  countryCode: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
    color: "black",
    marginRight: 10,
  },
  phoneNumber: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
    color: "black",
    flex: 1,
  },
  changeText: {
    color: '#0095D9',
    fontSize: 12,
    fontFamily: "Lato-SemiBold",
  },
  otpHeading: {
    fontSize: 12,
    fontFamily: "Lato-SemiBold",
    marginTop: 30,
  },
  otpTextContainer: {
    marginTop: 5,
  },
  otpText: {
    fontSize: 12,
    color: "gray",
    fontFamily: "Lato-Regular",
  },
  otpPhoneNumber: {
    color: "black",
    fontFamily: "Lato-SemiBold",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  otpBox: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Lato-Regular",
  },
  otpBoxFilled: {
    borderColor: "#0095D9",
    backgroundColor: "#F0F9FF",
  },
  countdownText: {
    fontSize: 12,
    color: "gray",
    fontFamily: "Lato-Regular",
    marginTop: 15,
    textAlign: "center",
    marginRight: 210
  },
  resendButton: {
    marginTop: 15,
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
    color: "#0095D9",
    fontFamily: "Lato-SemiBold",
    marginRight: 265
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#0095D9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#B0E0F0",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Lato-SemiBold",
  },
});

export default SignupScreen;