// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
// import * as Location from 'expo-location';
// import { useNavigation } from '@react-navigation/native';

// const HomeScreen = () => {
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   const fetchLocation = async () => {
//     setLoading(true);
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'Location permission is required to continue.');
//       setLoading(false);
//       return;
//     }

//     try {
//       let locationData = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = locationData.coords;

//       // Reverse Geocoding to get Address
//       let address = await Location.reverseGeocodeAsync({ latitude, longitude });

//       if (address.length > 0) {
//         let formattedAddress = `${address[0].city}, ${address[0].region}`;
//         setLocation(formattedAddress);
//       } else {
//         setLocation('Unknown Location');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch location. Try again.');
//       setLocation('Error fetching location');
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchLocation();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Current Location:</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={styles.loader} />
//       ) : (
//         <Text style={styles.locationText}>{location || 'Location not available'}</Text>
//       )}

//       <TouchableOpacity onPress={() => navigation.navigate('MapScreen')} style={styles.button}>
//         <Text style={styles.buttonText}>Change Location</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={fetchLocation} style={styles.retryButton}>
//         <Text style={styles.retryText}>Retry Location</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   title: { fontSize: 20, fontWeight: 'bold' },
//   loader: { marginVertical: 10 },
//   locationText: { fontSize: 18, marginVertical: 10 },
//   button: {
//     backgroundColor: 'blue',
//     padding: 15,
//     borderRadius: 10,
//     width: '80%',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   buttonText: { color: 'white', fontSize: 18 },
//   retryButton: {
//     backgroundColor: 'gray',
//     padding: 12,
//     borderRadius: 10,
//     width: '80%',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   retryText: { color: 'white', fontSize: 16 },
// });

// export default HomeScreen;

// import React, { useEffect, useState } from "react";
// import {
//   View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import * as Location from 'expo-location';

// // Function to calculate distance using Haversine formula
// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degrees) => degrees * (Math.PI / 180);
//   const R = 6371; // Radius of the Earth in kilometers

//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) *
//     Math.cos(toRadians(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = R * c; // Distance in kilometers
//   return distance;
// };

// export default function HomeScreen({ navigation }) {
//   const [locationName, setLocationName] = useState("Detecting location...");
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [isDeliverable, setIsDeliverable] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Define the service area (center and radius)
//   const serviceAreaCenter = { latitude: 23.2599, longitude: 77.4126 }; // Example: Bhopal, India
//   const serviceRadius = 20; // Service available within 20 kilometers

//   // Function to check service availability
//   const checkServiceAvailability = async (coords) => {
//     const { latitude, longitude } = coords;

//     // Reverse geocode to get the address
//     let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//     if (geocode.length > 0) {
//       const { city, region, country, name, street } = geocode[0];
//       const displayName = `${name || street}, ${city || region}, ${country}`;
//       setLocationName(displayName);

//       // Calculate distance from the service area center
//       const distance = haversineDistance(
//         latitude,
//         longitude,
//         serviceAreaCenter.latitude,
//         serviceAreaCenter.longitude
//       );

//       // Check if the user is within the service radius
//       if (distance <= serviceRadius) {
//         setIsDeliverable(true); // Service is available
//       } else {
//         setIsDeliverable(false); // Service is not available
//       }
//     }
//     setLoading(false);
//   };

//   // Get the user's current location on component mount
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         setLoading(false);
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setUserLocation(location.coords);
//       checkServiceAvailability(location.coords);
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Location Header */}
//       <View style={styles.locationContainer}>
//         <MaterialIcons name="location-on" size={20} color="#000" />
//         <Text style={styles.locationText}>{locationName}</Text>
//         <MaterialIcons name="arrow-drop-down" size={22} color="#000" />
//       </View>

