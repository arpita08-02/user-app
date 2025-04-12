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
import AsyncStorage from "@react-native-async-storage/async-storage";

// Updated BASE_URL to use https
const BASE_URL = "https://avijo-571935621051.asia-south2.run.app";

const SignupScreen = ({ route, navigation }) => {
  const { mobileNumber, otp: initialOtp } = route.params;
  const [otp, setOtp] = useState(initialOtp ? initialOtp.split('') : ["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  
  const otpInputs = Array(6).fill().map(() => useRef(null));

  useEffect(() => {
    if (initialOtp) {
      console.log("\n=== Initial OTP Information ===");
      console.log("🔐 Initial OTP received:", initialOtp);
      console.log("📱 Phone Number:", mobileNumber);
      console.log("⏰ Time:", new Date().toLocaleTimeString());
      setOtp(initialOtp.split(""));
    }
    otpInputs[0].current?.focus();
  }, [initialOtp]);

  const makeApiRequest = async (url, method, body) => {
    try {
      console.log(`Making ${method} request to:`, url);
      console.log('Request body:', body);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const textResponse = await response.text();
      console.log('Raw response:', textResponse);

      let data;
      try {
        data = JSON.parse(textResponse);
        // Log OTP if it exists in the response
        if (data.otp) {
          console.log('🔐 OTP received:', data.otp);
          console.log('📱 Phone Number:', body.mobileNumber);
          console.log('⏰ Time:', new Date().toLocaleTimeString());
        }
      } catch (error) {
        console.error('Failed to parse response:', error);
        throw new Error('Server returned invalid data');
      }

      return { response, data };
    } catch (error) {
      console.error('API request failed:', error);
      if (error.message.includes('Network request failed')) {
        throw new Error('Unable to connect to server. Please check your internet connection.');
      }
      throw error;
    }
  };

  const verifyOTP = async (otpToVerify) => {
    console.log("=== OTP Verification Process ===");
    console.log("📱 Phone Number:", mobileNumber);
    console.log("🔑 OTP Entered:", otpToVerify);
    console.log("🔑 Expected OTP:", route.params.otp);
    
    if (otpToVerify.length !== 6 || isNaN(otpToVerify)) {
      console.log("❌ Invalid OTP format:", otpToVerify);
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
      return false;
    }

    try {
      setLoading(true);
      console.log("🔄 Verifying OTP...");
      
      // For demo, compare with the OTP passed in route params
      if (otpToVerify === route.params.otp) {
        console.log("✅ OTP Verification successful!");
        
        // Store demo user data
        const demoUserData = {
          fullName: "Demo User",
          email: "demo@example.com",
          mobileNumber: mobileNumber
        };
        
        await AsyncStorage.setItem('userData', JSON.stringify(demoUserData));
        console.log("💾 Demo user data stored in AsyncStorage");

        const isNewUser = route.params?.isNewUser;
        console.log("👤 User status:", isNewUser ? "New User" : "Existing User");

        if (isNewUser) {
          console.log("🔄 Navigation: SignupScreen -> CreateAccountScreen");
          navigation.replace("CreateAccountScreen", { 
            mobileNumber,
            otp: otpToVerify
          });
        } else {
          console.log("🔄 Navigation: SignupScreen -> HomeScreen");
          navigation.replace("HomeScreen", {
            userData: demoUserData
          });
        }
        return true;
      } else {
        console.log("❌ OTP verification failed - OTP mismatch");
        Alert.alert("Invalid OTP", "Please enter the correct OTP");
        return false;
      }
    } catch (error) {
      console.error("❌ Verification error:", error.message);
      Alert.alert("Error", error.message || "OTP verification failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      console.log("\n=== Resend OTP Process ===");
      console.log("📱 Phone Number:", mobileNumber);
      
      // Generate new demo OTP
      const newOTP = String(Math.floor(100000 + Math.random() * 900000));
      console.log("🔐 New Demo OTP:", newOTP);
      
      Alert.alert("Success", "OTP has been resent successfully");
      setCountdown(30);
      setOtp(["", "", "", "", "", ""]);
      otpInputs[0].current?.focus();
      
      // Update route params with new OTP
      route.params.otp = newOTP;
      
    } catch (error) {
      console.error("❌ Resend error:", error);
      Alert.alert("Error", error.message || "Failed to resend OTP. Please try again.");
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
    console.log("OTP changed:", newOtp.join(""));

    // Handle paste operation
    if (value.length === 6) {
      const otpArray = value.split('').slice(0, 6);
      console.log("Pasted OTP:", otpArray.join(""));
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
      const fullOtp = [...newOtp.slice(0, 5), value].join("");
      console.log("Auto-verifying OTP:", fullOtp);
      verifyOTP(fullOtp);
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
            maxLength={index === 0 ? 6 : 1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleOtpChange(index, value)}
            onKeyPress={(e) => handleKeyPress(index, e)}
            autoFocus={index === 0}
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
            style={styles.resendButton}
          >
            {resendLoading ? (
              <ActivityIndicator color="#0095D9" />
            ) : (
              <Text style={styles.resendText}>Resend OTP</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size={"large"} color="#0095D9" />
        ) : (
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => verifyOTP(otp.join(""))}
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
    paddingTop: 40,
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
  resendContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  countdownText: {
    fontSize: 12,
    color: "gray",
    fontFamily: "Lato-Regular",
  },
  resendButton: {
    marginTop: 15,
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
    color: "#0095D9",
    fontFamily: "Lato-SemiBold",
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
    fontFamily: "Lato-SemiBold",
  }
});

export default SignupScreen;