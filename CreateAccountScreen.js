










// import React, { useState } from "react";
// import {
//   View, Text, TextInput, TouchableOpacity,
//   Alert, ActivityIndicator, StyleSheet
// } from "react-native";
// import axios from "axios"; // Import axios for API calls

// const BASE_URL = "https://avijobackend-production.up.railway.app";

// const CreateAccount = ({ navigation }) => {
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);

//   // ✅ Function to format Date of Birth as YYYY-MM-DD
//   const formatDateOfBirth = (text) => {
//     let cleaned = text.replace(/\D/g, ""); // Remove non-numeric characters

//     if (cleaned.length > 4) cleaned = cleaned.slice(0, 4) + "-" + cleaned.slice(4);
//     if (cleaned.length > 7) cleaned = cleaned.slice(0, 7) + "-" + cleaned.slice(7, 10);

//     setDateOfBirth(cleaned);
//   };

//   // ✅ Validate Mobile Number
//   const validateMobileNumber = () => {
//     if (!mobileNumber || mobileNumber.trim().length !== 10) {
//       Alert.alert("Invalid Number", "Enter a valid 10-digit phone number.");
//       return false;
//     }
//     return true;
//   };

//   // ✅ Validate Date of Birth (YYYY-MM-DD)
//   const validateDateOfBirth = () => {
//     const [year, month, day] = dateOfBirth.split("-").map(Number);

//     // Validate Year (1900 to current year)
//     const currentYear = new Date().getFullYear();
//     if (year < 1900 || year > currentYear) {
//       Alert.alert("Invalid Year", "Year should be between 1900 and the current year.");
//       return false;
//     }

//     // Validate Month (1 to 12)
//     if (month < 1 || month > 12) {
//       Alert.alert("Invalid Month", "Month should be between 01 and 12.");
//       return false;
//     }

//     // Validate Day (1 to 31)
//     if (day < 1 || day > 31) {
//       Alert.alert("Invalid Day", "Day should be between 01 and 31.");
//       return false;
//     }

//     return true;
//   };

//   // ✅ Handle OTP Sending
//   const handleSendOTP = async () => {
//     if (!fullName.trim()) {
//       Alert.alert("Invalid Name", "Full name is required.");
//       return;
//     }
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       Alert.alert("Invalid Email", "Enter a valid email address.");
//       return;
//     }
//     if (!validateMobileNumber()) {
//       return; // Stop if mobile number is invalid
//     }
//     if (!validateDateOfBirth()) {
//       return; // Stop if DOB is invalid
//     }

//     try {
//       setLoading(true);

//       // ✅ API Call to Send OTP
//       const response = await axios.post(`${BASE_URL}/user/send-otp`, {
//         mobileNumber,
//       });

//       console.log("OTP Response:", response.data);

//       if (response.status === 200) {
//         setOtpSent(true);
//         Alert.alert("OTP Sent", "Check your phone for the OTP.");
//       } else {
//         Alert.alert("Error", response.data?.message || "Failed to send OTP.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       Alert.alert("Error", "Failed to send OTP. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle OTP Verification and Account Registration
//   const handleVerifyOTP = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Invalid OTP", "Enter a valid 6-digit OTP.");
//       return;
//     }
//     if (!validateMobileNumber()) {
//       return; // Stop if mobile number is invalid
//     }

//     try {
//       setLoading(true);

//       // Step 1: Verify OTP
//       const verifyResponse = await axios.post(`${BASE_URL}/user/verifyLogin`, {
//         mobileNumber,
//         otp,
//       });

//       console.log("Verification Response:", verifyResponse.data);

//       if (verifyResponse.status !== 200) {
//         Alert.alert("Error", verifyResponse.data?.message || "OTP verification failed.");
//         return;
//       }

//       // Step 2: Register User
//       const registerResponse = await axios.post(`${BASE_URL}/user/register`, {
//         mobileNumber,
//         fullName,
//         email,
//         dateOfBirth,
//       });

//       console.log("Registration Response:", registerResponse.data);

//       if (registerResponse.status === 200) {
//         Alert.alert("Success", "Account Created Successfully!");
//         navigation.navigate("HomeScreen"); // ✅ Navigate to HomeScreen after successful registration
//       } else {
//         Alert.alert("Error", registerResponse.data?.message || "Registration failed.");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP or registering user:", error);
//       Alert.alert("Error", "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Account</Text>