//       {/* Loading Indicator */}
//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
//       ) : isDeliverable ? (
//         <View style={styles.messageContainer}>
//           <Text style={styles.title}>Welcome to Farm2Fork!</Text>
//           <Text style={styles.subtitle}>Enjoy fresh farm produce delivered fast.</Text>
//         </View>
//       ) : (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location.jpeg")} style={styles.locationIcon} />
//           <Text style={styles.title}>Location is not serviceable</Text>
//           <Text style={styles.subtitle}>
//             Our services are currently available within a {serviceRadius} km radius.
//           </Text>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate("MapScreen")}
//           >
//             <Text style={styles.buttonText}>Change Location</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 40,
//     alignItems: "center",
//   },
//   locationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "90%",
//     paddingVertical: 10,
//   },
//   locationText: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 5,
//     flex: 1,
//   },
//   messageContainer: {
//     alignItems: "center",
//     padding: 20,
//     width: "90%",
//     textAlign: "center",
//   },
//   locationIcon: {
//     width: 50,
//     height: 50,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#666",
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   button: {
//     backgroundColor: "blue",
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// import React, { useEffect, useState } from "react";
// import {
//   View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator
// } from "react-native";
// import { MaterialIcons, Ionicons } from "@expo/vector-icons";
// import * as Location from 'expo-location';

// // Function to calculate distance using Haversine formula
// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degrees) => degrees * (Math.PI / 180);
//   const R = 6371; // Radius of the Earth in kilometers

//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) *
//     Math.cos(toRadians(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = R * c; // Distance in kilometers
//   return distance;
// };

// export default function HomeScreen({ navigation, route }) {
//   const [locationName, setLocationName] = useState("Detecting location...");
//   const [isDeliverable, setIsDeliverable] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Define the service area (center and radius)
//   const serviceAreaCenter = { latitude: 23.2599, longitude: 77.4126 }; // Example: Bhopal, India
//   const serviceRadius = 20; // Service available within 20 kilometers

//   // Function to check service availability
//   const checkServiceAvailability = async (coords) => {
//     const { latitude, longitude } = coords;

//     // Reverse geocode to get the address
//     let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//     if (geocode.length > 0) {
//       const { city, region, country, name, street } = geocode[0];
//       const displayName = `${name || street}, ${city || region}, ${country}`;
//       setLocationName(displayName);

//       // Calculate distance from the service area center
//       const distance = haversineDistance(
//         latitude,
//         longitude,
//         serviceAreaCenter.latitude,
//         serviceAreaCenter.longitude
//       );

//       // Check if the user is within the service radius
//       if (distance <= serviceRadius) {
//         setIsDeliverable(true); // Service is available
//         setUserLocation(coords);
//       } else {
//         setIsDeliverable(false); // Service is not available
//       }
//     }
//     setLoading(false);
//   };

//   // Get the user's current location on component mount
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert("Permission Denied", "Location permission is required to use this feature.");
//         setLoading(false);
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       checkServiceAvailability(location.coords);
//     })();
//   }, []);

//   // Handle selected location from MapScreen
//   useEffect(() => {
//     if (route.params?.selectedLocation) {
//       checkServiceAvailability(route.params.selectedLocation);
//     }
//   }, [route.params?.selectedLocation]);

//   return (
//     <View style={styles.container}>
//       {/* Location Header */}
//       <View style={styles.locationContainer}>
//         <MaterialIcons name="location-on" size={20} color="#000" />
//         <Text style={styles.locationText}>{locationName}</Text>
//         <MaterialIcons name="arrow-drop-down" size={22} color="#000" />
//         <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
//           <Ionicons name="person-circle" size={28} color="#000" style={styles.profileIcon} />
//         </TouchableOpacity>
//       </View>

//       {/* Loading Indicator */}
//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
//       ) : isDeliverable ? (
//         <View style={styles.messageContainer}>
//           <Text style={styles.title}>Welcome to Avijo!</Text>
//           <Text style={styles.subtitle}>Enjoy delivery at your doorstep.</Text>
//         </View>
//       ) : (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location.jpeg")} style={styles.locationIcon} />
//           <Text style={styles.title}>Location is not serviceable</Text>
//           <Text style={styles.subtitle}>
//             Our services are currently available within a {serviceRadius} km radius.
//           </Text>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate("MapScreen", { onLocationChange: (location) => navigation.setParams({ selectedLocation: location }) })}
//           >
//             <Text style={styles.buttonText}>Change Location</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 40,
//     alignItems: "center",
//   },
//   locationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "90%",
//     paddingVertical: 10,
//   },
//   locationText: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 5,
//     flex: 1,
//   },
//   profileIcon: {
//     marginLeft: 10,
//   },
//   messageContainer: {
//     alignItems: "center",
//     padding: 20,
//     width: "90%",
//     textAlign: "center",
//   },
//   locationIcon: {
//     width: 50,
//     height: 50,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#666",
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   button: {
//     backgroundColor: "blue",
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
// import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
// import * as Location from 'expo-location';

// export default function HomeScreen({ navigation }) {
//   const [locationName, setLocationName] = useState("Detecting location...");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setLocationName("Permission denied");
//         setLoading(false);
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       let geocode = await Location.reverseGeocodeAsync(location.coords);
//       if (geocode.length > 0) {
//         setLocationName(`${geocode[0].city}, ${geocode[0].country}`);
//       }
//       setLoading(false);
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Location Header */}
//       <View style={styles.locationContainer}>
//         <MaterialIcons name="location-on" size={20} color="#000" />
//         <Text style={styles.locationText}>{locationName}</Text>
//         <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")}>
//           <Ionicons name="search" size={22} color="#000" style={styles.searchIcon} />
//         </TouchableOpacity>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
//       ) : (
//         <View style={styles.messageContainer}>
//           <Text style={styles.title}>Welcome to Farm2Fork!</Text>
//           <Text style={styles.subtitle}>Enjoy fresh farm produce delivered fast.</Text>
//         </View>
//       )}

//       {/* Bottom Navigation */}
//       <View style={styles.bottomTab}>
//         <TouchableOpacity style={styles.tabButton}>
//           <Ionicons name="home" size={24} color="#007AFF" />
//           <Text>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabButton}>
//           <FontAwesome5 name="cheese" size={22} color="#007AFF" />
//           <Text>Dairy</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabButton}>
//           <FontAwesome5 name="heartbeat" size={22} color="#007AFF" />
//           <Text>Docare</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate("ProfileScreen")}>
//           <Ionicons name="person-circle" size={24} color="#007AFF" />
//           <Text>Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 40,
//     alignItems: "center",
//   },
//   locationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "90%",
//     paddingVertical: 10,
//   },
//   locationText: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 5,
//     flex: 1,
//   },
//   searchIcon: {
//     marginLeft: 10,
//   },
//   messageContainer: {
//     alignItems: "center",
//     padding: 20,
//     width: "90%",
//     textAlign: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#666",
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   bottomTab: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     backgroundColor: "#f8f8f8",
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderColor: "#ddd",
//   },
//   tabButton: {
//     alignItems: "center",
//   },
// });

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { MaterialIcons, Ionicons } from "@expo/vector-icons";
// import * as Location from "expo-location";

// // Function to calculate distance using Haversine formula
// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degrees) => degrees * (Math.PI / 180);
//   const R = 6371; // Radius of the Earth in kilometers

//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) *
//       Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = R * c; // Distance in kilometers
//   return distance;
// };

// export default function HomeScreen({ navigation, route }) {
//   const [locationName, setLocationName] = useState("Detecting location...");
//   const [isDeliverable, setIsDeliverable] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Define the service area (center and radius)
//   const serviceAreaCenter = { latitude: 23.2599, longitude: 77.4126 }; // Example: Bhopal, India
//   const serviceRadius = 20; // Service available within 20 kilometers

//   // Function to check service availability
//   const checkServiceAvailability = async (coords) => {
//     const { latitude, longitude } = coords;

//     // Reverse geocode to get the address
//     let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//     if (geocode.length > 0) {
//       const { city, region, country, name, street } = geocode[0];
//       const displayName = `${name || street}, ${city || region}, ${country}`;
//       setLocationName(displayName);

//       // Calculate distance from the service area center
//       const distance = haversineDistance(
//         latitude,
//         longitude,
//         serviceAreaCenter.latitude,
//         serviceAreaCenter.longitude
//       );

//       // Check if the user is within the service radius
//       if (distance <= serviceRadius) {
//         setIsDeliverable(true); // Service is available
//         setUserLocation(coords);
//       } else {
//         setIsDeliverable(false); // Service is not available
//       }
//     }
//     setLoading(false);
//   };

//   // Get the user's current location on component mount
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert(
//           "Permission Denied",
//           "Location permission is required to use this feature."
//         );
//         setLoading(false);
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       checkServiceAvailability(location.coords);
//     })();
//   }, []);

//   // Handle selected location from MapScreen
//   useEffect(() => {
//     if (route.params?.selectedLocation) {
//       checkServiceAvailability(route.params.selectedLocation);
//     }
//   }, [route.params?.selectedLocation]);

//   return (
//     <View style={styles.container}>
//       {/* Location Header */}
//       <View style={styles.locationContainer}>
//         <MaterialIcons name="location-on" size={20} color="#000" />
//         <Text style={styles.locationText}>{locationName}</Text>
//         <MaterialIcons name="arrow-drop-down" size={22} color="#000" />
//         <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")}>
//           <Ionicons name="search" size={28} color="#000" style={styles.searchIcon} />
//         </TouchableOpacity>
//       </View>

//       {/* Loading Indicator */}
//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
//       ) : isDeliverable ? (
//         <View style={styles.messageContainer}>
//           <Text style={styles.title}>Welcome to Avijo!</Text>
//           <Text style={styles.subtitle}>Enjoy delivery at your doorstep.</Text>
//         </View>
//       ) : (
//         <View style={styles.messageContainer}>
//           <Image
//             source={require("./assets/location.jpeg")}
//             style={styles.locationIcon}
//           />
//           <Text style={styles.title}>Location is not serviceable</Text>
//           <Text style={styles.subtitle}>
//             Our services are currently available within a {serviceRadius} km radius.
//           </Text>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() =>
//               navigation.navigate("LocationScreen", {
//                 onLocationChange: (location) =>
//                   navigation.setParams({ selectedLocation: location }),
//               })
//             }
//           >
//             <Text style={styles.buttonText}>Change Location</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Bottom Tab Navigation */}
//       {/* <View style={styles.bottomTab}>
//         <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate("HomeScreen")}>
//           <Ionicons name="home" size={24} color="#000" />
//           <Text style={styles.tabText}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate("Diary")}>
//           <Ionicons name="book" size={24} color="#000" />
//           <Text style={styles.tabText}>Diary</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate("DoCare")}>
//           <Ionicons name="heart" size={24} color="#000" />
//           <Text style={styles.tabText}>DoCare</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate("Product")}>
//           <Ionicons name="cart" size={24} color="#000" />
//           <Text style={styles.tabText}>Product</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate("Profile")}>
//           <Ionicons name="person" size={24} color="#000" />
//           <Text style={styles.tabText}>Profile</Text>
//         </TouchableOpacity>
//       </View> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 40,
//     alignItems: "center",
//   },
//   locationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "90%",
//     paddingVertical: 10,
//   },
//   locationText: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 5,
//     flex: 1,
//   },
//   searchIcon: {
//     marginLeft: 10,
//   },
//   messageContainer: {
//     alignItems: "center",
//     padding: 20,
//     width: "90%",
//     textAlign: "center",
//   },
//   locationIcon: {
//     width: 50,
//     height: 50,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#666",
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   button: {
//     backgroundColor: "blue",
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   bottomTab: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     width: "100%",
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#ccc",
//     position: "absolute",
//     bottom: 0,
//     backgroundColor: "#fff",
//   },
//   tabItem: {
//     alignItems: "center",
//   },
//   tabText: {
//     fontSize: 12,
//     marginTop: 5,
//   },
// });

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Modal,
// } from "react-native";
// import { MaterialIcons, Ionicons } from "@expo/vector-icons";
// import * as Location from "expo-location";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degrees) => degrees * (Math.PI / 180);
//   const R = 6371;
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) *
//       Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// export default function HomeScreen({ navigation, route }) {
//   const [locationName, setLocationName] = useState("Detecting location...");
//   const [isDeliverable, setIsDeliverable] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [profileImage, setProfileImage] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const serviceAreaCenter = { latitude: 23.2599, longitude: 77.4126 };
//   const serviceRadius = 20;

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Permission Denied", "Location permission is required.");
//         setLoading(false);
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       checkServiceAvailability(location.coords);
//     })();
//   }, []);

//   useEffect(() => {
//     if (route.params?.selectedLocation) {
//       checkServiceAvailability(route.params.selectedLocation);
//     }
//   }, [route.params?.selectedLocation]);

//   useEffect(() => {
//     (async () => {
//       const storedPhone = await AsyncStorage.getItem("userPhone");
//       if (storedPhone) setPhoneNumber(storedPhone);
//     })();
//   }, []);

//   const checkServiceAvailability = async (coords) => {
//     const { latitude, longitude } = coords;
//     let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//     if (geocode.length > 0) {
//       const { city, region, country, name, street } = geocode[0];
//       setLocationName(`${name || street}, ${city || region}, ${country}`);
//       const distance = haversineDistance(latitude, longitude, serviceAreaCenter.latitude, serviceAreaCenter.longitude);
//       setIsDeliverable(distance <= serviceRadius);
//     }
//     setLoading(false);
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });
//     if (!result.canceled) setProfileImage(result.assets[0].uri);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => setDrawerVisible(true)}>
//           <Ionicons name="person-circle" size={40} color="#000" />
//         </TouchableOpacity>
//         <View style={styles.locationContainer}>
//           <MaterialIcons name="location-on" size={20} color="#000" />
//           <Text style={styles.locationText}>{locationName}</Text>
//         </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
//       ) : isDeliverable ? (
//         <Text style={styles.serviceText}>Service available in your area!</Text>
//       ) : (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location.jpeg")} style={styles.locationIcon} />
//           <Text style={styles.title}>Location not serviceable</Text>
//           <Text style={styles.subtitle}>We are working to expand our services.</Text>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate("LocationScreen")}
//           >
//             <Text style={styles.buttonText}>Try Changing Location</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <Modal visible={drawerVisible} animationType="slide" transparent>
//         <View style={styles.drawer}>
//           <TouchableOpacity onPress={() => setDrawerVisible(false)}>
//             <Ionicons name="close" size={30} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={pickImage}>
//             <Image source={profileImage ? { uri: profileImage } : require("./assets/profile.jpeg")} style={styles.profilePic} />
//           </TouchableOpacity>
//           <Text style={styles.phoneText}>{phoneNumber}</Text>
//           <TouchableOpacity style={styles.drawerItem}><Text>Abha</Text></TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}><Text>Order & Booking</Text></TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}><Text>Addresses</Text></TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}><Text>Reminder</Text></TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}><Text>Ambulance</Text></TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}><Text>Help & Support</Text></TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { flexDirection: "row", alignItems: "center", padding: 20 },
//   locationContainer: { flexDirection: "row", marginLeft: 10 },
//   locationText: { fontSize: 16, fontWeight: "bold" },
//   messageContainer: { alignItems: "center", padding: 20 },
//   drawer: { position: "absolute", left: 0, width: "70%", backgroundColor: "#fff", padding: 20 },
//   profilePic: { width: 80, height: 80, borderRadius: 40 },
//   phoneText: { marginVertical: 10, fontSize: 16 },
//   drawerItem: { padding: 10, borderBottomWidth: 1, borderColor: "#ccc" },
// });

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Modal,
// } from "react-native";
// import { MaterialIcons, Ionicons } from "@expo/vector-icons";
// import * as Location from "expo-location";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degrees) => degrees * (Math.PI / 180);
//   const R = 6371;
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) *
//       Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// export default function HomeScreen({ navigation, route }) {
//   const [locationName, setLocationName] = useState("Detecting location...");
//   const [isDeliverable, setIsDeliverable] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [profileImage, setProfileImage] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const serviceAreaCenter = { latitude: 23.2599, longitude: 77.4126 };
//   const serviceRadius = 20;

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Permission Denied", "Location permission is required.");
//         setLoading(false);
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       checkServiceAvailability(location.coords);
//     })();
//   }, []);

