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
  const [otp, setOtp] = useState(initialOtp ? initialOtp.toString().split("") : ["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  
  const otpInputs = Array(6).fill().map(() => useRef(null));

  useEffect(() => {
    console.log('Initial OTP received:', initialOtp);
    if (initialOtp) {
      setOtp(initialOtp.toString().split(""));
    }
    otpInputs[0].current?.focus();
  }, [initialOtp]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

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

  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      console.log('Resending OTP to:', mobileNumber);
      
      const response = await fetch(`${BASE_URL}/user/send-otp`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          mobileNumber,
          isNewUser: true 
        }),
      });

      const data = await response.json();
      console.log('Resend OTP Response:', JSON.stringify(data, null, 2));

      if (!response.ok) {
        throw new Error(data?.message || "Failed to resend OTP");
      }

      Alert.alert("Success", `OTP has been resent (DEV: ${data.otp})`);
      console.log('New OTP:', data.otp);
      setCountdown(30);
      setOtp(data.otp ? data.otp.toString().split("") : ["", "", "", "", "", ""]);
      otpInputs[0].current?.focus();

    } catch (error) {
      console.error("Resend OTP Error:", error);
      Alert.alert("Error", error.message || "Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleRegisterUser = async (otpToVerify) => {
    if (!validateInputs()) return;

    if (otpToVerify.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      console.log('Registering user with:', { mobileNumber, otp: otpToVerify });
      
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
      console.log('Registration Response:', JSON.stringify(data, null, 2));

      if (response.ok) {
        await AsyncStorage.multiSet([
          ['userFullName', fullName],
          ['userMobileNumber', mobileNumber],
          ['userEmail', email || '']
        ]);
        
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        });
      } else {
        throw new Error(data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      Alert.alert("Registration Failed", error.message);
    } finally {
      setLoading(false);
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

      <Text style={styles.label}>EMAIL ID </Text>
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