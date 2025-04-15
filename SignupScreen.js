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
    alignSelf:"flex-start"
  },
  resendButton: {
    marginTop: 15,
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
    color: "#0095D9",
    fontFamily: "Lato-SemiBold",
    alignSelf: 'flex-start',
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