//   useEffect(() => {
//     if (route.params?.selectedLocation) {
//       checkServiceAvailability(route.params.selectedLocation);
//     }
//   }, [route.params?.selectedLocation]);

//   useEffect(() => {
//     (async () => {
//       const storedPhone = await AsyncStorage.getItem("userPhone");
//       if (storedPhone) setPhoneNumber(storedPhone);
//     })();
//   }, []);

//   const checkServiceAvailability = async (coords) => {
//     const { latitude, longitude } = coords;
//     let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//     if (geocode.length > 0) {
//       const { city, region, country, name, street } = geocode[0];
//       setLocationName(`${name || street}, ${city || region}, ${country}`);
//       const distance = haversineDistance(latitude, longitude, serviceAreaCenter.latitude, serviceAreaCenter.longitude);
//       setIsDeliverable(distance <= serviceRadius);
//     }
//     setLoading(false);
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });
//     if (!result.canceled) setProfileImage(result.assets[0].uri);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => setDrawerVisible(true)}>
//           <Ionicons name="person-circle" size={40} color="#000" />
//         </TouchableOpacity>
//         <View style={styles.locationContainer}>
//           <MaterialIcons name="location-on" size={20} color="#000" />
//           <Text style={styles.locationText}>{locationName}</Text>
//         </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
//       ) : isDeliverable ? (
//         <Text style={styles.serviceText}>Service available in your area!</Text>
//       ) : (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
//           <Text style={styles.title}>Location not serviceable</Text>
//           <Text style={styles.subtitle}>We are working to expand our services.</Text>
//           <TouchableOpacity
//             style={styles.changeLocationButton}
//             onPress={() => navigation.navigate("LocationScreen")}
//           >
//             <Text style={styles.changeLocationButtonText}>Try Changing Location</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* <Modal visible={drawerVisible} animationType="slide" transparent>
//         <View style={styles.drawer}>
//           <TouchableOpacity onPress={() => setDrawerVisible(false)}>
//             <Ionicons name="close" size={30} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={pickImage}>
//             <Image source={profileImage ? { uri: profileImage } : require("./assets/profile.jpeg")} style={styles.profilePic} />
//           </TouchableOpacity>
//           <Text style={styles.phoneText}>{phoneNumber}</Text>
//           <TouchableOpacity style={styles.drawerItem}><Text>Abha</Text></TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}><Text>Order & Booking</Text></TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}><Text>Addresses</Text></TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}><Text>Reminder</Text></TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}><Text>Ambulance</Text></TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}><Text>Help & Support</Text></TouchableOpacity>
//         </View>
//       </Modal> */}
//       <Modal visible={drawerVisible} animationType="slide" transparent>
//         <View style={styles.drawer}>
//           <TouchableOpacity onPress={() => setDrawerVisible(false)}>
//             <Ionicons name="close" size={30} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={pickImage}>
//             <Image source={profileImage ? { uri: profileImage } : require("./assets/profile.jpeg")} style={styles.profilePic} />
//           </TouchableOpacity>
//           <Text style={styles.phoneText}>{phoneNumber}</Text>

//           {/* Drawer Items with Icons */}
//           <TouchableOpacity style={styles.drawerItem}>
//             <FontAwesome name="user" size={20} color="#000" />
//             <Text style={styles.drawerItem}>Abha</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Entypo name="shopping-cart" size={20} color="#000" />
//             <Text style={styles.drawerItem}>Order & Booking</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Feather name="map-pin" size={20} color="#000" />
//             <Text style={styles.drawerItem}>Addresses</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Ionicons name="alarm" size={20} color="#000" />
//             <Text style={styles.drawerItem}>Reminder</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <FontAwesome name="ambulance" size={20} color="#000" />
//             <Text style={styles.drawerItem}>Ambulance</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Feather name="help-circle" size={20} color="#000" />
//             <Text style={styles.drawerItem}>Help & Support</Text>
//           </TouchableOpacity>

//           {/* Settings Icon at Bottom Right */}
//           <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate("Settings")}>
//             <Feather name="settings" size={24} color="#000" />
//           </TouchableOpacity>
//         </View>
//       </Modal>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { flexDirection: "row", alignItems: "center", padding: 20 },
//   locationContainer: { flexDirection: "row", marginLeft: 10 },
//   locationText: { fontSize: 16, fontWeight: "bold" },
//   messageContainer: { alignItems: "center", padding: 20 },
//   drawer: { position: "absolute", left: 0, width: "70%", backgroundColor: "#fff", padding: 20 },
//   profilePic: { width: 80, height: 80, borderRadius: 40 },
//   phoneText: { marginVertical: 10, fontSize: 16 },
//   drawerItem: { padding: 10, borderBottomWidth: 1, borderColor: "#ccc" },
//   changeLocationButton: {
//     backgroundColor: "#0097DB", // Light blue color
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   changeLocationButtonText: {
//     color: "white", // Black text color
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   serviceText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "green",
//     textAlign: "center",
//     marginVertical: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//   },
//   locationIcon: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
// });

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Modal,
// } from "react-native";
// import { MaterialIcons, Ionicons } from "@expo/vector-icons"; // Import icons
// import * as Location from "expo-location";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degrees) => degrees * (Math.PI / 180);
//   const R = 6371;
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) *
//       Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// export default function HomeScreen({ navigation, route }) {
//   const [locationName, setLocationName] = useState("Detecting location...");
//   const [isDeliverable, setIsDeliverable] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [profileImage, setProfileImage] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const serviceAreaCenter = { latitude: 23.2599, longitude: 77.4126 };
//   const serviceRadius = 20;

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Permission Denied", "Location permission is required.");
//         setLoading(false);
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       checkServiceAvailability(location.coords);
//     })();
//   }, []);

//   useEffect(() => {
//     if (route.params?.selectedLocation) {
//       checkServiceAvailability(route.params.selectedLocation);
//     }
//   }, [route.params?.selectedLocation]);

//   useEffect(() => {
//     (async () => {
//       const storedPhone = await AsyncStorage.getItem("phoneNumber");
//       if (storedPhone) setPhoneNumber(storedPhone);
//     })();
//   }, []);

//   const checkServiceAvailability = async (coords) => {
//     const { latitude, longitude } = coords;
//     let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//     if (geocode.length > 0) {
//       const { city, region, country, name, street } = geocode[0];
//       setLocationName(`${name || street}, ${city || region}, ${country}`);
//       const distance = haversineDistance(latitude, longitude, serviceAreaCenter.latitude, serviceAreaCenter.longitude);
//       setIsDeliverable(distance <= serviceRadius);
//     }
//     setLoading(false);
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });
//     if (!result.canceled) setProfileImage(result.assets[0].uri);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => setDrawerVisible(true)}>
//           <Ionicons name="person-circle" size={40} color="#000" />
//         </TouchableOpacity>
//         <View style={styles.locationContainer}>
//           <MaterialIcons name="location-on" size={20} color="#000" />
//           <Text style={styles.locationText}>{locationName}</Text>
//         </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
//       ) : isDeliverable ? (
//         <Text style={styles.serviceText}>Service available in your area!</Text>
//       ) : (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
//           <Text style={styles.title}>Location not serviceable</Text>
//           <Text style={styles.subtitle}>Our team is working tirelessly to bring 10</Text>
//           <Text style={styles.subtitle}>minutes delivery at your doorstep.</Text>
//           <TouchableOpacity
//             style={styles.changeLocationButton}
//             onPress={() => navigation.navigate("LocationScreen")}
//           >
//             <Text style={styles.changeLocationButtonText}>Try Changing Location</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <Modal visible={drawerVisible} animationType="slide" transparent>
//         <View style={styles.drawer}>
//           <TouchableOpacity onPress={() => setDrawerVisible(false)}>
//             <Ionicons name="close" size={30} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={pickImage}>
//             <Image source={profileImage ? { uri: profileImage } : require("./assets/Profile.png")} style={styles.profilePic} />
//           </TouchableOpacity>
//           <Text style={styles.Avijo}>UHI avijo</Text>
//           <Text style={styles.phoneText}>{phoneNumber}</Text>

//           {/* Drawer Items with Icons */}
//           <TouchableOpacity style={styles.drawerItem}>
//             <Ionicons name="person" size={20} color="#000" style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Abha</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <MaterialIcons name="shopping-cart" size={20} color="#000" style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Order & Booking</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <MaterialIcons name="location-on" size={20} color="#000" style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Addresses</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Ionicons name="alarm" size={20} color="#000" style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Reminder</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <MaterialIcons name="local-hospital" size={20} color="#000" style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Ambulance</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Ionicons name="help-circle" size={20} color="#000" style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Help & Support</Text>
//           </TouchableOpacity>

