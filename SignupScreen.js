
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





























import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInput
} from "react-native";

const BASE_URL = "https://avijobackend-production.up.railway.app";

const SignupScreen = ({ route, navigation }) => {
  const { mobileNumber } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const handleVerifyOTP = async () => {
    const enteredOtp = otp.join(""); // Join OTP digits
    if (enteredOtp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/user/verifyLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber, otp: enteredOtp }),
      });

      const data = await response.json();
      console.log("Verification Response:", data);

      if (response.ok) {
        navigation.navigate("HomeScreen");
      } else {
        Alert.alert("Error", data.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Error", "OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login & Signin</Text>
      <Text style={styles.text}>
        Sign up or Sign in to access your 
      </Text>
      <Text style={styles.text2}>orders, special offers, health tips, and more!</Text>

      {/* Phone Number Section */}
      <View style={styles.phoneContainer}>
        <Text style={styles.phoneText}>PHONE NUMBER</Text>
        <View style={styles.phoneUnderline}>
          <Text style={styles.countryCode}>+91</Text>
          <Text style={styles.phoneNumber}>{mobileNumber}</Text>
        </View>
      </View>

      {/* OTP Section */}
      <Text style={styles.otpHeading}>VERIFYING NUMBER</Text>
      <Text style={styles.otpText}>
        We have sent a 6-digit OTP to <Text style={{ color: "black" }}>+91 {mobileNumber}</Text>
      </Text>

      {/* OTP Input Boxes */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpBox}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleOtpChange(index, value)}
          />
        ))}
      </View>

      {/* Countdown Timer */}
      <Text style={styles.countdownText}>Waiting for OTP... {countdown} Sec</Text>

      {/* Verify Button */}
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size={"large"} color="#0095D9" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24, // Align everything 24px from the left
    justifyContent: "center",
  },
  heading: {
    color: "#0095D9",
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: 'Gilroy-Bold'
  },
  text: {
    color: "gray",
    marginTop: 10,
    marginBottom: 0,
    fontSize: 14,
  },
  text2: {
    color: "gray",
    marginTop: 2,
    marginBottom: 5,
    fontSize: 14,
  },
  phoneContainer: {
    marginTop: 20,
  },
  phoneText: {
    fontSize: 12,
    fontWeight: "600",
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
    fontWeight: "bold",
    color: "black",
    marginRight: 10,
  },
  phoneNumber: {
    fontSize: 14,
    color: "black",
  },
  otpHeading: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 30,
  },
  otpText: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
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
  },
  countdownText: {
    fontSize: 12,
    color: "gray",
    marginTop: 15,
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
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SignupScreen;

