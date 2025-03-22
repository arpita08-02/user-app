// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const CreateAccountScreen = ({ route }) => {
//   const { phoneNumber } = route.params || {};
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState(36);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleVerifyOTP = () => {
//     if (otp.join('').length !== 6) {
//       Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
//       return;
//     }
//     Alert.alert('Verification Successful', 'You have successfully verified your OTP.', [
//       { text: 'OK', onPress: () => navigation.navigate('HomeScreen') }
//     ]);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Create Account</Text>
      
//       <Text style={styles.label}>FULL NAME</Text>
//       <TextInput style={styles.inputBox} placeholder="Enter your Full Name" />
      
//       <Text style={styles.label}>EMAIL ID</Text>
//       <TextInput style={styles.inputBox} placeholder="Enter your Email Id" keyboardType="email-address" />
      
//       <Text style={styles.label}>DATE OF BIRTH</Text>
//       <TextInput style={styles.inputBox} placeholder="Enter your Date of Birth" />
      
//       <Text style={styles.verifyText}>VERIFYING NUMBER</Text>
//       <Text style={styles.otpInfo}>We have sent a 6-digit OTP on {phoneNumber || 'your number'}</Text>
      
//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             style={styles.otpBox}
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
      
//       <Text style={styles.timerText}>Waiting for OTP... {timer} Sec</Text>
      
//       <TouchableOpacity
//         onPress={handleVerifyOTP}
//         style={styles.verifyButton}
//         disabled={timer > 0}
//       >
//         <Text style={styles.verifyButtonText}>Verify</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = {
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     alignSelf: 'flex-start',
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'blue',
//     alignSelf: 'flex-start',
//     marginBottom: 5,
//   },
//   inputBox: {
//     width: '100%',
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingLeft: 10,
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   verifyText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     alignSelf: 'flex-start',
//   },
//   otpInfo: {
//     color: 'gray',
//     marginBottom: 20,
//     alignSelf: 'flex-start',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   otpBox: {
//     width: 40,
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 10,
//     textAlign: 'center',
//     fontSize: 18,
//     marginHorizontal: 5,
//   },
//   timerText: {
//     color: 'gray',
//     marginBottom: 20,
//   },
//   verifyButton: {
//     backgroundColor: 'blue',
//     padding: 15,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//   },
//   verifyButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// };

// export default CreateAccountScreen;







// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const CreateAccountScreen = ({ route }) => {
//   const { phoneNumber } = route.params || {};
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState(36);
//   const [mobileNumber, setMobileNumber] = useState(phoneNumber || '');
//   const navigation = useNavigation();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleVerifyOTP = () => {
//     if (otp.join('').length !== 6) {
//       Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
//       return;
//     }
//     // Simulate successful OTP verification
//     Alert.alert('Verification Successful', 'You have successfully verified your OTP.', [
//       { text: 'OK', onPress: () => navigation.navigate('HomeScreen') }, // Navigate to HomeScreen
//     ]);
//   };

//   const handleSendOTP = () => {
//     if (mobileNumber.length !== 10) {
//       Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
//       return;
//     }
//     // Add your OTP sending logic here
//     Alert.alert('OTP Sent', 'A 6-digit OTP has been sent to your mobile number.');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Create Account</Text>

//       <Text style={styles.label}>FULL NAME</Text>
//       <TextInput style={styles.inputBox} placeholder="Enter your Full Name" />

//       <Text style={styles.label}>EMAIL ID</Text>
//       <TextInput style={styles.inputBox} placeholder="Enter your Email Id" keyboardType="email-address" />

//       <Text style={styles.label}>MOBILE NUMBER</Text>
//       <View style={styles.mobileNumberContainer}>
//         <TextInput
//           style={[styles.inputBox, { flex: 1, marginRight: 10 }]}
//           placeholder="Enter your Mobile Number"
//           keyboardType="numeric"
//           maxLength={10}
//           value={mobileNumber}
//           onChangeText={setMobileNumber}
//         />
//         <TouchableOpacity style={styles.sendOtpButton} onPress={handleSendOTP}>
//           <Text style={styles.sendOtpButtonText}>Send OTP</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.verifyText}>VERIFYING NUMBER</Text>
//       <Text style={styles.otpInfo}>We have sent a 6-digit OTP on {mobileNumber || 'your number'}</Text>

//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             style={styles.otpBox}
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

//       <Text style={styles.timerText}>Waiting for OTP... {timer} Sec</Text>

//       <TouchableOpacity
//         onPress={handleVerifyOTP}
//         style={styles.verifyButton}
//         disabled={timer > 0}
//       >
//         <Text style={styles.verifyButtonText}>Verify</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     alignSelf: 'flex-start',
//     color: '#333',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#555',
//     alignSelf: 'flex-start',
//     marginBottom: 5,
//   },
//   inputBox: {
//     width: '100%',
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingLeft: 15,
//     fontSize: 16,
//     marginBottom: 15,
//     backgroundColor: '#f9f9f9',
//   },
//   mobileNumberContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   sendOtpButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   sendOtpButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   verifyText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     alignSelf: 'flex-start',
//     color: '#333',
//   },
//   otpInfo: {
//     color: '#666',
//     marginBottom: 20,
//     alignSelf: 'flex-start',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     justifyContent: 'space-between',
//   },
//   otpBox: {
//     width: 50,
//     height: 60,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 10,
//     textAlign: 'center',
//     fontSize: 18,
//     backgroundColor: '#f9f9f9',
//   },
//   timerText: {
//     color: '#666',
//     marginBottom: 20,
//     alignSelf: 'center',
//   },
//   verifyButton: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//   },
//   verifyButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default CreateAccountScreen;





















// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";

// const BASE_URL = "https://avijobackend-production.up.railway.app";

// const CreateAccount = ({ route, navigation }) => {
//   const { mobileNumber } = route.params;
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [dateOfBirth, setDob] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);