//           {/* Settings Icon at Bottom Right */}
//           <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate("Settings")}>
//             <Ionicons name="settings" size={24} color="#000" />
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { flexDirection: "row", alignItems: "center", padding: 15 },
//   locationContainer: { flexDirection: "row", marginLeft: 20 },
//   locationText: { fontSize: 16, fontWeight: "bold", fontFamily: "Gilroy-Medium" },
//   messageContainer: { alignItems: "center", padding: 20 },
//   drawer: { position: "absolute", left: 0, width: "70%", backgroundColor: "#fff", padding: 20, height: "100%" },
//   profilePic: { width: 70, height: 70, borderRadius: 40, marginTop:20 },
//   phoneText: { marginVertical: 10, fontSize: 16, fontFamily: "Gilroy-Medium" , },
//   drawerItem: { flexDirection: "row", alignItems: "flex-start", padding: 15, borderBottomWidth: 1, borderColor: "white", },
//   drawerIcon: { marginRight: 10 }, // Added margin for icons
//   drawerItemText: { fontSize: 16, fontFamily: "Gilroy-Medium" },
//   Avijo:{
//     fontFamily:"Gilroy",
//     fontSize:24,
//   },
//   // changeLocationButton: {
//   //   backgroundColor: "#0097DB", // Light blue color
//   //   padding: 10,
//   //   borderRadius: 5,
//   //   marginTop: 20,
//   // },
//   // changeLocationButtonText: {
//   //   color: "white", // Black text color
//   //   fontSize: 16,
//   //   fontWeight: "bold",
//   //   textAlign: "center",
//   //   fontFamily: "Gilroy-Bold",

//   // },
//   changeLocationButton: {
//     backgroundColor: "#0097DB", // Light blue color
//     padding: 15, // Increased padding for better touch area
//     borderRadius: 5,
//     marginTop: 20,
//     width: "100%", // Make the button take the full width
//     alignItems: "center", // Center the text horizontally
//   },
//   changeLocationButtonText: {
//     color: "white", // White text color
//     fontSize: 18, // Increased font size
//     fontWeight: "bold",
//     textAlign: "center",
//     fontFamily: "Gilroy-Bold",
//   },
//   serviceText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "green",
//     textAlign: "center",
//     marginVertical: 20,
//     fontFamily: "Gilroy-Bold",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 10,
//     fontFamily: "Gilroy-Bold",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     fontFamily: "Gilroy-Medium",
//   },
//   locationIcon: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   settingsIcon: {
//     position: "absolute",
//     right: 20,
//     bottom: 20,
//   },
// });
















// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Modal,
// } from "react-native";
// import * as Location from "expo-location";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { MaterialIcons, Ionicons , Feather } from "@expo/vector-icons";
// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degrees) => degrees * (Math.PI / 180);
//   const R = 6371;
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) *
//       Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// export default function HomeScreen({ navigation, route }) {
//   const [locationName, setLocationName] = useState("Detecting location...");
//   const [isDeliverable, setIsDeliverable] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [profileImage, setProfileImage] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const serviceAreaCenter = { latitude: 23.2599, longitude: 77.4126 };
//   const serviceRadius = 20;

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Permission Denied", "Location permission is required.");
//         setLoading(false);
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       checkServiceAvailability(location.coords);
//     })();
//   }, []);

//   useEffect(() => {
//     if (route.params?.selectedLocation) {
//       checkServiceAvailability(route.params.selectedLocation);
//     }
//   }, [route.params?.selectedLocation]);

//   useEffect(() => {
//     (async () => {
//       const storedPhone = await AsyncStorage.getItem("phoneNumber");
//       if (storedPhone) setPhoneNumber(storedPhone);
//     })();
//   }, []);

//   const checkServiceAvailability = async (coords) => {
//     const { latitude, longitude } = coords;
//     let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//     if (geocode.length > 0) {
//       const { city, region, country, name, street } = geocode[0];
//       setLocationName(`${name || street}, ${city || region}, ${country}`);
//       const distance = haversineDistance(latitude, longitude, serviceAreaCenter.latitude, serviceAreaCenter.longitude);
//       setIsDeliverable(distance <= serviceRadius);
//     }
//     setLoading(false);
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });
//     if (!result.canceled) setProfileImage(result.assets[0].uri);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => setDrawerVisible(true)}>
//           <Ionicons name="person-circle" size={40} color="#000" />
//         </TouchableOpacity>
//         <View style={styles.locationContainer}>
//           <MaterialIcons name="location-on" size={20} color="#000" />
//           <Text style={styles.locationText}>{locationName}</Text>
//         </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
//       ) : isDeliverable ? (
//         <Text style={styles.serviceText}>Service available in your area!</Text>
//       ) : (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
//           <Text style={styles.title}>Location not serviceable</Text>
//           <Text style={styles.subtitle}>Our team is working tirelessly to bring 10</Text>
//           <Text style={styles.subtitle}>minutes delivery at your doorstep.</Text>
//           <TouchableOpacity
//             style={styles.changeLocationButton}
//             onPress={() => navigation.navigate("LocationScreen")}
//           >
//             <Text style={styles.changeLocationButtonText}>Try Changing Location</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <Modal visible={drawerVisible} animationType="slide" transparent>
//         <View style={styles.drawer}>
//           <TouchableOpacity onPress={() => setDrawerVisible(false)}>
//             <Ionicons name="close" size={30} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={pickImage}>
//             <Image source={profileImage ? { uri: profileImage } : require("./assets/Profile.png")} style={styles.profilePic} />
//           </TouchableOpacity>
//           <Text style={styles.Avijo}>UHI avijo</Text>
//           <Text style={styles.phoneText}>{phoneNumber}</Text>

//           {/* Drawer Items with Images */}
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/abha.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Abha</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/order.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Order & Booking</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/address.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Addresses</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/reminder.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Reminder</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/ambulance1.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Ambulance</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/help.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Help & Support</Text>
//           </TouchableOpacity>

//           {/* Settings Icon at Bottom Right */}
//           {/* <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate("Settings")}>
//             <Image source={require("./assets/setting1.png")} style={styles.settingsImage} />
//           </TouchableOpacity> */}
//            <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate("Settings")}>
// //             <Feather name="settings" size={24} color="#000" />
// //           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { flexDirection: "row", alignItems: "center", padding: 15 },
//   locationContainer: { flexDirection: "row", marginLeft: 20 },
//   locationText: { fontSize: 16, fontWeight: "bold", fontFamily: "Gilroy-Medium" },
//   messageContainer: { alignItems: "center", padding: 20 },
//   drawer: { position: "absolute", left: 0, width: "70%", backgroundColor: "#fff", padding: 20, height: "100%" },
//   profilePic: { width: 70, height: 70, borderRadius: 40, marginTop: 20 },
//   phoneText: { marginVertical: 10, fontSize: 16, fontFamily: "Gilroy-Medium" },
//   drawerItem: { flexDirection: "row", alignItems: "center", padding: 15, borderBottomWidth: 1, borderColor: "#eee", marginLeft:5,
//     marginBottom: 5
//    },
//   drawerIcon: { width: 24, height: 24, marginRight: 10 }, // Adjusted size for images
//   drawerItemText: { fontSize: 20, fontFamily: "Lato" },
//   Avijo: { fontFamily: "Lato", fontSize: 24 },
//   changeLocationButton: {
//     backgroundColor: "#0097DB",
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     width: "100%",
//     alignItems: "center",
//   },
//   changeLocationButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     fontFamily: "Gilroy-Bold",
//   },
//   serviceText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "green",
//     textAlign: "center",
//     marginVertical: 20,
//     fontFamily: "Gilroy-Bold",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 10,
//     fontFamily: "Gilroy-Bold",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     fontFamily: "Gilroy-Medium",
//   },
//   locationIcon: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   settingsIcon: {
//     position: "absolute",
//     right: 20,
//     bottom: 20,

//   },
//   settingsImage: {
//     width: 24,
//     height: 24,
//   },
// });

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Modal,
// } from "react-native";
// import * as Location from "expo-location";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";

// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degrees) => degrees * (Math.PI / 180);
//   const R = 6371;
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) *
//       Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// export default function HomeScreen({ navigation, route }) {
//   const [locationName, setLocationName] = useState("Detecting location...");
//   const [isDeliverable, setIsDeliverable] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [profileImage, setProfileImage] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const serviceAreaCenter = { latitude: 23.2599, longitude: 77.4126 };
//   const serviceRadius = 20;

//   // Fetch current location only if no selected location is passed
//   useEffect(() => {
//     if (!route.params?.selectedLocation) {
//       (async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert("Permission Denied", "Location permission is required.");
//           setLoading(false);
//           return;
//         }
//         let location = await Location.getCurrentPositionAsync({});
//         checkServiceAvailability(location.coords);
//       })();
//     }
//   }, []);

//   // Check service availability for the selected location
//   useEffect(() => {
//     if (route.params?.selectedLocation) {
//       checkServiceAvailability(route.params.selectedLocation);
//     }
//   }, [route.params?.selectedLocation]);

//   const checkServiceAvailability = async (coords) => {
//     const { latitude, longitude } = coords;
//     let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//     if (geocode.length > 0) {
//       const { city, region, country, name, street } = geocode[0];
//       setLocationName(`${name || street}, ${city || region}, ${country}`);
//       const distance = haversineDistance(
//         latitude,
//         longitude,
//         serviceAreaCenter.latitude,
//         serviceAreaCenter.longitude
//       );
//       setIsDeliverable(distance <= serviceRadius);
//     }
//     setLoading(false);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => setDrawerVisible(true)}>
//           <Ionicons name="person-circle" size={40} color="#000" />
//         </TouchableOpacity>
//         <View style={styles.locationContainer}>
//           <MaterialIcons name="location-on" size={20} color="#000" />
//           <Text style={styles.locationText}>{locationName}</Text>
//         </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
//       ) : isDeliverable ? (