//       {/* ✅ Full Name Input */}
//       <Text style={styles.label}>FULL NAME</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//       />

//       {/* ✅ Email Input */}
//       <Text style={styles.label}>EMAIL ID</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your Email Id"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />

//       {/* ✅ Date of Birth Input (Formatted YYYY-MM-DD) */}
//       <Text style={styles.label}>DATE OF BIRTH</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="YYYY-MM-DD"
//         value={dateOfBirth}
//         onChangeText={formatDateOfBirth}
//         keyboardType="numeric"
//         maxLength={10}
//       />

//       {/* ✅ Mobile Number Input */}
//       <Text style={styles.label}>MOBILE NUMBER</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your Mobile Number"
//         keyboardType="numeric"
//         maxLength={10}
//         value={mobileNumber}
//         onChangeText={setMobileNumber}
//       />

//       {/* ✅ Send OTP Button */}
//       {!otpSent && (
//         <TouchableOpacity onPress={handleSendOTP} style={styles.button} disabled={loading}>
//           {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Send OTP</Text>}
//         </TouchableOpacity>
//       )}

//       {/* ✅ OTP Input & Verification */}
//       {otpSent && (
//         <>
//           <Text style={styles.label}>ENTER OTP</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter OTP"
//             keyboardType="numeric"
//             maxLength={6}
//             value={otp}
//             onChangeText={setOtp}
//           />

//           {/* ✅ Verify OTP Button */}
//           <TouchableOpacity onPress={handleVerifyOTP} style={styles.button} disabled={loading}>
//             {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Verify OTP</Text>}
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 24,
//     backgroundColor: "white",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#0095D9",
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginBottom: 5,
//     color: "#0097DB",
//   },
//   input: {
//     height: 50,
//     borderBottomWidth: 1,
//     borderBottomColor: "#D4CFD3",
//     fontSize: 14,
//     marginBottom: 10,
//     paddingVertical: 10,
//   },
//   button: {
//     backgroundColor: "#0097DB",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 15,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default CreateAccount;






// import React, { useState } from "react";
// import {
//   View, Text, TextInput, TouchableOpacity,
//   Alert, ActivityIndicator, StyleSheet
// } from "react-native";

// // const BASE_URL = "https://avijobackend-production.up.railway.app";

// const BASE_URL = "https://avijo-571935621051.asia-south2.run.app";
// const CreateAccount = ({ navigation }) => {
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);




//   // ✅ Function to format Date of Birth as YYYY-MM-DD
//   const formatDateOfBirth = (text) => {
//     let cleaned = text.replace(/\D/g, ""); // Remove non-numeric characters

//     if (cleaned.length > 4) cleaned = cleaned.slice(0, 4) + "-" + cleaned.slice(4);
//     if (cleaned.length > 7) cleaned = cleaned.slice(0, 7) + "-" + cleaned.slice(7, 10);

//     setDateOfBirth(cleaned);
//   };

//   // ✅ Handle OTP Sending
//   const handleSendOTP = async () => {
//     if (!fullName.trim()) {
//       Alert.alert("Invalid Name", "Full name is required.");
//       return;
//     }
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       Alert.alert("Invalid Email", "Enter a valid email address.");
//       return;
//     }
//     if (!/^\d{10}$/.test(mobileNumber)) {
//       Alert.alert("Invalid Number", "Enter a valid 10-digit phone number.");
//       return;
//     }
//     if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
//       Alert.alert("Invalid DOB", "Enter Date of Birth in YYYY-MM-DD format.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber }),
//       });

//       const data = await response.json();
//       console.log("OTP Response:", data);

//       if (response.ok) {
//         setOtpSent(true);
//         Alert.alert("OTP Sent", "Check your phone for the OTP.");
//       } else {
//         Alert.alert("Error", data?.message || "Failed to send OTP.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       Alert.alert("Error", "Failed to send OTP. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle User Registration
//   const handleRegisterUser = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Invalid OTP", "Enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // ✅ Prepare the payload for registration
//       const payload = {
//         mobileNumber: mobileNumber,
//         otp: otp,
//         fullName: fullName,
//         email: email,
//         dateOfBirth: dateOfBirth,
//       };

//       // ✅ Log the payload for debugging
//       console.log("Payload for Registration:", payload);

//       const response = await fetch(`${BASE_URL}/user/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload), // Send the payload
//       });