//   const handleSendOTP = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ mobileNumber, fullName, email, dateOfBirth }),
//       });

//       const data = await response.json();
//       console.log("OTP Response:", data); // Log the OTP response

//       if (response.ok) {
//         Alert.alert("OTP Sent", "Check the API response for the OTP.");
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

//   const handleVerifyOTP = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/verify`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ mobileNumber, fullName, email, dateOfBirth, otp }),
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
//       <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Create Account</Text>
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
//         placeholder="Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//       />
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
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />
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
//         placeholder="Date of Birth (YYYY-MM-DD)"
//         value={dateOfBirth}
//         onChangeText={setDob}
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

// export default CreateAccount;




















// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";

// const BASE_URL = "https://avijobackend-production.up.railway.app";

// const CreateAccount = ({ navigation }) => {
//   const [mobileNumber, setMobileNumber] = useState(""); // State for mobile number input
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);

//   const handleSendOTP = async () => {
//     if (mobileNumber.length !== 10) {
//       Alert.alert("Invalid Number", "Please enter a valid 10-digit phone number.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Call the registration API
//       const response = await fetch(`${BASE_URL}/user/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ mobileNumber, fullName, email }), // Include mobileNumber in the payload
//       });

//       const data = await response.json();
//       console.log("OTP Response:", data); // Log the OTP response

//       if (response.ok) {
//         Alert.alert("OTP Sent", "Check the API response for the OTP.");
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

//   const handleVerifyOTP = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Call the OTP verification API
//       const response = await fetch(`${BASE_URL}/user/verify`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ mobileNumber, fullName, email, otp }), // Include mobileNumber in the payload
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
//       <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Create Account</Text>

//       {/* Mobile Number Input */}
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
//         placeholder="Mobile Number"
//         keyboardType="numeric"
//         maxLength={10}
//         value={mobileNumber}
//         onChangeText={setMobileNumber}
//       />

//       {/* Full Name Input */}
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
//         placeholder="Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//       />

//       {/* Email Input */}
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
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />

//       {/* Send OTP Button */}
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
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="white" />
//         ) : (
//           <Text style={{ color: "white", fontSize: 18 }}>Send OTP</Text>
//         )}
//       </TouchableOpacity>

//       {/* OTP Input */}
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

//       {/* Countdown Timer */}
//       <Text style={{ color: "gray", marginBottom: 20 }}>Waiting for OTP... {countdown} Sec</Text>

//       {/* Verify OTP Button */}
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
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="white" />
//         ) : (
//           <Text style={{ color: "white", fontSize: 18 }}>Verify</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CreateAccount;














// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";

// const BASE_URL = "https://avijobackend-production.up.railway.app";

// const CreateAccount = ({ navigation }) => {
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);