//         <Text style={styles.serviceText}>Service available in your area!</Text>
//       ) : (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
//           <Text style={styles.title}>Location not serviceable</Text>
//           <Text style={styles.subtitle}>Our team is working tirelessly to bring 10</Text>
//           <Text style={styles.subtitle}>minutes delivery at your doorstep.</Text>
//           <TouchableOpacity
//             style={styles.changeLocationButton}
//             onPress={() => navigation.navigate("LocationScreen")}
//           >
//             <Text style={styles.changeLocationButtonText}>Try Changing Location</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { flexDirection: "row", alignItems: "center", padding: 15 },
//   locationContainer: { flexDirection: "row", marginLeft: 20 },
//   locationText: { fontSize: 16, fontWeight: "bold", fontFamily: "Gilroy-Medium" },
//   messageContainer: { alignItems: "center", padding: 20 },
//   serviceText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "green",
//     textAlign: "center",
//     marginVertical: 20,
//     fontFamily: "Gilroy-Bold",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 10,
//     fontFamily: "Gilroy-Bold",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     fontFamily: "Gilroy-Medium",
//   },
//   locationIcon: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   changeLocationButton: {
//     backgroundColor: "#0097DB",
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     width: "100%",
//     alignItems: "center",
//   },
//   changeLocationButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     fontFamily: "Gilroy-Bold",
//   },
// });













// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Modal,
// } from "react-native";
// import * as Location from "expo-location";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";

// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degrees) => degrees * (Math.PI / 180);
//   const R = 6371;
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) *
//       Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// export default function HomeScreen({ navigation, route }) {
//   const [locationName, setLocationName] = useState("Detecting location...");
//   const [isDeliverable, setIsDeliverable] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [profileImage, setProfileImage] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const serviceAreaCenter = { latitude: 23.2599, longitude: 77.4126 };
//   const serviceRadius = 20;

//   // Fetch current location only if no selected location is passed
//   useEffect(() => {
//     if (!route.params?.selectedLocation) {
//       (async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert("Permission Denied", "Location permission is required.");
//           setLoading(false);
//           return;
//         }
//         let location = await Location.getCurrentPositionAsync({});
//         checkServiceAvailability(location.coords);
//       })();
//     }
//   }, []);

//   // Check service availability for the selected location
//   useEffect(() => {
//     if (route.params?.selectedLocation) {
//       checkServiceAvailability(route.params.selectedLocation);
//     }
//   }, [route.params?.selectedLocation]);

//   const checkServiceAvailability = async (coords) => {
//     const { latitude, longitude } = coords;
//     let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//     if (geocode.length > 0) {
//       const { city, region, country, name, street } = geocode[0];
//       setLocationName(`${name || street}, ${city || region}, ${country}`);
//       const distance = haversineDistance(
//         latitude,
//         longitude,
//         serviceAreaCenter.latitude,
//         serviceAreaCenter.longitude
//       );
//       setIsDeliverable(distance <= serviceRadius);
//     }
//     setLoading(false);
//   };
//   const pickImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.Images,
//           allowsEditing: true,
//           aspect: [1, 1],
//           quality: 1,
//         });
//         if (!result.canceled) setProfileImage(result.assets[0].uri);
//       };
    

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => setDrawerVisible(true)}>
//           <Ionicons name="person-circle" size={40} color="#000" />
//         </TouchableOpacity>
//         <View style={styles.locationContainer}>
//           <MaterialIcons name="location-on" size={20} color="#000" />
//           <Text style={styles.locationText}>{locationName}</Text>
//         </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator
//           size="large"
//           color="blue"
//           style={{ marginVertical: 20 }}
//         />
//       ) : isDeliverable ? (
//         <View style={styles.messageContainer}>
//           <Image
//             source={require("./assets/location4.png")}
//             style={styles.locationIcon}
//           />
//           <Text style={styles.messageText}>Welcome to Avijo!!</Text>
//           <Text style={styles.serviceText}>
//             Service available in your area!
//           </Text>
//         </View>
//       ) : (
//         <View style={styles.messageContainer}>
//           <Image
//             source={require("./assets/location4.png")}
//             style={styles.locationIcon}
//           />
//           <Text style={styles.title}>Location not serviceable</Text>
//           <Text style={styles.subtitle}>
//             Our team is working tirelessly to bring 10
//           </Text>
//           <Text style={styles.subtitle}>
//             minutes delivery at your doorstep.
//           </Text>
//           <TouchableOpacity
//             style={styles.changeLocationButton}
//             onPress={() => navigation.navigate("LocationScreen")}
//           >
//             <Text style={styles.changeLocationButtonText}>
//               Try Changing Location
//             </Text>
//           </TouchableOpacity>
//           <Modal visible={drawerVisible} animationType="slide" transparent>
//             <View style={styles.drawer}>
//               <TouchableOpacity onPress={() => setDrawerVisible(false)}>
//                 <Ionicons name="close" size={30} color="#000" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={pickImage}>
//                 <Image
//                   source={
//                     profileImage
//                       ? { uri: profileImage }
//                       : require("./assets/Profile.png")
//                   }
//                   style={styles.profilePic}
//                 />
//               </TouchableOpacity>
//               <Text style={styles.Avijo}>UHI avijo</Text>
//               <Text style={styles.phoneText}>{phoneNumber}</Text>
//               {/* Drawer Items with Images */}
//               <TouchableOpacity style={styles.drawerItem}>
//                 <Image
//                   source={require("./assets/abha.png")}
//                   style={styles.drawerIcon}
//                 />
//                 <Text style={styles.drawerItemText}>Abha</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.drawerItem}>
//                 <Image
//                   source={require("./assets/order.png")}
//                   style={styles.drawerIcon}
//                 />
//                 <Text style={styles.drawerItemText}>Order & Booking</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.drawerItem}>
//                 <Image
//                   source={require("./assets/address.png")}
//                   style={styles.drawerIcon}
//                 />
//                 <Text style={styles.drawerItemText}>Addresses</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.drawerItem}>
//                 <Image
//                   source={require("./assets/reminder.png")}
//                   style={styles.drawerIcon}
//                 />
//                 <Text style={styles.drawerItemText}>Reminder</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.drawerItem}>
//                 <Image
//                   source={require("./assets/ambulance1.png")}
//                   style={styles.drawerIcon}
//                 />
//                 <Text style={styles.drawerItemText}>Ambulance</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.drawerItem}>
//                 <Image
//                   source={require("./assets/help.png")}
//                   style={styles.drawerIcon}
//                 />
//                 <Text style={styles.drawerItemText}>Help & Support</Text>
//               </TouchableOpacity>
//               {/* Settings Icon at Bottom Right */}
            
//               {/* <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate("Settings")}>
// //             <Image source={require("./assets/setting1.png")} style={styles.settingsImage} />
// //           </TouchableOpacity> */}
//               <TouchableOpacity
//                 style={styles.settingsIcon}
//                 onPress={() => navigation.navigate("Settings")}
//               >
//                 <Feather name="settings" size={24} color="#000" />
//               </TouchableOpacity>
//             </View>
//           </Modal>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { flexDirection: "row", alignItems: "center", padding: 15 },
//   locationContainer: { flexDirection: "row", marginLeft: 20 },
//   locationText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     fontFamily: "Gilroy-Medium",
//   },
//   messageContainer: { alignItems: "center", padding: 20 },
//   serviceText: {
//     fontSize: 25,
//     fontWeight: "bold",
//     color: "#0097bd",
//     textAlign: "center",
//     marginVertical: 5,
//     fontFamily: "Gilroy-Bold",
//   },
//   messageText: {
//     fontSize: 25,
//     fontFamily: "Gilroy",
//     color: "#0097DB",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 10,
//     fontFamily: "Gilroy-Bold",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     fontFamily: "Gilroy-Medium",
//   },
//   locationIcon: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   changeLocationButton: {
//     backgroundColor: "#0097DB",
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     width: "100%",
//     alignItems: "center",
//   },
//   changeLocationButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     fontFamily: "Gilroy-Bold",
//   },
//   drawer: { position: "absolute", left: 0, width: "70%", backgroundColor: "#fff", padding: 20, height: "100%" },
//     profilePic: { width: 70, height: 70, borderRadius: 40, marginTop: 20 },
//     phoneText: { marginVertical: 10, fontSize: 16, fontFamily: "Gilroy-Medium" },
//     drawerItem: { flexDirection: "row", alignItems: "center", padding: 15, borderBottomWidth: 1, borderColor: "#eee", marginLeft:5,
//       marginBottom: 5
//      },
//     drawerIcon: { width: 24, height: 24, marginRight: 10 }, // Adjusted size for images
//     drawerItemText: { fontSize: 20, fontFamily: "Lato" },
//     Avijo: { fontFamily: "Lato", fontSize: 24 },
//     changeLocationButton: {
//       backgroundColor: "#0097DB",
//       padding: 15,
//       borderRadius: 5,
//       marginTop: 20,
//       width: "100%",
//       alignItems: "center",
//     },
//     settingsIcon: {
//           position: "absolute",
//           right: 20,
//           bottom: 20,
      
//         },
//         settingsImage: {
//           width: 24,
//           height: 24,
//         },
// });



















// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Modal,
// } from "react-native";
// import * as Location from "expo-location";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { MaterialIcons, Ionicons, Feather, FontAwesome, Entypo } from "@expo/vector-icons";

// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degrees) => degrees * (Math.PI / 180);
//   const R = 6371;
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) *
//       Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// export default function HomeScreen({ navigation, route }) {
//   const [locationName, setLocationName] = useState("Detecting location...");
//   const [isDeliverable, setIsDeliverable] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [profileImage, setProfileImage] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const serviceAreaCenter = { latitude: 23.2599, longitude: 77.4126 };
//   const serviceRadius = 20;