//       const data = await response.json();
//       console.log("Registration Response:", data);

//       if (response.ok) {
//         Alert.alert("Success", "Account Created Successfully!");
//         navigation.navigate("HomeScreen"); // Navigate to HomeScreen
//       } else {
//         Alert.alert("Error", data?.message || "Registration failed.");
//       }
//     } catch (error) {
//       console.error("Error registering user:", error);
//       Alert.alert("Error", "Failed to register. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Account</Text>

//       {/* ✅ Full Name Input */}
//       <Text style={styles.label}>FULL NAME</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//       />

//       {/* ✅ Email Input */}
//       <Text style={styles.label}>EMAIL ID</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your Email Id"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />

//       {/* ✅ Date of Birth Input (Formatted YYYY-MM-DD) */}
//       <Text style={styles.label}>DATE OF BIRTH</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="YYYY-MM-DD"
//         value={dateOfBirth}
//         onChangeText={formatDateOfBirth}
//         keyboardType="numeric"
//         maxLength={10}
//       />

//       {/* ✅ Mobile Number Input */}
//       <Text style={styles.label}>MOBILE NUMBER</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your Mobile Number"
//         keyboardType="numeric"
//         maxLength={10}
//         value={mobileNumber}
//         onChangeText={setMobileNumber}
//       />

//       {/* ✅ Send OTP Button */}
//       {!otpSent && (
//         <TouchableOpacity onPress={handleSendOTP} style={styles.button} disabled={loading}>
//           {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Send OTP</Text>}
//         </TouchableOpacity>
//       )}

//       {/* ✅ OTP Input & Registration */}
//       {otpSent && (
//         <>
//           <Text style={styles.label}>ENTER OTP</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter OTP"
//             keyboardType="numeric"
//             maxLength={6}
//             value={otp}
//             onChangeText={setOtp}
//           />

//           {/* ✅ Register Button */}
//           <TouchableOpacity onPress={handleRegisterUser} style={styles.button} disabled={loading}>
//             {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Register</Text>}
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 24,
//     backgroundColor: "white",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#0095D9",
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginBottom: 5,
//     color: "#0097DB",
//   },
//   input: {
//     height: 50,
//     borderBottomWidth: 1,
//     borderBottomColor: "#D4CFD3",
//     fontSize: 14,
//     marginBottom: 10,
//     paddingVertical: 10,
//   },
//   button: {
//     backgroundColor: "#0097DB",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 15,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default CreateAccount;













// import React, { useState, useRef, useEffect } from "react";
// import {
//   View, Text, TextInput, TouchableOpacity,
//   Alert, ActivityIndicator, StyleSheet
// } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const BASE_URL = "https://avijo-571935621051.asia-south2.run.app";

// const CreateAccount = ({ navigation }) => {
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
  
//   // Refs for OTP inputs
//   const otpInputs = Array(6).fill().map(() => useRef(null));

//   const formatDateOfBirth = (text) => {
//     let cleaned = text.replace(/\D/g, "");
//     if (cleaned.length > 4) cleaned = cleaned.slice(0, 4) + "-" + cleaned.slice(4);
//     if (cleaned.length > 7) cleaned = cleaned.slice(0, 7) + "-" + cleaned.slice(7, 10);
//     setDateOfBirth(cleaned);
//   };

//   // Store user data in AsyncStorage
//   const storeUserData = async (name, number) => {
//     try {
//       await AsyncStorage.setItem('userFullName', name);
//       await AsyncStorage.setItem('userMobileNumber', number);
//     } catch (error) {
//       console.error('Error storing user data:', error);
//     }
//   };

//   const handleSendOTP = async () => {
//     if (!fullName.trim()) {
//       Alert.alert("Invalid Name", "Full name is required.");
//       return;
//     }
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       Alert.alert("Invalid Email", "Enter a valid email address.");
//       return;
//     }
//     if (!/^\d{10}$/.test(mobileNumber)) {
//       Alert.alert("Invalid Number", "Enter a valid 10-digit phone number.");
//       return;
//     }
//     if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
//       Alert.alert("Invalid DOB", "Enter Date of Birth in YYYY-MM-DD format.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber }),
//       });

//       const data = await response.json();
//       console.log("OTP Response:", data);