//   const handleSendOTP = async () => {
//     if (mobileNumber.length !== 10) {
//       Alert.alert("Invalid Number", "Please enter a valid 10-digit phone number.");
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber, fullName, email }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         Alert.alert("OTP Sent", "Check the API response for the OTP.");
//       } else {
//         Alert.alert("Error", data.message || "Failed to send OTP.");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to send OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/verify`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber, fullName, email, otp: enteredOtp }),
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

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
//       return () => clearInterval(timer);
//     }
//   }, [countdown]);

//   return (
//     <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
//       <Text style={{ fontSize: 28, fontWeight: "bold", color: "#008CDB", marginBottom: 20 }}>Create Account</Text>

//       <Text style={{ color: "#008CDB", fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>FULL NAME</Text>
//       <TextInput style={styles.input} placeholder="Enter your Full Name" value={fullName} onChangeText={setFullName} />

//       <Text style={{ color: "#008CDB", fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>EMAIL ID</Text>
//       <TextInput style={styles.input} placeholder="Enter your Email Id" value={email} onChangeText={setEmail} keyboardType="email-address" />

//       <Text style={{ color: "#008CDB", fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>MOBILE NUMBER</Text>
//       <View style={{ flexDirection: "row", alignItems: "center" }}>
//         <TextInput
//           style={[styles.input, { flex: 1 }]}
//           placeholder="Enter Mobile Number"
//           keyboardType="numeric"
//           maxLength={10}
//           value={mobileNumber}
//           onChangeText={setMobileNumber}
//         />
//         <TouchableOpacity onPress={handleSendOTP} style={styles.sendOtpButton} disabled={loading}>
//           <Text style={{ color: "white", fontWeight: "bold" }}>Send OTP</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={{ color: "black", fontSize: 14, fontWeight: "bold", marginTop: 20 }}>VERIFYING NUMBER</Text>
//       <Text style={{ color: "gray", marginBottom: 10 }}>We have sent a 6-digit OTP to +91-{mobileNumber}</Text>

//       <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             style={styles.otpInput}
//             keyboardType="numeric"
//             maxLength={1}
//             value={digit}
//             onChangeText={(text) => {
//               const newOtp = [...otp];
//               newOtp[index] = text;
//               setOtp(newOtp);
//             }}
//           />
//         ))}
//       </View>

//       <Text style={{ color: "gray", marginBottom: 20 }}>Waiting for OTP... {countdown} Sec</Text>

//       <TouchableOpacity onPress={handleVerifyOTP} style={styles.verifyButton} disabled={loading}>
//         {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: "white", fontSize: 18 }}>Verify</Text>}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = {
//   input: {
//     width: "100%",
//     height: 50,
//     borderBottomWidth: 1,
//     borderColor: "gray",
//     fontSize: 16,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   sendOtpButton: {
//     backgroundColor: "#008CDB",
//     padding: 12,
//     borderRadius: 8,
//     marginLeft: 10,
//   },
//   verifyButton: {
//     backgroundColor: "#008CDB",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   otpInput: {
//     width: 40,
//     height: 50,
//     borderBottomWidth: 1,
//     borderColor: "gray",
//     fontSize: 20,
//     textAlign: "center",
//   },
// };

// export default CreateAccount;













// import React, { useState, useEffect } from "react";
// import { 
//   View, Text, TextInput, TouchableOpacity, 
//   Alert, ActivityIndicator 
// } from "react-native";

// const BASE_URL = "https://avijobackend-production.up.railway.app"; // ✅ Set your backend URL

// const CreateAccount = ({ navigation }) => {
//   const [mobileNumber, setMobileNumber] = useState(""); 
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);
//   const [otpSent, setOtpSent] = useState(false); // ✅ Track if OTP was sent

//   // ✅ Handle OTP Sending
//   const handleSendOTP = async () => {
//     if (!/^\d{10}$/.test(mobileNumber)) {
//       Alert.alert("Invalid Number", "Enter a valid 10-digit phone number.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(`${BASE_URL}/user/register`, { 
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber, fullName, email }), 
//       });

//       const data = await response.json();
//       console.log("OTP Response:", data);

//       if (response.ok) {
//         setOtpSent(true);  // ✅ OTP Sent Successfully
//         setCountdown(60);  // ✅ Restart countdown
//         Alert.alert("OTP Sent", "Please check your phone for the OTP.");
//       } else {
//         Alert.alert("Error", data?.message || "Failed to send OTP.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       Alert.alert("Error", "Failed to send OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle OTP Verification
//   const handleVerifyOTP = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(`${BASE_URL}/user/verify`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber, fullName, email, otp }),
//       });