//   // Fetch current location only if no selected location is passed
//   useEffect(() => {
//     if (!route.params?.selectedLocation) {
//       (async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert("Permission Denied", "Location permission is required.");
//           setLoading(false);
//           return;
//         }
//         let location = await Location.getCurrentPositionAsync({});
//         checkServiceAvailability(location.coords);
//       })();
//     }
//   }, []);

//   // Check service availability for the selected location
//   useEffect(() => {
//     if (route.params?.selectedLocation) {
//       checkServiceAvailability(route.params.selectedLocation);
//     }
//   }, [route.params?.selectedLocation]);

//   const checkServiceAvailability = async (coords) => {
//     const { latitude, longitude } = coords;
//     let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//     if (geocode.length > 0) {
//       const { city, region, country, name, street } = geocode[0];
//       setLocationName(`${name || street}, ${city || region}, ${country}`);
//       const distance = haversineDistance(
//         latitude,
//         longitude,
//         serviceAreaCenter.latitude,
//         serviceAreaCenter.longitude
//       );
//       setIsDeliverable(distance <= serviceRadius);
//     }
//     setLoading(false);
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });
//     if (!result.canceled) setProfileImage(result.assets[0].uri);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => setDrawerVisible(true)}>
//           <Ionicons name="person-circle" size={40} color="#000" />
//         </TouchableOpacity>
//         <View style={styles.locationContainer}>
//           <MaterialIcons name="location-on" size={20} color="#000" />
//           <Text style={styles.locationText}>{locationName}</Text>
//         </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
//       ) : isDeliverable ? (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
//           <Text style={styles.serviceText}>Service available in your area!</Text>
//         </View>
//       ) : (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
//           <Text style={styles.title}>Location not serviceable</Text>
//           <Text style={styles.subtitle}>Our team is working tirelessly to bring 10</Text>
//           <Text style={styles.subtitle}>minutes delivery at your doorstep.</Text>
//           <TouchableOpacity
//             style={styles.changeLocationButton}
//             onPress={() => navigation.navigate("LocationScreen")}
//           >
//             <Text style={styles.changeLocationButtonText}>Try Changing Location</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Drawer Modal */}
//       <Modal visible={drawerVisible} animationType="slide" transparent>
//         <View style={styles.drawer}>
//           <TouchableOpacity onPress={() => setDrawerVisible(false)}>
//             <Ionicons name="close" size={30} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={pickImage}>
//             <Image
//               source={profileImage ? { uri: profileImage } : require("./assets/profile.jpeg")}
//               style={styles.profilePic}
//             />
//           </TouchableOpacity>
//           <Text style={styles.phoneText}>{phoneNumber}</Text>

//           {/* Drawer Items with Icons */}
//           <TouchableOpacity style={styles.drawerItem}>
//             <FontAwesome name="user" size={20} color="#000" />
//             <Text style={styles.drawerItemText}>Abha</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Entypo name="shopping-cart" size={20} color="#000" />
//             <Text style={styles.drawerItemText}>Order & Booking</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Feather name="map-pin" size={20} color="#000" />
//             <Text style={styles.drawerItemText}>Addresses</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Ionicons name="alarm" size={20} color="#000" />
//             <Text style={styles.drawerItemText}>Reminder</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <FontAwesome name="ambulance" size={20} color="#000" />
//             <Text style={styles.drawerItemText}>Ambulance</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Feather name="help-circle" size={20} color="#000" />
//             <Text style={styles.drawerItemText}>Help & Support</Text>
//           </TouchableOpacity>

//           {/* Settings Icon at Bottom Right */}
//           <TouchableOpacity
//             style={styles.settingsIcon}
//             onPress={() => navigation.navigate("Settings")}
//           >
//             <Feather name="settings" size={24} color="#000" />
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { flexDirection: "row", alignItems: "center", padding: 15 },
//   locationContainer: { flexDirection: "row", marginLeft: 20 },
//   locationText: { fontSize: 16, fontWeight: "bold", fontFamily: "Gilroy-Medium" },
//   messageContainer: { alignItems: "center", padding: 20 },
//   serviceText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "green",
//     textAlign: "center",
//     marginVertical: 20,
//     fontFamily: "Gilroy-Bold",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 10,
//     fontFamily: "Gilroy-Bold",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     fontFamily: "Gilroy-Medium",
//   },
//   locationIcon: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   changeLocationButton: {
//     backgroundColor: "#0097DB",
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     width: "100%",
//     alignItems: "center",
//   },
//   changeLocationButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     fontFamily: "Gilroy-Bold",
//   },
//   drawer: {
//     position: "absolute",
//     left: 0,
//     width: "70%",
//     backgroundColor: "#fff",
//     padding: 20,
//     height: "100%",
//   },
//   profilePic: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginTop: 20,
//   },
//   phoneText: {
//     marginVertical: 10,
//     fontSize: 16,
//     fontFamily: "Gilroy-Medium",
//   },
//   drawerItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   drawerItemText: {
//     fontSize: 16,
//     marginLeft: 10,
//     fontFamily: "Gilroy-Medium",
//   },
//   settingsIcon: {
//     position: "absolute",
//     right: 20,
//     bottom: 20,
//   },
// });




















// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Modal,
// } from "react-native";
// import * as Location from "expo-location";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";

// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degrees) => degrees * (Math.PI / 180);
//   const R = 6371;
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) *
//       Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// export default function HomeScreen({ navigation, route }) {
//   const [locationName, setLocationName] = useState("Detecting location...");
//   const [isDeliverable, setIsDeliverable] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [profileImage, setProfileImage] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const serviceAreaCenter = { latitude: 23.2599, longitude: 77.4126 };
//   const serviceRadius = 20;

//   // Fetch current location only if no selected location is passed
//   useEffect(() => {
//     if (!route.params?.selectedLocation) {
//       (async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert("Permission Denied", "Location permission is required.");
//           setLoading(false);
//           return;
//         }
//         let location = await Location.getCurrentPositionAsync({});
//         checkServiceAvailability(location.coords);
//       })();
//     }
//   }, []);

//   // Check service availability for the selected location
//   useEffect(() => {
//     if (route.params?.selectedLocation) {
//       checkServiceAvailability(route.params.selectedLocation);
//     }
//   }, [route.params?.selectedLocation]);

//   const checkServiceAvailability = async (coords) => {
//     const { latitude, longitude } = coords;
//     let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//     if (geocode.length > 0) {
//       const { city, region, country, name, street } = geocode[0];
//       setLocationName(`${name || street}, ${city || region}, ${country}`);
//       const distance = haversineDistance(
//         latitude,
//         longitude,
//         serviceAreaCenter.latitude,
//         serviceAreaCenter.longitude
//       );
//       setIsDeliverable(distance <= serviceRadius);
//     }
//     setLoading(false);
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });
//     if (!result.canceled) setProfileImage(result.assets[0].uri);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => setDrawerVisible(true)}>
//           <Ionicons name="person-circle" size={40} color="#000" />
//         </TouchableOpacity>
//         <View style={styles.locationContainer}>
//           <MaterialIcons name="location-on" size={20} color="#000" />
//           <Text style={styles.locationText}>{locationName}</Text>
//         </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
//       ) : isDeliverable ? (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
//           <Text style={styles.serviceText}>Service available in your area!</Text>
//         </View>
//       ) : (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
//           <Text style={styles.title}>Location not serviceable</Text>
//           <Text style={styles.subtitle}>Our team is working tirelessly to bring 10</Text>
//           <Text style={styles.subtitle}>minutes delivery at your doorstep.</Text>
//           <TouchableOpacity
//             style={styles.changeLocationButton}
//             onPress={() => navigation.navigate("LocationScreen")}
//           >
//             <Text style={styles.changeLocationButtonText}>Try Changing Location</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Drawer Modal */}
//       <Modal visible={drawerVisible} animationType="slide" transparent>
//         <View style={styles.drawer}>
//           <TouchableOpacity onPress={() => setDrawerVisible(false)}>
//             <Ionicons name="close" size={30} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={pickImage}>
//             <Image
//               source={profileImage ? { uri: profileImage } : require("./assets/Profile.png")}
//               style={styles.profilePic}
//             />
//           </TouchableOpacity>
//           <Text style={styles.Avijo}>UHI avijo</Text>
//           <Text style={styles.phoneText}>{phoneNumber}</Text>

//           {/* Drawer Items with Images */}
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/abha.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Abha</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/order.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Order & Booking</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/address.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Addresses</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/reminder.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Reminder</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/ambulance1.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Ambulance</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/help.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Help & Support</Text>
//           </TouchableOpacity>

//           {/* Settings Icon at Bottom Right */}
//           <TouchableOpacity
//             style={styles.settingsIcon}
//             onPress={() => navigation.navigate("Settings")}
//           >
//             <Feather name="settings" size={24} color="#000" />
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { flexDirection: "row", alignItems: "center", padding: 15 },
//   locationContainer: { flexDirection: "row", marginLeft: 20 },
//   locationText: { fontSize: 16, fontWeight: "bold", fontFamily: "Gilroy-Medium" },
//   messageContainer: { alignItems: "center", padding: 20 },
//   serviceText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "green",
//     textAlign: "center",
//     marginVertical: 20,
//     fontFamily: "Gilroy-Bold",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 10,
//     fontFamily: "Gilroy-Bold",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     fontFamily: "Gilroy-Medium",
//   },
//   locationIcon: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   changeLocationButton: {
//     backgroundColor: "#0097DB",
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     width: "100%",
//     alignItems: "center",
//   },
//   changeLocationButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     fontFamily: "Gilroy-Bold",
//   },
//   drawer: {
//     position: "absolute",
//     left: 0,
//     width: "70%",
//     backgroundColor: "#fff",
//     padding: 20,
//     height: "100%",
//   },
//   profilePic: {
//     width: 70,
//     height: 70,
//     borderRadius: 40,
//     marginTop: 20,
//   },
//   phoneText: {
//     marginVertical: 10,
//     fontSize: 16,
//     fontFamily: "Gilroy-Medium",
//   },
//   drawerItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderColor: "#eee",
//     marginLeft: 5,
//     marginBottom: 5,
//   },
//   drawerIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 10,
//   },
//   drawerItemText: {
//     fontSize: 20,
//     fontFamily: "Lato",
//   },
//   Avijo: {
//     fontFamily: "Lato",
//     fontSize: 24,
//   },
//   settingsIcon: {
//     position: "absolute",
//     right: 20,
//     bottom: 20,
//   },
// });













// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Modal,
// } from "react-native";
// import * as Location from "expo-location";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";

// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degrees) => degrees * (Math.PI / 180);
//   const R = 6371;
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) *
//       Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// export default function HomeScreen({ navigation, route }) {
//   const [locationName, setLocationName] = useState("Detecting location...");
//   const [isDeliverable, setIsDeliverable] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [profileImage, setProfileImage] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const serviceAreaCenter = { latitude: 23.2599, longitude: 77.4126 };
//   const serviceRadius = 0;

//   // Fetch current location only if no selected location is passed
//   useEffect(() => {
//     if (!route.params?.selectedLocation) {
//       (async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert("Permission Denied", "Location permission is required.");
//           setLoading(false);
//           return;
//         }
//         let location = await Location.getCurrentPositionAsync({});
//         checkServiceAvailability(location.coords);
//       })();
//     }
//   }, []);

//   // Check service availability for the selected location
//   useEffect(() => {
//     if (route.params?.selectedLocation) {
//       checkServiceAvailability(route.params.selectedLocation);
//     }
//   }, [route.params?.selectedLocation]);

//   const checkServiceAvailability = async (coords) => {
//     const { latitude, longitude } = coords;
//     let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//     if (geocode.length > 0) {
//       const { city, region, country, name, street } = geocode[0];
//       setLocationName(`${name || street}, ${city || region}, ${country}`);
//       const distance = haversineDistance(
//         latitude,
//         longitude,
//         serviceAreaCenter.latitude,
//         serviceAreaCenter.longitude
//       );
//       setIsDeliverable(distance <= serviceRadius);
//     }
//     setLoading(false);
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });
//     if (!result.canceled) setProfileImage(result.assets[0].uri);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => setDrawerVisible(true)}>
//           <Ionicons name="person-circle" size={40} color="#000" />
//         </TouchableOpacity>
//         <View style={styles.locationContainer}>
//           <MaterialIcons name="location-on" size={20} color="#000" />
//           <Text style={styles.locationText}>{locationName}</Text>
//         </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
//       ) : isDeliverable ? (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
//           <Text style={styles.serviceText}>Service available in your area!</Text>
//         </View>
//       ) : (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
//           <Text style={styles.title}>Location not serviceable</Text>
//           <Text style={styles.subtitle}>Our team is working tirelessly to bring 10</Text>
//           <Text style={styles.subtitle}>minutes delivery at your doorstep.</Text>
//           <TouchableOpacity
//             style={styles.changeLocationButton}
//             onPress={() => navigation.navigate("LocationScreen")}
//           >
//             <Text style={styles.changeLocationButtonText}>Try Changing Location</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Drawer Modal */}
//       <Modal visible={drawerVisible} animationType="slide" transparent>
//         <View style={styles.drawer}>
//           <TouchableOpacity onPress={() => setDrawerVisible(false)}>
//             <Ionicons name="close" size={30} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={pickImage}>
//             <Image
//               source={profileImage ? { uri: profileImage } : require("./assets/Profile.png")}
//               style={styles.profilePic}
//             />
//           </TouchableOpacity>
//           <Text style={styles.Avijo}>UHI avijo</Text>
//           <Text style={styles.phoneText}>{phoneNumber}</Text>

//           {/* Drawer Items with Images */}
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/abha.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Abha</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/order.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Order & Booking</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/address.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Addresses</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/reminder.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Reminder</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/ambulance1.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Ambulance</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/help.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Help & Support</Text>
//           </TouchableOpacity>

//           {/* Settings Icon at Bottom Right */}
//           <TouchableOpacity
//             style={styles.settingsIcon}
//             onPress={() => navigation.navigate("Settings")}
//           >
//             <Feather name="settings" size={24} color="#000" />
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { flexDirection: "row", alignItems: "center", padding: 15 },
//   locationContainer: { flexDirection: "row", marginLeft: 20 },
//   locationText: { fontSize: 16, fontWeight: "bold", fontFamily: "Gilroy-Medium" },
//   messageContainer: { alignItems: "center", padding: 20 },
//   serviceText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "green",
//     textAlign: "center",
//     marginVertical: 20,
//     fontFamily: "Gilroy-Bold",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 10,
//     fontFamily: "Gilroy-Bold",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     fontFamily: "Gilroy-Medium",
//   },
//   locationIcon: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   changeLocationButton: {
//     backgroundColor: "#0097DB",
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     width: "100%",
//     alignItems: "center",
//   },
//   changeLocationButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     fontFamily: "Gilroy-Bold",
//   },
//   drawer: {
//     position: "absolute",
//     left: 0,
//     width: "100%", // Updated to full width
//     backgroundColor: "#fff",
//     padding: 20,
//     height: "100%",
//   },
//   profilePic: {
//     width: 70,
//     height: 70,
//     borderRadius: 40,
//     marginTop: 20,
//   },
//   phoneText: {
//     marginVertical: 10,
//     fontSize: 16,
//     fontFamily: "Gilroy-Medium",
//   },
//   drawerItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderColor: "#eee",
//     marginLeft: 5,
//     marginBottom: 5,
//   },
//   drawerIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 10,
//   },
//   drawerItemText: {
//     fontSize: 20,
//     fontFamily: "Lato",
//   },
//   Avijo: {
//     fontFamily: "Lato",
//     fontSize: 24,
//   },
//   settingsIcon: {
//     position: "absolute",
//     right: 20,
//     bottom: 20,
//   },
// });






















// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Modal,
// } from "react-native";
// import * as Location from "expo-location";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";

// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degrees) => degrees * (Math.PI / 180);
//   const R = 6371;
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) *
//       Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// export default function HomeScreen({ navigation, route }) {
//   const [locationName, setLocationName] = useState("Detecting location...");
//   const [isDeliverable, setIsDeliverable] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [profileImage, setProfileImage] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const serviceAreaCenter = { latitude: 23.2599, longitude: 77.4126 };
//   const serviceRadius = 20;

//   // Fetch current location only if no selected location is passed
//   useEffect(() => {
//     if (!route.params?.selectedLocation) {
//       (async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert("Permission Denied", "Location permission is required.");
//           setLoading(false);
//           return;
//         }
//         let location = await Location.getCurrentPositionAsync({});
//         checkServiceAvailability(location.coords);
//       })();
//     }
//   }, []);

//   // Check service availability for the selected location
//   useEffect(() => {
//     if (route.params?.selectedLocation) {
//       checkServiceAvailability(route.params.selectedLocation);
//     }
//   }, [route.params?.selectedLocation]);

//   const checkServiceAvailability = async (coords) => {
//     const { latitude, longitude } = coords;
//     let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//     if (geocode.length > 0) {
//       const { city, region, country, name, street } = geocode[0];
//       setLocationName(`${name || street}, ${city || region}, ${country}`);
//       const distance = haversineDistance(
//         latitude,
//         longitude,
//         serviceAreaCenter.latitude,
//         serviceAreaCenter.longitude
//       );
//       setIsDeliverable(distance <= serviceRadius);
//     }
//     setLoading(false);
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });
//     if (!result.canceled) setProfileImage(result.assets[0].uri);
//   };

//   const handleLogout = async () => {
//     await AsyncStorage.clear(); // Clear all stored data
//     navigation.replace("LoginScreen"); // Redirect to Login screen
//   };

//   useEffect(() => {
//         (async () => {
//           const storedPhone = await AsyncStorage.getItem("phoneNumber");
//           if (storedPhone) setPhoneNumber(storedPhone);
//         })();
//       }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => setDrawerVisible(true)}>
//           <Ionicons name="person-circle" size={40} color="#000" />
//         </TouchableOpacity>
        
      
// <View style={styles.locationContainer}>
//   <MaterialIcons name="location-on" size={20} color="#000" />
//   <Text 
//     style={styles.locationText} 
//     numberOfLines={1} 
//     ellipsizeMode="tail"
//   >
//     {locationName}
//   </Text>
// </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
//       ) : isDeliverable ? (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
//           <Text style={styles.serviceText}>Service available in your area!</Text>
//         </View>
//       ) : (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
//           <Text style={styles.title}>Location not serviceable</Text>
//           <Text style={styles.subtitle}>Our team is working tirelessly to bring 10</Text>
//           <Text style={styles.subtitle}>minutes delivery at your doorstep.</Text>
//           <TouchableOpacity
//             style={styles.changeLocationButton}
//             onPress={() => navigation.navigate("LocationScreen")}
//           >
//             <Text style={styles.changeLocationButtonText}>Try Changing Location</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Drawer Modal */}
//       <Modal visible={drawerVisible} animationType="slide" transparent>
//         <View style={styles.drawer}>
//           <TouchableOpacity onPress={() => setDrawerVisible(false)}>
//             <Ionicons name="close" size={30} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={pickImage}>
//             <Image
//               source={profileImage ? { uri: profileImage } : require("./assets/Profile.png")}
//               style={styles.profilePic}
//             />
//           </TouchableOpacity>
//           <Text style={styles.Avijo}>UHI avijo</Text>
//           <Text style={styles.phoneText}>{phoneNumber}</Text>

