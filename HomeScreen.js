import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const BASE_URL = "https://avijo-571935621051.asia-south2.run.app";

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function HomeScreen({ navigation, route }) {
  const [locationName, setLocationName] = useState("Detecting location...");
  const [isDeliverable, setIsDeliverable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userFullName, setUserFullName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  const serviceAreaCenter = { latitude: 23.2599, longitude: 77.4126 };
  const serviceRadius = 20;

  // useEffect(() => {
  //   const loadUserData = async () => {
  //     try {
  //       // First try to get from AsyncStorage
  //       const cachedName = await AsyncStorage.getItem('userFullName');
  //       const cachedNumber = await AsyncStorage.getItem('userMobileNumber');
        
  //       if (cachedName) setUserFullName(cachedName);
  //       if (cachedNumber) setUserPhoneNumber(cachedNumber);

  //       // Then try to fetch fresh data from API
  //       const response = await fetch(${BASE_URL}/user/get-user, {
  //         method: "GET",
  //         credentials: "include",
  //         headers: { 
  //           "Content-Type": "application/json",
  //           "Accept": "application/json"
  //         },
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setUserFullName(data.fullName || "");
  //         setUserPhoneNumber(data.mobileNumber || "");
          
  //         // Update AsyncStorage with fresh data
  //         await AsyncStorage.setItem('userFullName', data.fullName || "");
  //         await AsyncStorage.setItem('userMobileNumber', data.mobileNumber || "");
  //       }
  //     } catch (error) {
  //       console.error('Error loading user data:', error);
  //     }
  //   };
    
  //   loadUserData();
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/get-user`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log("Full API response:", result); // Debug log
    
        // Extract data from the nested response
        if (result.success && result.data) {
          const userData = result.data;
          setUserFullName(userData.fullName || "");
          setUserPhoneNumber(userData.mobileNumber?.toString() || ""); // Convert number to string
          
          await AsyncStorage.setItem('userFullName', userData.fullName || "");
          await AsyncStorage.setItem('userMobileNumber', userData.mobileNumber?.toString() || "");
        } else {
          console.warn("Unexpected response structure:", result);
          // Fallback to cached data
          const cachedName = await AsyncStorage.getItem('userFullName');
          const cachedNumber = await AsyncStorage.getItem('userMobileNumber');
          if (cachedName) setUserFullName(cachedName);
          if (cachedNumber) setUserPhoneNumber(cachedNumber);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Error handling remains the same
      }
    };
    
    loadUserData();


    if (!route.params?.selectedLocation) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Location permission is required.");
          setLoading(false);
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        checkServiceAvailability(location.coords);
      })();
    }
  }, []);

  useEffect(() => {
    if (route.params?.selectedLocation) {
      checkServiceAvailability(route.params.selectedLocation);
    }
  }, [route.params?.selectedLocation]);

  const checkServiceAvailability = async (coords) => {
    const { latitude, longitude } = coords;
    let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (geocode.length > 0) {
      const { city, region, country, name, street } = geocode[0];
      setLocationName(`${name || street}, ${city || region}, ${country}`);
      const distance = haversineDistance(
        latitude,
        longitude,
        serviceAreaCenter.latitude,
        serviceAreaCenter.longitude
      );
      setIsDeliverable(distance <= serviceRadius);
    }
    setLoading(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) setProfileImage(result.assets[0].uri);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      await AsyncStorage.clear();
      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons name="person-circle" size={40} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={20} color="#000" />
          <Text 
            style={styles.locationText} 
            numberOfLines={1} 
            ellipsizeMode="tail"
          >
            {locationName}
          </Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
      ) : isDeliverable ? (
        <View style={styles.messageContainer}>
          <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
          <Text style={styles.serviceText}>Service available in your area!</Text>
        </View>
      ) : (
        <View style={styles.messageContainer}>
          <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
          <Text style={styles.title}>Location not serviceable</Text>
          <Text style={styles.subtitle}>Our team is working tirelessly to bring 10</Text>
          <Text style={styles.subtitle}>minutes healthcare delivery at your doorstep.</Text>
          <TouchableOpacity
            style={styles.changeLocationButton}
            onPress={() => navigation.navigate("LocationScreen")}
          >
            <Text style={styles.changeLocationButtonText}>Try Changing Location</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={drawerVisible} animationType="slide" transparent>
        <View style={styles.drawer}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setDrawerVisible(false)}
          >
            <Ionicons name="close" size={30} color="#000" />
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={pickImage}>
            <Image
              source={profileImage ? { uri: profileImage } : require("./assets/Profile.png")}
              style={styles.profilePic}
            />
          </TouchableOpacity>
          
          {userFullName ? (
            <Text style={styles.Avijo}>{userFullName}</Text>
          ) : null}
          <Text style={styles.phoneText}>{userPhoneNumber}</Text> */}
          <View style={styles.userInfoContainer}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={profileImage ? { uri: profileImage } : require("./assets/Profile.png")}
                style={styles.profilePic}
              />
            </TouchableOpacity>
            
            {userFullName ? (
              <Text style={styles.userName}>{userFullName}</Text>
            ) : (
              <ActivityIndicator size="small" color="#0095D9" />
            )}
            
            {userPhoneNumber ? (
              <Text style={styles.phoneText}>{userPhoneNumber}</Text>
            ) : (
              <ActivityIndicator size="small" color="#0095D9" />
            )}
          </View>

          <TouchableOpacity style={styles.drawerItem}>
            <Image source={require("./assets/abha.png")} style={styles.drawerIcon} />
            <Text style={styles.drawerItemText}>Abha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
            <Image source={require("./assets/order.png")} style={styles.drawerIcon} />
            <Text style={styles.drawerItemText}>Order & Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
            <Image source={require("./assets/address.png")} style={styles.drawerIcon} />
            <Text style={styles.drawerItemText}>Addresses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
            <Image source={require("./assets/reminder.png")} style={styles.drawerIcon} />
            <Text style={styles.drawerItemText}>Reminder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
            <Image source={require("./assets/ambulance1.png")} style={styles.drawerIcon} />
            <Text style={styles.drawerItemText}>Ambulance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem}>
            <Image source={require("./assets/help.png")} style={styles.drawerIcon} />
            <Text style={styles.drawerItemText}>Help & Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
            <Image source={require("./assets/logout.png")} style={styles.drawerIcon} />
            <Text style={styles.drawerItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", padding: 15 },
  locationContainer: { 
    flexDirection: "row", 
    marginLeft: 10,
    maxWidth: '60%',
    alignItems: 'center'
  },
  locationText: { 
    fontSize: 16, 
    fontWeight: "bold", 
    fontFamily: "Gilroy-Medium",
    flexShrink: 1
  },
  messageContainer: { alignItems: "center", padding: 20 },
  serviceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "Gilroy-Bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    fontFamily: "Gilroy-Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontFamily: "Gilroy-Medium",
  },
  locationIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  changeLocationButton: {
    backgroundColor: "#0097DB",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  changeLocationButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Gilroy-Bold",
  },
  drawer: {
    position: "absolute",
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    height: "100%",
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginTop: 20,
    alignSelf: 'center'
  },
  Avijo: {
    fontFamily: "Lato-Bold",
    fontSize: 24,
    marginTop: 10,
    textAlign: 'center'
  },
  phoneText: {
    fontSize: 16,
    fontFamily: "Gilroy-Medium",
    marginBottom: 20,
    textAlign: 'center'
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginLeft: 5,
    marginBottom: 5,
  },
  drawerIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  drawerItemText: {
    fontSize: 20,
    fontFamily: "Lato",
  },
  userName: {
        fontSize: 20,
        fontFamily: "Lato",
        marginTop: 5,
      },
      phoneText: {
        fontSize: 16,
        fontFamily: "Gilroy-Medium",
        marginBottom: 20,
      },
        profilePic: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginTop: 20,
  },
});