//       const data = await response.json();
//       console.log("Verification Response:", data);

//       if (response.ok) {
//         Alert.alert("Success", "OTP Verified Successfully!");
//         navigation.navigate("HomeScreen"); // ✅ Navigate after success
//       } else {
//         Alert.alert("Error", data?.message || "OTP verification failed.");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       Alert.alert("Error", "OTP verification failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Countdown Timer Effect
//   useEffect(() => {
//     if (countdown > 0 && otpSent) {
//       const timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [countdown, otpSent]);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
//       <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Create Account</Text>

//       {/* ✅ Mobile Number Input */}
//       <TextInput
//         style={{
//           width: "100%", height: 50, borderColor: "gray", borderWidth: 1, 
//           borderRadius: 10, paddingHorizontal: 10, fontSize: 18, marginBottom: 20
//         }}
//         placeholder="Mobile Number"
//         keyboardType="numeric"
//         maxLength={10}
//         value={mobileNumber}
//         onChangeText={setMobileNumber}
//       />

//       {/* ✅ Full Name Input */}
//       <TextInput
//         style={{
//           width: "100%", height: 50, borderColor: "gray", borderWidth: 1, 
//           borderRadius: 10, paddingHorizontal: 10, fontSize: 18, marginBottom: 20
//         }}
//         placeholder="Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//       />

//       {/* ✅ Email Input */}
//       <TextInput
//         style={{
//           width: "100%", height: 50, borderColor: "gray", borderWidth: 1, 
//           borderRadius: 10, paddingHorizontal: 10, fontSize: 18, marginBottom: 20
//         }}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />

//       {/* ✅ Send OTP Button */}
//       {!otpSent && (
//         <TouchableOpacity
//           onPress={handleSendOTP}
//           style={{
//             backgroundColor: "blue", padding: 15, borderRadius: 10, 
//             width: "100%", alignItems: "center", marginBottom: 10
//           }}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="white" />
//           ) : (
//             <Text style={{ color: "white", fontSize: 18 }}>Send OTP</Text>
//           )}
//         </TouchableOpacity>
//       )}

//       {/* ✅ OTP Input */}
//       {otpSent && (
//         <>
//           <TextInput
//             style={{
//               width: "100%", height: 50, borderColor: "gray", borderWidth: 1, 
//               borderRadius: 10, paddingHorizontal: 10, fontSize: 18, marginBottom: 20
//             }}
//             placeholder="Enter OTP"
//             keyboardType="numeric"
//             maxLength={6}
//             value={otp}
//             onChangeText={setOtp}
//           />

//           {/* ✅ Countdown Timer */}
//           <Text style={{ color: "gray", marginBottom: 20 }}>
//             Waiting for OTP... {countdown} Sec
//           </Text>

//           {/* ✅ Verify OTP Button */}
//           <TouchableOpacity
//             onPress={handleVerifyOTP}
//             style={{
//               backgroundColor: "blue", padding: 15, borderRadius: 10, 
//               width: "100%", alignItems: "center", marginBottom: 20
//             }}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="white" />
//             ) : (
//               <Text style={{ color: "white", fontSize: 18 }}>Verify OTP</Text>
//             )}
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// export default CreateAccount;














// import React, { useState, useEffect } from "react";
// import { 
//   View, Text, TextInput, TouchableOpacity, 
//   Alert, ActivityIndicator, StyleSheet 
// } from "react-native";

// const BASE_URL = "https://avijobackend-production.up.railway.app"; // ✅ Set your backend URL

// const CreateAccount = ({ navigation }) => {
//   const [mobileNumber, setMobileNumber] = useState(""); 
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);
//   const [otpSent, setOtpSent] = useState(false); // ✅ Track if OTP was sent

//   // ✅ Handle OTP Sending
//   const handleSendOTP = async () => {
//     if (!/^\d{10}$/.test(mobileNumber)) {
//       Alert.alert("Invalid Number", "Enter a valid 10-digit phone number.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(`${BASE_URL}/user/register`, { 
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber, fullName, email }), 
//       });

//       const data = await response.json();
//       console.log("OTP Response:", data);