//       if (response.ok) {
//         setOtpSent(true);
//         Alert.alert("OTP Sent", "Check your phone for the OTP.");
//         // Auto-focus first OTP input when OTP is sent
//         setTimeout(() => otpInputs[0].current?.focus(), 100);
//       } else {
//         Alert.alert("Error", data?.message || "Failed to send OTP.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       Alert.alert("Error", "Failed to send OTP. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegisterUser = async () => {
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length !== 6) {
//       Alert.alert("Invalid OTP", "Enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const payload = {
//         mobileNumber: mobileNumber,
//         otp: enteredOtp,
//         fullName: fullName,
//         email: email,
//         dateOfBirth: dateOfBirth,
//       };

//       console.log("Payload for Registration:", payload);

//       const response = await fetch(`${BASE_URL}/user/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       console.log("Registration Response:", data);

//       if (response.ok) {
//         // Store user data before navigation
//         await storeUserData(fullName, mobileNumber);
//         Alert.alert("Success", "Account Created Successfully!");
//         navigation.navigate("HomeScreen", { 
//           fullName,
//           mobileNumber 
//         });
//       } else {
//         Alert.alert("Error", data?.message || "Registration failed.");
//       }
//     } catch (error) {
//       console.error("Error registering user:", error);
//       Alert.alert("Error", "Failed to register. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle OTP input changes
//   const handleOtpChange = (index, value) => {
//     if (isNaN(value)) return;
    
//     // Handle paste operation (when user pastes a 6-digit code)
//     if (value.length === 6) {
//       const otpArray = value.split('').slice(0, 6);
//       setOtp(otpArray);
//       otpInputs[5].current?.focus();
//       return;
//     }

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto-focus next input when a digit is entered
//     if (value && index < 5) {
//       otpInputs[index + 1].current?.focus();
//     }
//   };

//   // Handle backspace
//   const handleKeyPress = (index, e) => {
//     if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
//       otpInputs[index - 1].current?.focus();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Account</Text>

//       <Text style={styles.label}>FULL NAME</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//       />

//       <Text style={styles.label}>EMAIL ID</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your Email Id"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />

      

//       <Text style={styles.label}>MOBILE NUMBER</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your Mobile Number"
//         keyboardType="numeric"
//         maxLength={10}
//         value={mobileNumber}
//         onChangeText={setMobileNumber}
//       />

//       {!otpSent && (
//         <TouchableOpacity onPress={handleSendOTP} style={styles.button} disabled={loading}>
//           {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Send OTP</Text>}
//         </TouchableOpacity>
//       )}

//       {otpSent && (
//         <>
//           <Text style={styles.label}>ENTER OTP</Text>
//           <View style={styles.otpContainer}>
//             {otp.map((digit, index) => (
//               <TextInput
//                 key={index}
//                 ref={otpInputs[index]}
//                 style={styles.otpBox}
//                 maxLength={6} // Allow pasting
//                 keyboardType="numeric"
//                 value={digit}
//                 onChangeText={(value) => handleOtpChange(index, value)}
//                 onKeyPress={(e) => handleKeyPress(index, e)}
//                 textContentType="oneTimeCode"
//                 autoComplete="one-time-code"
//               />
//             ))}
//           </View>

//           <TouchableOpacity onPress={handleRegisterUser} style={styles.button} disabled={loading}>
//             {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Register</Text>}
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 24,
//     backgroundColor: "white",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#0095D9",
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginBottom: 5,
//     color: "#0097DB",
//   },
//   input: {
//     height: 50,
//     borderBottomWidth: 1,
//     borderBottomColor: "#D4CFD3",
//     fontSize: 14,
//     marginBottom: 10,
//     paddingVertical: 10,
//   },
//   button: {
//     backgroundColor: "#0097DB",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 15,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 15,
//   },
//   otpBox: {
//     width: 45,
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#D4CFD3",
//     borderRadius: 6,
//     fontSize: 18,
//     textAlign: "center",
//   },
// });

// export default CreateAccount;


















// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
//   StyleSheet,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const BASE_URL = "https://avijo-571935621051.asia-south2.run.app";

// const CreateAccount = ({ route, navigation }) => {
//   const { mobileNumber, otp: initialOtp } = route.params;
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState(initialOtp ? initialOtp.split("") : ["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [countdown, setCountdown] = useState(10);
  
//   const otpInputs = Array(6).fill().map(() => useRef(null));

//   useEffect(() => {
//     otpInputs[0].current?.focus();
//   }, []);

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
//       return () => clearInterval(timer);
//     }
//   }, [countdown]);

//   const storeUserData = async (name, number) => {
//     try {
//       await AsyncStorage.setItem("userFullName", name);
//       await AsyncStorage.setItem("userMobileNumber", number);
//     } catch (error) {
//       console.error("Error storing user data:", error);
//     }
//   };

//   const handleRegisterUser = async (otpToVerify) => {
//     if (!fullName.trim()) {
//       Alert.alert("Invalid Name", "Full name is required.");
//       return;
//     }
    
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       Alert.alert("Invalid Email", "Enter a valid email address.");
//       return;
//     }

//     if (otpToVerify.length !== 6) {
//       Alert.alert("Invalid OTP", "Enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const payload = {
//         mobileNumber,
//         otp: otpToVerify,
//         fullName,
//         email,
//       };

//       const response = await fetch(`${BASE_URL}/user/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         await storeUserData(fullName, mobileNumber);
//         Alert.alert("Success", "Account Created Successfully!");
//         navigation.navigate("HomeScreen", { 
//           fullName,
//           mobileNumber 
//         });
//       } else {
//         Alert.alert("Error", data?.message || "Registration failed.");
//       }
//     } catch (error) {
//       console.error("Error registering user:", error);
//       Alert.alert("Error", "Failed to register. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     try {
//       setResendLoading(true);
//       const response = await fetch(`${BASE_URL}/user/send-otp`, {
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

//   const handleOtpChange = (index, value) => {
//     if (isNaN(value)) return;
    
//     // Handle paste operation
//     if (value.length === 6) {
//       const otpArray = value.split("").slice(0, 6);
//       setOtp(otpArray);
//       otpInputs[5].current.focus();
//       setTimeout(() => handleRegisterUser(otpArray.join("")), 100);
//       return;
//     }

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto-focus next input when a digit is entered
//     if (value && index < 5) {
//       otpInputs[index + 1].current.focus();
//     }

//     // Auto-submit when last digit is entered
//     if (index === 5 && value) {
//       const finalOtp = [...newOtp.slice(0, 5), value].join("");
//       setTimeout(() => handleRegisterUser(finalOtp), 100);
//     }
//   };

//   const handleKeyPress = (index, e) => {
//     if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
//       otpInputs[index - 1].current.focus();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Create Account</Text>
//       <Text style={styles.text}>Complete your profile to get started</Text>

//       <Text style={styles.label}>FULL NAME</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//       />

//       <Text style={styles.label}>EMAIL ID</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />

//       <Text style={styles.label}>VERIFY NUMBER</Text>
//       <View style={styles.phoneUnderline}>
//         <Text style={styles.countryCode}>+91</Text>
//         <Text style={styles.phoneNumber}>{mobileNumber}</Text>
//         <TouchableOpacity 
//           onPress={() => navigation.navigate("LoginScreen")}
//           style={styles.changeButton}
//         >
//           <Text style={styles.changeText}>Change</Text>
//         </TouchableOpacity>
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
//           />
//         ))}
//       </View>

//       <View style={styles.resendContainer}>
//         <Text style={styles.countdownText}>Waiting for OTP... {countdown} Sec</Text>
//         <TouchableOpacity 
//           onPress={handleResendOTP}
//           disabled={resendLoading || countdown > 0}
//         >
//           <Text style={[
//             styles.resendText,
//             (resendLoading || countdown > 0) && styles.resendTextDisabled
//           ]}>
//             {resendLoading ? "Sending..." : "Click Here to send OTP again"}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.buttonContainer}>
//         {loading ? (
//           <ActivityIndicator size={"large"} color="#0095D9" />
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={() => handleRegisterUser(otp.join(""))}>
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
//     marginBottom: 20,
//     fontSize: 14,
//     fontFamily: "Lato-Regular",
//   },
//   label: {
//     fontSize: 12,
//     fontFamily: "Lato-SemiBold",
//     color: "#0097DB",
//     marginTop: 15,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderColor: "gray",
//     paddingVertical: 5,
//     fontSize: 14,
//     fontFamily: "Lato-Regular",
//     marginTop: 5,
//   },
//   phoneUnderline: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderColor: "gray",
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
//   changeButton: {
//     marginLeft: 10,
//   },
//   changeText: {
//     color: "#0095D9",
//     fontSize: 12,
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
//   resendContainer: {
//     marginTop: 15,
//   },
//   countdownText: {
//     fontSize: 12,
//     color: "gray",
//     fontFamily: "Lato-Regular",
//   },
//   resendText: {
//     fontSize: 12,
//     color: "#0095D9",
//     fontFamily: "Lato-SemiBold",
//     marginTop: 5,
//   },
//   resendTextDisabled: {
//     color: "lightgray",
//   },
//   buttonContainer: {
//     marginTop: 30,
//   },
//   button: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "#0097DB",
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

// export default CreateAccount;





















// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
//   StyleSheet,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const BASE_URL = "https://avijo-571935621051.asia-south2.run.app";

// const CreateAccount = ({ route, navigation }) => {
//   const { mobileNumber, otp: initialOtp } = route.params;
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState(initialOtp ? initialOtp.split("") : ["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [countdown, setCountdown] = useState(30); // Increased from 10 to 30 seconds
//   const [isAutoVerifying, setIsAutoVerifying] = useState(false);
  
//   const otpInputs = Array(6).fill().map(() => useRef(null));

//   useEffect(() => {
//     otpInputs[0].current?.focus();
//   }, []);

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
//       return () => clearInterval(timer);
//     }
//   }, [countdown]);

//   const storeUserData = async (name, number, email) => {
//     try {
//       await AsyncStorage.multiSet([
//         ['userFullName', name],
//         ['userMobileNumber', number],
//         ['userEmail', email || '']
//       ]);
//     } catch (error) {
//       console.error("AsyncStorage Error:", error);
//       throw new Error("Failed to save user data locally");
//     }
//   };

//   const validateInputs = () => {
//     if (!fullName.trim()) {
//       Alert.alert("Invalid Name", "Full name is required.");
//       return false;
//     }
    
//     if (email && !/^\S+@\S+\.\S+$/.test(email)) {
//       Alert.alert("Invalid Email", "Please enter a valid email address.");
//       return false;
//     }

//     if (otp.join("").length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
//       return false;
//     }

//     return true;
//   };

//   const handleRegisterUser = async (otpToVerify) => {
//     if (isAutoVerifying) return;
//     if (!validateInputs()) return;

//     try {
//       setLoading(true);
//       setIsAutoVerifying(true);
      
//       const payload = {
//         mobileNumber,
//         otp: otpToVerify,
//         fullName,
//         email: email || undefined, // Send undefined if empty
//       };

//       const response = await fetch(`${BASE_URL}/user/register`, {
//         method: "POST",
//         credentials: "include", // For JWT cookies
//         headers: { 
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       console.log("Registration Response:", data);

//       if (!response.ok) {
//         throw new Error(data?.message || "Registration failed");
//       }

//       if (!data.success) {
//         throw new Error(data.message || "Registration unsuccessful");
//       }

//       // Store user data locally
//       await storeUserData(fullName, mobileNumber, email);
      
//       // Navigate to Home with fresh data
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'HomeScreen' }],
//       });

//     } catch (error) {
//       console.error("Registration Error:", error.message || error);
//       Alert.alert(
//         "Registration Failed",
//         error.message || "Could not create account. Please try again."
//       );
//     } finally {
//       setLoading(false);
//       setIsAutoVerifying(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     try {
//       setResendLoading(true);
//       const response = await fetch(`${BASE_URL}/user/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData?.message || "Failed to resend OTP");
//       }

//       const data = await response.json();
//       Alert.alert("Success", data.message || "OTP has been resent successfully");
//       setCountdown(30);
//       setOtp(["", "", "", "", "", ""]);
//       otpInputs[0].current?.focus();

//     } catch (error) {
//       console.error("Resend OTP Error:", error);
//       Alert.alert("Error", error.message || "Failed to resend OTP. Please try again.");
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   const handleOtpChange = (index, value) => {
//     if (isNaN(value)) return;
    
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Handle paste operation
//     if (value.length === 6) {
//       const otpArray = value.split('').slice(0, 6);
//       setOtp(otpArray);
//       otpInputs[5].current?.focus();
//       setTimeout(() => handleRegisterUser(otpArray.join("")), 100);
//       return;
//     }

//     // Auto-focus next field
//     if (value && index < 5) {
//       otpInputs[index + 1].current?.focus();
//     }

//     // Auto-verify when last digit is entered
//     if (index === 5 && value) {
//       handleRegisterUser([...newOtp.slice(0, 5), value].join(""));
//     }
//   };

//   const handleKeyPress = (index, e) => {
//     if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
//       otpInputs[index - 1].current?.focus();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Create Account</Text>
//       <Text style={styles.text}>Complete your profile to get started</Text>

//       <Text style={styles.label}>FULL NAME</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//         editable={!loading}
//       />

//       <Text style={styles.label}>EMAIL ID (Optional)</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         editable={!loading}
//       />

//       <Text style={styles.label}>VERIFY NUMBER</Text>
//       <View style={styles.phoneUnderline}>
//         <Text style={styles.countryCode}>+91</Text>
//         <Text style={styles.phoneNumber}>{mobileNumber}</Text>
//         <TouchableOpacity 
//           onPress={() => !loading && navigation.navigate("LoginScreen")}
//           style={styles.changeButton}
//           disabled={loading}
//         >
//           <Text style={styles.changeText}>Change</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             ref={otpInputs[index]}
//             style={[
//               styles.otpBox,
//               digit && styles.otpBoxFilled
//             ]}
//             maxLength={index === 0 ? 6 : 1} // Allow paste in first field
//             keyboardType="numeric"
//             value={digit}
//             onChangeText={(value) => handleOtpChange(index, value)}
//             onKeyPress={(e) => handleKeyPress(index, e)}
//             editable={!loading}
//           />
//         ))}
//       </View>

//       <View style={styles.resendContainer}>
//         {countdown > 0 ? (
//           <Text style={styles.countdownText}>Waiting for OTP... {countdown} Sec</Text>
//         ) : (
//           <TouchableOpacity 
//             onPress={handleResendOTP}
//             disabled={resendLoading}
//           >
//             <Text style={[
//               styles.resendText,
//               resendLoading && styles.resendTextDisabled
//             ]}>
//               {resendLoading ? "Sending..." : "Resend OTP"}
//             </Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       <View style={styles.buttonContainer}>
//         {loading ? (
//           <ActivityIndicator size={"large"} color="#0095D9" />
//         ) : (
//           <TouchableOpacity 
//             style={styles.button} 
//             onPress={() => handleRegisterUser(otp.join(""))}
//             disabled={otp.join("").length !== 6}
//           >
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
//     marginBottom: 20,
//     fontSize: 14,
//     fontFamily: "Lato-Regular",
//   },
//   label: {
//     fontSize: 12,
//     fontFamily: "Lato-SemiBold",
//     color: "#0097DB",
//     marginTop: 15,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderColor: "gray",
//     paddingVertical: 5,
//     fontSize: 14,
//     fontFamily: "Lato-Regular",
//     marginTop: 5,
//   },
//   phoneUnderline: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderColor: "gray",
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
//   changeButton: {
//     marginLeft: 10,
//   },
//   changeText: {
//     color: "#0095D9",
//     fontSize: 12,
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
//   otpBoxFilled: {
//     borderColor: "#0095D9",
//     backgroundColor: "#F0F9FF",
//   },
//   resendContainer: {
//     marginTop: 15,
//     alignItems: 'center'
//   },
//   countdownText: {
//     fontSize: 12,
//     color: "gray",
//     fontFamily: "Lato-Regular",
//   },
//   resendText: {
//     fontSize: 12,
//     color: "#0095D9",
//     fontFamily: "Lato-SemiBold",
//     marginTop: 5,
//   },
//   resendTextDisabled: {
//     color: "#CCCCCC",
//   },
//   buttonContainer: {
//     marginTop: 30,
//   },
//   button: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "#0097DB",
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

// export default CreateAccount;
















import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://avijo-571935621051.asia-south2.run.app";

const CreateAccount = ({ route, navigation }) => {
  const { mobileNumber, otp: initialOtp } = route.params;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(initialOtp ? initialOtp.split("") : ["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isAutoVerifying, setIsAutoVerifying] = useState(false);
  
  const otpInputs = Array(6).fill().map(() => useRef(null));

  useEffect(() => {
    otpInputs[0].current?.focus();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const storeUserData = async (name, number, email) => {
    try {
      await AsyncStorage.multiSet([
        ['userFullName', name],
        ['userMobileNumber', number],
        ['userEmail', email || '']
      ]);
    } catch (error) {
      console.error("AsyncStorage Error:", error);
      throw new Error("Failed to save user data locally");
    }
  };

  const validateInputs = () => {
    if (!fullName.trim()) {
      Alert.alert("Invalid Name", "Full name is required.");
      return false;
    }
    
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleRegisterUser = async (otpToVerify) => {
    if (isAutoVerifying) return;
    if (!validateInputs()) return;

    if (otpToVerify.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      setIsAutoVerifying(true);
      
      const payload = {
        mobileNumber,
        otp: otpToVerify,
        fullName,
        email: email || undefined,
      };

      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        credentials: "include",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Registration Response:", data);

      if (!response.ok) {
        throw new Error(data?.message || "Registration failed");
      }

      if (!data.success) {
        throw new Error(data.message || "Registration unsuccessful");
      }

      await storeUserData(fullName, mobileNumber, email);
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });

    } catch (error) {
      console.error("Registration Error:", error.message || error);
      Alert.alert(
        "Registration Failed",
        error.message || "Could not create account. Please try again."
      );
    } finally {
      setLoading(false);
      setIsAutoVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      const response = await fetch(`${BASE_URL}/user/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to resend OTP");
      }

      const data = await response.json();
      Alert.alert("Success", data.message || "OTP has been resent successfully");
      setCountdown(30);
      setOtp(["", "", "", "", "", ""]);
      otpInputs[0].current?.focus();

    } catch (error) {
      console.error("Resend OTP Error:", error);
      Alert.alert("Error", error.message || "Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Handle paste operation
    if (value.length === 6) {
      const otpArray = value.split('').slice(0, 6);
      setOtp(otpArray);
      otpInputs[5].current?.focus();
      setTimeout(() => handleRegisterUser(otpArray.join("")), 100);
      return;
    }

    // Auto-focus next field
    if (value && index < 5) {
      otpInputs[index + 1].current?.focus();
    }

    // Auto-verify when last digit is entered
    if (index === 5 && value) {
      const finalOtp = [...newOtp.slice(0, 5), value].join("");
      setTimeout(() => handleRegisterUser(finalOtp), 100);
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs[index - 1].current?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>
      <Text style={styles.text}>Complete your profile to get started</Text>

      <Text style={styles.label}>FULL NAME</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Full Name"
        value={fullName}
        onChangeText={setFullName}
        editable={!loading}
      />

      <Text style={styles.label}>EMAIL ID (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        editable={!loading}
      />

      <Text style={styles.label}>VERIFY NUMBER</Text>
      <View style={styles.phoneUnderline}>
        <Text style={styles.countryCode}>+91</Text>
        <Text style={styles.phoneNumber}>{mobileNumber}</Text>
        <TouchableOpacity 
          onPress={() => !loading && navigation.navigate("LoginScreen")}
          style={styles.changeButton}
          disabled={loading}
        >
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
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
            maxLength={index === 0 ? 6 : 1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleOtpChange(index, value)}
            onKeyPress={(e) => handleKeyPress(index, e)}
            editable={!loading}
          />
        ))}
      </View>

      <View style={styles.resendContainer}>
        {countdown > 0 ? (
          <Text style={styles.countdownText}>Waiting for OTP... {countdown} Sec</Text>
        ) : (
          <TouchableOpacity 
            onPress={handleResendOTP}
            disabled={resendLoading}
          >
            <Text style={[
              styles.resendText,
              resendLoading && styles.resendTextDisabled
            ]}>
              {resendLoading ? "Sending..." : "Resend OTP"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size={"large"} color="#0095D9" />
        ) : (
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => handleRegisterUser(otp.join(""))}
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
    marginBottom: 20,
    fontSize: 14,
    fontFamily: "Lato-Regular",
  },
  label: {
    fontSize: 12,
    fontFamily: "Lato-SemiBold",
    color: "#0097DB",
    marginTop: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: 5,
    fontSize: 14,
    fontFamily: "Lato-Regular",
    marginTop: 5,
  },
  phoneUnderline: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "gray",
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
  changeButton: {
    marginLeft: 10,
  },
  changeText: {
    color: "#0095D9",
    fontSize: 12,
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
  resendContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  countdownText: {
    fontSize: 12,
    color: "gray",
    fontFamily: "Lato-Regular",
  },
  resendText: {
    fontSize: 12,
    color: "#0095D9",
    fontFamily: "Lato-SemiBold",
    marginTop: 5,
  },
  resendTextDisabled: {
    color: "#CCCCCC",
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#0097DB",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Lato-SemiBold",
  },
});

export default CreateAccount;