//           {/* Drawer Items with Images */}
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/abha.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Abha</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/order.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Order & Booking</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/address.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Addresses</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/reminder.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Reminder</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/ambulance1.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Ambulance</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/help.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Help & Support</Text>
//           </TouchableOpacity>

//           {/* Logout Button */}
//           <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
//           <Image source={require("./assets/logout1.jpeg")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Logout</Text>
//           </TouchableOpacity>

//           {/* Settings Icon at Bottom Right */}
//           {/* <TouchableOpacity
//             style={styles.settingsIcon}
//             onPress={() => navigation.navigate("Settings")}
//           >
//             <Feather name="settings" size={24} color="#000" />
//           </TouchableOpacity> */}
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { flexDirection: "row", alignItems: "center", padding: 15 },
//   locationContainer: { flexDirection: "row", marginLeft: 20 },
//   locationText: { fontSize: 16, fontWeight: "bold", fontFamily: "Gilroy-Medium" },
//   messageContainer: { alignItems: "center", padding: 20 },
//   serviceText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "green",
//     textAlign: "center",
//     marginVertical: 20,
//     fontFamily: "Gilroy-Bold",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 10,
//     fontFamily: "Gilroy-Bold",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     fontFamily: "Gilroy-Medium",
//   },
//   locationIcon: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   changeLocationButton: {
//     backgroundColor: "#0097DB",
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     width: "100%",
//     alignItems: "center",
//   },
//   changeLocationButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     fontFamily: "Gilroy-Bold",
//   },
//   drawer: {
//     position: "absolute",
//     left: 0,
//     width: "100%", // Updated to full width
//     backgroundColor: "#fff",
//     padding: 20,
//     height: "100%",
//   },
//   profilePic: {
//     width: 70,
//     height: 70,
//     borderRadius: 40,
//     marginTop: 20,
//   },
//   phoneText: {
//     marginVertical: 10,
//     fontSize: 16,
//     fontFamily: "Gilroy-Medium",
//   },
//   drawerItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderColor: "#eee",
//     marginLeft: 5,
//     marginBottom: 5,
//   },
//   drawerIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 10,
//   },
//   drawerItemText: {
//     fontSize: 20,
//     fontFamily: "Lato",
//   },
//   Avijo: {
//     fontFamily: "Lato",
//     fontSize: 24,
//   },
//   settingsIcon: {
//     position: "absolute",
//     right: 20,
//     bottom: 20,
//   },
//   logoutButton: {
//     backgroundColor: "#0097DB",
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     width: "100%",
//     alignItems: "center",
//   },
//   logoutButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     fontFamily: "Gilroy-Bold",
//   },
//   phoneText: { marginVertical: 10, fontSize: 16 },
//   locationContainer: { 
//     flexDirection: "row", 
//     marginLeft: 20,
//     maxWidth: '80%', // or whatever percentage works for your layout
//     alignItems: 'center'
//   },
//   locationText: { 
//     fontSize: 16, 
//     fontWeight: "bold", 
//     fontFamily: "Gilroy-Medium",
//     flexShrink: 1 // ensures text will shrink to fit container
//   },
// });



















// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Modal,
// } from "react-native";
// import * as Location from "expo-location";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";

// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degrees) => degrees * (Math.PI / 180);
//   const R = 6371;
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) *
//       Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// export default function HomeScreen({ navigation, route }) {
//   const [locationName, setLocationName] = useState("Detecting location...");
//   const [isDeliverable, setIsDeliverable] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [profileImage, setProfileImage] = useState(null);
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [userFullName, setUserFullName] = useState("");
//   const [userPhoneNumber, setUserPhoneNumber] = useState("");

//   const serviceAreaCenter = { latitude: 23.2599, longitude: 77.4126 };
//   const serviceRadius = 20;

//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         const name = await AsyncStorage.getItem('userFullName');
//         const number = await AsyncStorage.getItem('userMobileNumber');
//         if (name) setUserFullName(name);
//         if (number) setUserPhoneNumber(number);
//       } catch (error) {
//         console.error('Error loading user data:', error);
//       }
//     };
    
//     loadUserData();

//     if (!route.params?.selectedLocation) {
//       (async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert("Permission Denied", "Location permission is required.");
//           setLoading(false);
//           return;
//         }
//         let location = await Location.getCurrentPositionAsync({});
//         checkServiceAvailability(location.coords);
//       })();
//     }
//   }, []);

//   useEffect(() => {
//     if (route.params?.selectedLocation) {
//       checkServiceAvailability(route.params.selectedLocation);
//     }
//   }, [route.params?.selectedLocation]);

//   const checkServiceAvailability = async (coords) => {
//     const { latitude, longitude } = coords;
//     let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//     if (geocode.length > 0) {
//       const { city, region, country, name, street } = geocode[0];
//       setLocationName(`${name || street}, ${city || region}, ${country}`);
//       const distance = haversineDistance(
//         latitude,
//         longitude,
//         serviceAreaCenter.latitude,
//         serviceAreaCenter.longitude
//       );
//       setIsDeliverable(distance <= serviceRadius);
//     }
//     setLoading(false);
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });
//     if (!result.canceled) setProfileImage(result.assets[0].uri);
//   };

//   const handleLogout = async () => {
//     await AsyncStorage.clear();
//     navigation.replace("LoginScreen");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => setDrawerVisible(true)}>
//           <Ionicons name="person-circle" size={40} color="#000" />
//         </TouchableOpacity>
        
//         <View style={styles.locationContainer}>
//           <MaterialIcons name="location-on" size={20} color="#000" />
//           <Text 
//             style={styles.locationText} 
//             numberOfLines={1} 
//             ellipsizeMode="tail"
//           >
//             {locationName}
//           </Text>
//         </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
//       ) : isDeliverable ? (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
//           <Text style={styles.serviceText}>Service available in your area!</Text>
//         </View>
//       ) : (
//         <View style={styles.messageContainer}>
//           <Image source={require("./assets/location4.png")} style={styles.locationIcon} />
//           <Text style={styles.title}>Location not serviceable</Text>
//           <Text style={styles.subtitle}>Our team is working tirelessly to bring 10</Text>
//           <Text style={styles.subtitle}>minutes healthcare delivery at your doorstep.</Text>
//           <TouchableOpacity
//             style={styles.changeLocationButton}
//             onPress={() => navigation.navigate("LocationScreen")}
//           >
//             <Text style={styles.changeLocationButtonText}>Try Changing Location</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <Modal visible={drawerVisible} animationType="slide" transparent>
//         <View style={styles.drawer}>
//           <TouchableOpacity onPress={() => setDrawerVisible(false)}>
//             <Ionicons name="close" size={30} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={pickImage}>
//             <Image
//               source={profileImage ? { uri: profileImage } : require("./assets/Profile.png")}
//               style={styles.profilePic}
//             />
//           </TouchableOpacity>
//           {/* <Text style={styles.Avijo}>UHI avijo</Text> */}
//           {userFullName ? (
//             <Text style={styles.Avijo}>{userFullName}</Text>
//           ) : null}
//           <Text style={styles.phoneText}>{userPhoneNumber}</Text>

//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/abha.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Abha</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/order.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Order & Booking</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/address.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Addresses</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/reminder.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Reminder</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/ambulance1.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Ambulance</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.drawerItem}>
//             <Image source={require("./assets/help.png")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Help & Support</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
//             <Image source={require("./assets/logout1.jpeg")} style={styles.drawerIcon} />
//             <Text style={styles.drawerItemText}>Logout</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { flexDirection: "row", alignItems: "center", padding: 15 },
//   locationContainer: { 
//     flexDirection: "row", 
//     marginLeft: 10,
//     maxWidth: '60%',
//     alignItems: 'center'
//   },
//   locationText: { 
//     fontSize: 16, 
//     fontWeight: "bold", 
//     fontFamily: "Gilroy-Medium",
//     flexShrink: 1
//   },
//   messageContainer: { alignItems: "center", padding: 20 },
//   serviceText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "green",
//     textAlign: "center",
//     marginVertical: 20,
//     fontFamily: "Gilroy-Bold",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 10,
//     fontFamily: "Gilroy-Bold",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//     fontFamily: "Gilroy-Medium",
//   },
//   locationIcon: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   changeLocationButton: {
//     backgroundColor: "#0097DB",
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     width: "100%",
//     alignItems: "center",
//   },
//   changeLocationButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     fontFamily: "Gilroy-Bold",
//   },
//   drawer: {
//     position: "absolute",
//     left: 0,
//     width: "100%",
//     backgroundColor: "#fff",
//     padding: 20,
//     height: "100%",
//   },
//   profilePic: {
//     width: 70,
//     height: 70,
//     borderRadius: 40,
//     marginTop: 20,
//   },
//   userInfoText: {
//     fontSize: 20,
//     fontFamily: "Lato",
//     marginTop: 5,
//   },
//   phoneText: {
//     fontSize: 16,
//     fontFamily: "Gilroy-Medium",
//     marginBottom: 20,
//   },
//   drawerItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderColor: "#eee",
//     marginLeft: 5,
//     marginBottom: 5,
//   },
//   drawerIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 10,
//   },
//   drawerItemText: {
//     fontSize: 20,
//     fontFamily: "Lato",
//   },
//   Avijo: {
//     fontFamily: "Lato",
//     fontSize: 24,
//     marginTop: 10,
//   },
// });













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
  //       const response = await fetch(`${BASE_URL}/user/get-user`, {
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
            <Image source={require("./assets/logout1.jpeg")} style={styles.drawerIcon} />
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
    marginTop: 20,
  },
});