//       if (response.ok) {
//         setOtpSent(true);  // ✅ OTP Sent Successfully
//         setCountdown(60);  // ✅ Restart countdown
//         Alert.alert("OTP Sent", "Please check your phone for the OTP.");
//       } else {
//         Alert.alert("Error", data?.message || "Failed to send OTP.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       Alert.alert("Error", "Failed to send OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle OTP Verification
//   const handleVerifyOTP = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(`${BASE_URL}/user/verify`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber, fullName, email, otp }),
//       });

//       const data = await response.json();
//       console.log("Verification Response:", data);

//       if (response.ok) {
//         Alert.alert("Success", "OTP Verified Successfully!");
//         navigation.navigate("HomeScreen"); // ✅ Navigate after success
//       } else {
//         Alert.alert("Error", data?.message || "OTP verification failed.");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       Alert.alert("Error", "OTP verification failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Countdown Timer Effect
//   useEffect(() => {
//     if (countdown > 0 && otpSent) {
//       const timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [countdown, otpSent]);

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

//       {/* ✅ Date of Birth Input */}
//       <Text style={styles.label}>DATE OF BIRTH</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your Date of Birth"
//         value={dateOfBirth}
//         onChangeText={setDateOfBirth}
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
//         <TouchableOpacity
//           onPress={handleSendOTP}
//           style={styles.button}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="white" />
//           ) : (
//             <Text style={styles.buttonText}>Send OTP</Text>
//           )}
//         </TouchableOpacity>
//       )}

//       {/* ✅ OTP Input */}
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

//           {/* ✅ Countdown Timer */}
//           <Text style={styles.countdownText}>
//             Waiting for OTP... {countdown} Sec
//           </Text>

//           {/* ✅ Verify OTP Button */}
//           <TouchableOpacity
//             onPress={handleVerifyOTP}
//             style={styles.button}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="white" />
//             ) : (
//               <Text style={styles.buttonText}>Verify OTP</Text>
//             )}
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
//     padding: 20,
//     backgroundColor: "white",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color:'#1e81b0',
//     marginRight: 180
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginBottom: 5,
//     color:'#39afd3'
//   },
//   input: {
//     height: 50,
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "blue",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//   },
//   countdownText: {
//     color: "gray",
//     marginBottom: 20,
//     textAlign: "center",
//   },
// });

// export default CreateAccount;


















// import React, { useState, useEffect } from "react";
// import { 
//   View, Text, TextInput, TouchableOpacity, 
//   Alert, ActivityIndicator, StyleSheet 
// } from "react-native";

// const BASE_URL = "https://avijobackend-production.up.railway.app"; // ✅ Set your backend URL

// const CreateAccount = ({ navigation }) => {
//   const [mobileNumber, setMobileNumber] = useState(""); 
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);
//   const [otpSent, setOtpSent] = useState(false); // ✅ Track if OTP was sent

//   // ✅ Handle OTP Sending
//   const handleSendOTP = async () => {
//     if (!/^\d{10}$/.test(mobileNumber)) {
//       Alert.alert("Invalid Number", "Enter a valid 10-digit phone number.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(`${BASE_URL}/user/register`, { 
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber, fullName, email }), 
//       });

//       const data = await response.json();
//       console.log("OTP Response:", data);

//       if (response.ok) {
//         setOtpSent(true);  // ✅ OTP Sent Successfully
//         setCountdown(60);  // ✅ Restart countdown
//         Alert.alert("OTP Sent", "Please check your phone for the OTP.");
//       } else {
//         Alert.alert("Error", data?.message || "Failed to send OTP.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       Alert.alert("Error", "Failed to send OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle OTP Verification
//   const handleVerifyOTP = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(`${BASE_URL}/user/verifyLogin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber, fullName, email, otp }),
//       });

//       const data = await response.json();
//       console.log("Verification Response:", data);

//       if (response.ok) {
//         Alert.alert("Success", "OTP Verified Successfully!");
//         navigation.navigate("HomeScreen"); // ✅ Navigate after success
//       } else {
//         Alert.alert("Error", data?.message || "OTP verification failed.");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       Alert.alert("Error", "OTP verification failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Countdown Timer Effect
//   useEffect(() => {
//     if (countdown > 0 && otpSent) {
//       const timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [countdown, otpSent]);

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

//       {/* ✅ Date of Birth Input */}
//       <Text style={styles.label}>DATE OF BIRTH</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="YYYY-MM-DD"
//         value={dateOfBirth}
//         onChangeText={setDateOfBirth}
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
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             onPress={handleSendOTP}
//             style={styles.button}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="white" />
//             ) : (
//               <Text style={styles.buttonText}>Send OTP</Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* ✅ OTP Input */}
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

//           {/* ✅ Countdown Timer */}
//           <Text style={styles.countdownText}>
//             Waiting for OTP... {countdown} Sec
//           </Text>

//           {/* ✅ Verify OTP Button */}
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               onPress={handleVerifyOTP}
//               style={styles.button}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="white" />
//               ) : (
//                 <Text style={styles.buttonText}>Verify OTP</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingLeft: 24, // Align everything 24px from the left
//     backgroundColor: "white",
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     marginBottom: 20,
//     fontFamily: "Lato", // Gilroy font
//     color: "#0095D9",
//   },
//   label: {
//     fontSize: 12,
//     fontWeight: "bold",
//     marginTop:5,
//     marginBottom: 1,
//     fontFamily: "Lato", // Gilroy font
//     color: "#0097DB",
//   },
//   input: {
//     height: 50,
//     borderBottomWidth: 1, // Single underline
//     borderBottomColor: "#D4CFD3", // Underline color
//     fontSize: 14,
//     marginBottom: 10,
//     fontFamily: "Lato", // Gilroy font
//   },
//   buttonContainer: {
//     alignItems: "center", // Center the button horizontally
//   },
//   button: {
//     backgroundColor: "#0097DB", // Updated button color
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     width: "90%", // Set button width
//     marginTop:15,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontFamily: "Gilroy-Bold", // Gilroy font
//   },
//   countdownText: {
//     color: "gray",
//     marginBottom: 20,
//     textAlign: "center",
//     fontFamily: "Gilroy-Medium", // Gilroy font
//   },
// });

// export default CreateAccount;


















// import React, { useState, useEffect } from "react";
// import { 
//   View, Text, TextInput, TouchableOpacity, 
//   Alert, ActivityIndicator, StyleSheet 
// } from "react-native";
// import DateTimePicker from '@react-native-community/datetimepicker';

// const BASE_URL = "https://avijobackend-production.up.railway.app"; // ✅ Backend URL

// const CreateAccount = ({ navigation }) => {
//   const [mobileNumber, setMobileNumber] = useState(""); 
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);
//   const [otpSent, setOtpSent] = useState(false);

//   // ✅ Handle DOB Selection
//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setDateOfBirth(selectedDate.toISOString().split('T')[0]); // Format: YYYY-MM-DD
//     }
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
//     if (!dateOfBirth) {
//       Alert.alert("Invalid DOB", "Please select your Date of Birth.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(`${BASE_URL}/user/register`, { 
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber, fullName, email, dateOfBirth }),
//       });

//       const data = await response.json();
//       console.log("OTP Response:", data);

//       if (response.ok) {
//         setOtpSent(true);  
//         setCountdown(60);  
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

//   // ✅ Handle OTP Verification
//   const handleVerifyOTP = async () => {
//     if (otp.length !== 6) {
//       Alert.alert("Invalid OTP", "Enter a valid 6-digit OTP.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(`${BASE_URL}/user/verifyOtp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber, otp }),
//       });

//       const data = await response.json();
//       console.log("Verification Response:", data);

//       if (response.ok) {
//         Alert.alert("Success", "OTP Verified Successfully!");
//         navigation.navigate("HomeScreen"); 
//       } else {
//         Alert.alert("Error", data?.message || "OTP verification failed.");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       Alert.alert("Error", "OTP verification failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Countdown Timer Effect
//   useEffect(() => {
//     if (countdown > 0 && otpSent) {
//       const timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [countdown, otpSent]);

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

//       {/* ✅ Date of Birth Picker */}
//       <Text style={styles.label}>DATE OF BIRTH</Text>
//       <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
//         <Text style={{ color: dateOfBirth ? "black" : "gray" }}>
//           {dateOfBirth || "Select Date of Birth"}
//         </Text>
//       </TouchableOpacity>
//       {showDatePicker && (
//         <DateTimePicker
//           value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
//           mode="date"
//           display="default"
//           onChange={handleDateChange}
//         />
//       )}

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

//           {/* ✅ Countdown Timer */}
//           <Text style={styles.countdownText}>Waiting for OTP... {countdown} Sec</Text>

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
//   countdownText: {
//     color: "gray",
//     textAlign: "center",
//     marginTop: 10,
//   },
// });

// export default CreateAccount;












// import React, { useState, useEffect } from "react";
// import {
//   View, Text, TextInput, TouchableOpacity,
//   Alert, ActivityIndicator, StyleSheet
// } from "react-native";

// const BASE_URL = "https://avijobackend-production.up.railway.app";

// const CreateAccount = ({ navigation }) => {
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [countdown, setCountdown] = useState(60);
//   const [otpSent, setOtpSent] = useState(false);

//   // ✅ Auto-format & validate Date of Birth (YYYY-MM-DD)
//   const formatDateOfBirth = (text) => {
//     let cleaned = text.replace(/\D/g, ""); // Remove non-numeric characters
//     if (cleaned.length > 4) cleaned = cleaned.slice(0, 4) + "-" + cleaned.slice(4);
//     if (cleaned.length > 7) cleaned = cleaned.slice(0, 7) + "-" + cleaned.slice(7, 10);
//     setDateOfBirth(cleaned);
//   };

//   // ✅ Send OTP
//   const handleSendOTP = async () => {
//     if (!fullName.trim()) return Alert.alert("Invalid Name", "Full name is required.");
//     if (!/^\S+@\S+\.\S+$/.test(email)) return Alert.alert("Invalid Email", "Enter a valid email address.");
//     if (!/^\d{10}$/.test(mobileNumber)) return Alert.alert("Invalid Number", "Enter a valid 10-digit phone number.");
//     if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) return Alert.alert("Invalid DOB", "Use format YYYY-MM-DD.");

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
//         setCountdown(60);
//         Alert.alert("OTP Sent", "Check your phone for the OTP.");
//       } else {
//         Alert.alert("Error", data?.message || "Failed to send OTP.");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to send OTP. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Verify OTP & Register User if Needed
//   const handleVerifyOTP = async () => {
//     if (otp.length !== 6) return Alert.alert("Invalid OTP", "Enter a valid 6-digit OTP.");

//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/user/verifyLogin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobileNumber, otp }),
//       });

//       const data = await response.json();
//       console.log("Verification Response:", data);

//       if (data.success) {
//         // ✅ Navigate directly if user exists
//         Alert.alert("Success", "OTP Verified Successfully!");
//         navigation.navigate("HomeScreen");
//       } else if (data.message === "User not found. Please register.") {
//         // ✅ Register user if not found
//         const registerResponse = await fetch(`${BASE_URL}/user/register`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ mobileNumber, fullName, email, dateOfBirth }),
//         });

//         const registerData = await registerResponse.json();
//         console.log("Registration Response:", registerData);

//         if (registerResponse.ok) {
//           Alert.alert("Success", "Account Created Successfully!");
//           navigation.navigate("HomeScreen");
//         } else {
//           Alert.alert("Error", registerData?.message || "Registration failed.");
//         }
//       } else {
//         Alert.alert("Error", data?.message || "OTP verification failed.");
//       }
//     } catch (error) {
//       Alert.alert("Error", "OTP verification failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ⏳ OTP Countdown Timer
//   useEffect(() => {
//     if (countdown > 0 && otpSent) {
//       const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
//       return () => clearInterval(timer);
//     }
//   }, [countdown, otpSent]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Account</Text>

//       <Text style={styles.label}>FULL NAME</Text>
//       <TextInput style={styles.input} placeholder="Enter Full Name" value={fullName} onChangeText={setFullName} />

//       <Text style={styles.label}>EMAIL ID</Text>
//       <TextInput style={styles.input} placeholder="Enter Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

//       <Text style={styles.label}>DATE OF BIRTH (YYYY-MM-DD)</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="YYYY-MM-DD"
//         value={dateOfBirth}
//         onChangeText={formatDateOfBirth}
//         keyboardType="numeric"
//         maxLength={10}
//       />

//       <Text style={styles.label}>MOBILE NUMBER</Text>
//       <TextInput style={styles.input} placeholder="Enter Mobile Number" keyboardType="numeric" maxLength={10} value={mobileNumber} onChangeText={setMobileNumber} />

//       {!otpSent && (
//         <TouchableOpacity onPress={handleSendOTP} style={styles.button} disabled={loading}>
//           {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Send OTP</Text>}
//         </TouchableOpacity>
//       )}

//       {otpSent && (
//         <>
//           <Text style={styles.label}>ENTER OTP</Text>
//           <TextInput style={styles.input} placeholder="Enter OTP" keyboardType="numeric" maxLength={6} value={otp} onChangeText={setOtp} />
//           <Text style={styles.countdownText}>Waiting for OTP... {countdown} Sec</Text>
//           <TouchableOpacity onPress={handleVerifyOTP} style={styles.button} disabled={loading}>
//             {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Verify OTP</Text>}
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// // ✅ Styles
// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
//   label: { fontSize: 16, fontWeight: "600", marginTop: 10 },
//   input: { height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 10, marginTop: 5 },
//   button: { backgroundColor: "#007BFF", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
//   countdownText: { fontSize: 14, color: "#FF0000", textAlign: "center", marginTop: 10 },
// });

// export default CreateAccount;














// import React, { useState } from "react";
// import {
//   View, Text, TextInput, TouchableOpacity,
//   Alert, ActivityIndicator, StyleSheet
// } from "react-native";

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
//           <TouchableOpacity onPress={() => Alert.alert("OTP Verified!")} style={styles.button} disabled={loading}>
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






import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, ActivityIndicator, StyleSheet
} from "react-native";

const BASE_URL = "https://avijobackend-production.up.railway.app";

const CreateAccount = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // ✅ Function to format Date of Birth as YYYY-MM-DD
  const formatDateOfBirth = (text) => {
    let cleaned = text.replace(/\D/g, ""); // Remove non-numeric characters

    if (cleaned.length > 4) cleaned = cleaned.slice(0, 4) + "-" + cleaned.slice(4);
    if (cleaned.length > 7) cleaned = cleaned.slice(0, 7) + "-" + cleaned.slice(7, 10);

    setDateOfBirth(cleaned);
  };

  // ✅ Handle OTP Sending
  const handleSendOTP = async () => {
    if (!fullName.trim()) {
      Alert.alert("Invalid Name", "Full name is required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert("Invalid Email", "Enter a valid email address.");
      return;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      Alert.alert("Invalid Number", "Enter a valid 10-digit phone number.");
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
      Alert.alert("Invalid DOB", "Enter Date of Birth in YYYY-MM-DD format.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/user/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber }),
      });

      const data = await response.json();
      console.log("OTP Response:", data);

      if (response.ok) {
        setOtpSent(true);
        Alert.alert("OTP Sent", "Check your phone for the OTP.");
      } else {
        Alert.alert("Error", data?.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      Alert.alert("Error", "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle User Registration
  const handleRegisterUser = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Prepare the payload for registration
      const payload = {
        mobileNumber: mobileNumber,
        otp: otp,
        fullName: fullName,
        email: email,
        dateOfBirth: dateOfBirth,
      };

      // ✅ Log the payload for debugging
      console.log("Payload for Registration:", payload);

      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // Send the payload
      });

      const data = await response.json();
      console.log("Registration Response:", data);

      if (response.ok) {
        Alert.alert("Success", "Account Created Successfully!");
        navigation.navigate("HomeScreen"); // Navigate to HomeScreen
      } else {
        Alert.alert("Error", data?.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      Alert.alert("Error", "Failed to register. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* ✅ Full Name Input */}
      <Text style={styles.label}>FULL NAME</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      {/* ✅ Email Input */}
      <Text style={styles.label}>EMAIL ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Email Id"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* ✅ Date of Birth Input (Formatted YYYY-MM-DD) */}
      <Text style={styles.label}>DATE OF BIRTH</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={dateOfBirth}
        onChangeText={formatDateOfBirth}
        keyboardType="numeric"
        maxLength={10}
      />

      {/* ✅ Mobile Number Input */}
      <Text style={styles.label}>MOBILE NUMBER</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Mobile Number"
        keyboardType="numeric"
        maxLength={10}
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />

      {/* ✅ Send OTP Button */}
      {!otpSent && (
        <TouchableOpacity onPress={handleSendOTP} style={styles.button} disabled={loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Send OTP</Text>}
        </TouchableOpacity>
      )}

      {/* ✅ OTP Input & Registration */}
      {otpSent && (
        <>
          <Text style={styles.label}>ENTER OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="numeric"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />

          {/* ✅ Register Button */}
          <TouchableOpacity onPress={handleRegisterUser} style={styles.button} disabled={loading}>
            {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Register</Text>}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0095D9",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#0097DB",
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#D4CFD3",
    fontSize: 14,
    marginBottom: 10,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#0097DB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateAccount;