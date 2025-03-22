// import React, { useState } from "react";
// import { View, Text, Button, FlatList, Alert, StyleSheet } from "react-native";
// import * as Location from "expo-location";

// const LocationScreen = () => {
//   const [location, setLocation] = useState(null);
//   const [savedLocations, setSavedLocations] = useState([]);

//   const getCurrentLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission Denied", "Allow location access to use this feature.");
//       return;
//     }

//     let currentLocation = await Location.getCurrentPositionAsync({});
//     setLocation({
//       latitude: currentLocation.coords.latitude,
//       longitude: currentLocation.coords.longitude,
//     });
//   };

//   const saveLocation = () => {
//     if (location) {
//       setSavedLocations([...savedLocations, location]);
//     } else {
//       Alert.alert("Error", "No location to save. Please get your current location first.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Location Tracker</Text>
//       <Button title="Get Current Location" onPress={getCurrentLocation} />
      
//       {location && (
//         <Text style={styles.locationText}>
//           Current Location: {location.latitude}, {location.longitude}
//         </Text>
//       )}

//       <Button title="Save Location" onPress={saveLocation} />
      
//       <FlatList
//         data={savedLocations}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item, index }) => (
//           <Text style={styles.locationItem}>
//             {`${index + 1}: ${item.latitude}, ${item.longitude}`}
//           </Text>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   locationText: {
//     fontSize: 16,
//     marginVertical: 10,
//     textAlign: "center",
//   },
//   locationItem: {
//     fontSize: 14,
//     padding: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
// });

// export default LocationScreen;

















// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from "react-native";
// import * as Location from "expo-location";

// const LocationScreen = () => {
//   const [location, setLocation] = useState(null);
//   const [savedLocations, setSavedLocations] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const getCurrentLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission Denied", "Allow location access to use this feature.");
//       return;
//     }

//     let currentLocation = await Location.getCurrentPositionAsync({});
//     setLocation({
//       latitude: currentLocation.coords.latitude,
//       longitude: currentLocation.coords.longitude,
//     });
//   };

//   const saveLocation = () => {
//     if (location) {
//       setSavedLocations([...savedLocations, location]);
//     } else {
//       Alert.alert("Error", "No location to save. Please get your current location first.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <Text style={styles.header}>Your Location</Text>

//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search a new address"
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />

//       {/* Current Location Section */}
//       <View style={styles.currentLocationContainer}>
//         <Text style={styles.sectionTitle}>Current Location</Text>
//         {location ? (
//           <Text style={styles.locationText}>
//             {`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
//           </Text>
//         ) : (
//           <Text style={styles.locationText}>No location fetched yet.</Text>
//         )}
//         <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
//           <Text style={styles.buttonText}>Use Current Location (GPS)</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Saved Locations Section */}
//       <Text style={styles.sectionTitle}>Saved Locations</Text>
//       <FlatList
//         data={savedLocations}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item, index }) => (
//           <View style={styles.locationCard}>
//             <Text style={styles.locationCardText}>
//               {`${index + 1}: Latitude: ${item.latitude}, Longitude: ${item.longitude}`}
//             </Text>
//           </View>
//         )}
//       />

//       {/* Save Location Button */}
//       <TouchableOpacity style={styles.button} onPress={saveLocation}>
//         <Text style={styles.buttonText}>Save Current Location</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#333",
//   },
//   searchInput: {
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 20,
//     backgroundColor: "#fff",
//   },
//   currentLocationContainer: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#333",
//   },
//   locationText: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 10,
//   },
//   locationCard: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   locationCardText: {
//     fontSize: 14,
//     color: "#333",
//   },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default LocationScreen;















// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
//   Image,
// } from "react-native";
// import * as Location from "expo-location";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons"; // For GPS icon

// const LocationScreen = () => {
//   const navigation = useNavigation();
//   const [location, setLocation] = useState(null);
//   const [currentLocationName, setCurrentLocationName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch current location using GPS
//   const getCurrentLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission Denied", "Allow location access to use this feature.");
//       return;
//     }

//     setLoading(true);
//     try {
//       let currentLocation = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = currentLocation.coords;
//       setLocation({ latitude, longitude });

//       // Reverse geocode to get the address name
//       const address = await reverseGeocode(latitude, longitude);
//       setCurrentLocationName(address);
//     } catch (error) {
//       console.error("Error fetching location:", error);
//       Alert.alert("Error", "Failed to fetch location. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reverse geocode coordinates to get the address name
//   const reverseGeocode = async (latitude, longitude) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
//       );
//       const data = await response.json();
//       if (data.results && data.results.length > 0) {
//         return data.results[0].formatted_address;
//       }
//     } catch (error) {
//       console.error("Error reverse geocoding:", error);
//     }
//     return "Unknown Location";
//   };

//   // Handle search for addresses
//   const handleSearch = async () => {
//     if (!searchQuery) {
//       Alert.alert("Error", "Please enter a location to search.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
//           searchQuery
//         )}&key=YOUR_GOOGLE_MAPS_API_KEY`
//       );
//       const data = await response.json();
//       if (data.predictions && data.predictions.length > 0) {
//         setSearchResults(data.predictions);
//       } else {
//         setSearchResults([]);
//         Alert.alert("No Results", "No locations found for your search.");
//       }
//     } catch (error) {
//       console.error("Error searching location:", error);
//       Alert.alert("Error", "Failed to search location. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle selecting a location from search results
//   const handleSelectLocation = async (placeId) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=YOUR_GOOGLE_MAPS_API_KEY`
//       );
//       const data = await response.json();
//       if (data.result) {
//         const { formatted_address } = data.result;

//         // Navigate back to HomeScreen with the selected location
//         navigation.navigate("HomeScreen", { selectedLocation: formatted_address });
//       }
//     } catch (error) {
//       console.error("Error fetching location details:", error);
//       Alert.alert("Error", "Failed to fetch location details. Please try again.");
//     }
//   };

//   // Fetch current location on component mount
//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search for an address"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//           <Text style={styles.buttonText}>Search</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Current Location Section */}
//       <TouchableOpacity style={styles.currentLocationContainer} onPress={getCurrentLocation}>
//         <Ionicons name="locate" size={24} color="#007bff" />
//         <View style={styles.currentLocationTextContainer}>
//           <Text style={styles.currentLocationLabel}>Use Current Location</Text>
//           <Text style={styles.currentLocationName} numberOfLines={1}>
//             {currentLocationName || "Fetching location..."}
//           </Text>
//         </View>
//         {loading && <ActivityIndicator size="small" color="#007bff" />}
//       </TouchableOpacity>

//       {/* Search Results */}
//       {searchResults.length > 0 && (
//         <FlatList
//           data={searchResults}
//           keyExtractor={(item) => item.place_id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.resultItem}
//               onPress={() => handleSelectLocation(item.place_id)}
//             >
//               <Text style={styles.resultText}>{item.description}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//   },
//   searchInput: {
//     flex: 1,
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//   },
//   searchButton: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 10,
//     marginLeft: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   currentLocationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   currentLocationTextContainer: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   currentLocationLabel: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   currentLocationName: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 5,
//   },
//   resultItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   resultText: {
//     fontSize: 16,
//     color: "#333",
//   },
// });

// export default LocationScreen;





















// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import * as Location from "expo-location";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";

// const LocationScreen = () => {
//   const navigation = useNavigation();
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [currentLocationName, setCurrentLocationName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [savedLocations, setSavedLocations] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch current location using GPS
//   const getCurrentLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission Denied", "Allow location access to use this feature.");
//       return;
//     }

//     setLoading(true);
//     try {
//       let location = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = location.coords;
//       setCurrentLocation({ latitude, longitude });

//       // Reverse geocode to get the address name
//       const address = await reverseGeocode(latitude, longitude);
//       setCurrentLocationName(address);
//     } catch (error) {
//       console.error("Error fetching location:", error);
//       Alert.alert("Error", "Failed to fetch location. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reverse geocode coordinates to get the address name
//   const reverseGeocode = async (latitude, longitude) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCkWyB3a0UJS91wJntXf1OC4HV-qhqgb8I`
//       );
//       const data = await response.json();
//       if (data.results && data.results.length > 0) {
//         return data.results[0].formatted_address;
//       }
//     } catch (error) {
//       console.error("Error reverse geocoding:", error);
//     }
//     return "Unknown Location";
//   };

//   // Handle search for addresses
//   const handleSearch = async () => {
//     if (!searchQuery) {
//       Alert.alert("Error", "Please enter a location to search.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
//           searchQuery
//         )}&key=AIzaSyCkWyB3a0UJS91wJntXf1OC4HV-qhqgb8I`
//       );
//       const data = await response.json();
//       if (data.predictions && data.predictions.length > 0) {
//         setSearchResults(data.predictions);
//       } else {
//         setSearchResults([]);
//         Alert.alert("No Results", "No locations found for your search.");
//       }
//     } catch (error) {
//       console.error("Error searching location:", error);
//       Alert.alert("Error", "Failed to search location. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle selecting a location from search results
//   const handleSelectLocation = async (placeId) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyCkWyB3a0UJS91wJntXf1OC4HV-qhqgb8I`
//       );
//       const data = await response.json();
//       if (data.result) {
//         const { formatted_address, geometry } = data.result;
//         const location = {
//           name: formatted_address,
//           latitude: geometry.location.lat,
//           longitude: geometry.location.lng,
//         };

//         // Save the selected location
//         await saveLocation(location);

//         // Navigate back to HomeScreen with the selected location
//         navigation.navigate("HomeScreen", { selectedLocation: location });
//       }
//     } catch (error) {
//       console.error("Error fetching location details:", error);
//       Alert.alert("Error", "Failed to fetch location details. Please try again.");
//     }
//   };

//   // Save location to AsyncStorage
//   const saveLocation = async (location) => {
//     try {
//       const savedLocations = await AsyncStorage.getItem("savedLocations");
//       const locations = savedLocations ? JSON.parse(savedLocations) : [];
//       locations.push(location);
//       await AsyncStorage.setItem("savedLocations", JSON.stringify(locations));
//       setSavedLocations(locations);
//     } catch (error) {
//       console.error("Error saving location:", error);
//     }
//   };

//   // Fetch saved locations from AsyncStorage
//   const fetchSavedLocations = async () => {
//     try {
//       const savedLocations = await AsyncStorage.getItem("savedLocations");
//       if (savedLocations) {
//         setSavedLocations(JSON.parse(savedLocations));
//       }
//     } catch (error) {
//       console.error("Error fetching saved locations:", error);
//     }
//   };

//   // Fetch current location and saved locations on component mount
//   useEffect(() => {
//     getCurrentLocation();
//     fetchSavedLocations();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search for an address"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//           <Text style={styles.buttonText}>Search</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Current Location Section */}
//       <TouchableOpacity style={styles.currentLocationContainer} onPress={getCurrentLocation}>
//         <Ionicons name="locate" size={24} color="#007bff" />
//         <View style={styles.currentLocationTextContainer}>
//           <Text style={styles.currentLocationLabel}>Use Current Location</Text>
//           <Text style={styles.currentLocationName} numberOfLines={1}>
//             {currentLocationName || "Fetching location..."}
//           </Text>
//         </View>
//         {loading && <ActivityIndicator size="small" color="#007bff" />}
//       </TouchableOpacity>

//       {/* Saved Locations */}
//       <Text style={styles.sectionTitle}>Saved Locations</Text>
//       <FlatList
//         data={savedLocations}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.savedLocationItem}
//             onPress={() => navigation.navigate("HomeScreen", { selectedLocation: item })}
//           >
//             <Text style={styles.savedLocationText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />

//       {/* Search Results */}
//       {searchResults.length > 0 && (
//         <FlatList
//           data={searchResults}
//           keyExtractor={(item) => item.place_id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.resultItem}
//               onPress={() => handleSelectLocation(item.place_id)}
//             >
//               <Text style={styles.resultText}>{item.description}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//   },
//   searchInput: {
//     flex: 1,
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//   },
//   searchButton: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 10,
//     marginLeft: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   currentLocationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   currentLocationTextContainer: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   currentLocationLabel: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   currentLocationName: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 5,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   savedLocationItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   savedLocationText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   resultItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   resultText: {
//     fontSize: 16,
//     color: "#333",
//   },
// });

// export default LocationScreen;
















// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import * as Location from "expo-location";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";

// const LocationScreen = () => {
//   const navigation = useNavigation();
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [currentLocationName, setCurrentLocationName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [savedLocations, setSavedLocations] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch current location using GPS
//   const getCurrentLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission Denied", "Allow location access to use this feature.");
//       return;
//     }

//     setLoading(true);
//     try {
//       let location = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = location.coords;
//       setCurrentLocation({ latitude, longitude });

//       // Reverse geocode to get the address name
//       const address = await reverseGeocode(latitude, longitude);
//       setCurrentLocationName(address);
//     } catch (error) {
//       console.error("Error fetching location:", error);
//       Alert.alert("Error", "Failed to fetch location. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reverse geocode coordinates to get the address name
//   const reverseGeocode = async (latitude, longitude) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCkWyB3a0UJS91wJntXf1OC4HV-qhqgb8I`
//       );
//       const data = await response.json();
//       if (data.results && data.results.length > 0) {
//         return data.results[0].formatted_address;
//       }
//     } catch (error) {
//       console.error("Error reverse geocoding:", error);
//     }
//     return "Unknown Location";
//   };

//   // Handle search for addresses
//   const handleSearch = async () => {
//     if (!searchQuery) {
//       Alert.alert("Error", "Please enter a location to search.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
//           searchQuery
//         )}&key=AIzaSyCkWyB3a0UJS91wJntXf1OC4HV-qhqgb8I`
//       );
//       const data = await response.json();
//       if (data.predictions && data.predictions.length > 0) {
//         setSearchResults(data.predictions);
//       } else {
//         setSearchResults([]);
//         Alert.alert("No Results", "No locations found for your search.");
//       }
//     } catch (error) {
//       console.error("Error searching location:", error);
//       Alert.alert("Error", "Failed to search location. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle selecting a location from search results
//   const handleSelectLocation = async (placeId) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyCkWyB3a0UJS91wJntXf1OC4HV-qhqgb8I`
//       );
//       const data = await response.json();
//       if (data.result) {
//         const { formatted_address, geometry } = data.result;
//         const location = {
//           name: formatted_address,
//           latitude: geometry.location.lat,
//           longitude: geometry.location.lng,
//         };

//         // Save the selected location
//         await saveLocation(location);

//         // Navigate back to HomeScreen with the selected location
//         navigation.navigate("HomeScreen", { selectedLocation: location });
//       }
//     } catch (error) {
//       console.error("Error fetching location details:", error);
//       Alert.alert("Error", "Failed to fetch location details. Please try again.");
//     }
//   };

//   // Save location to AsyncStorage
//   const saveLocation = async (location) => {
//     try {
//       const savedLocations = await AsyncStorage.getItem("savedLocations");
//       const locations = savedLocations ? JSON.parse(savedLocations) : [];
//       locations.push(location);
//       await AsyncStorage.setItem("savedLocations", JSON.stringify(locations));
//       setSavedLocations(locations);
//     } catch (error) {
//       console.error("Error saving location:", error);
//     }
//   };

//   // Fetch saved locations from AsyncStorage
//   const fetchSavedLocations = async () => {
//     try {
//       const savedLocations = await AsyncStorage.getItem("savedLocations");
//       if (savedLocations) {
//         setSavedLocations(JSON.parse(savedLocations));
//       }
//     } catch (error) {
//       console.error("Error fetching saved locations:", error);
//     }
//   };

//   // Fetch current location and saved locations on component mount
//   useEffect(() => {
//     getCurrentLocation();
//     fetchSavedLocations();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search a new address"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//           <Ionicons name="search" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {/* Current Location Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Your Location</Text>
//         <TouchableOpacity style={styles.locationItem} onPress={getCurrentLocation}>
//           <Ionicons name="locate" size={24} color="#007bff" />
//           <View style={styles.locationTextContainer}>
//             <Text style={styles.locationLabel}>Current location</Text>
//             <Text style={styles.locationName} numberOfLines={1}>
//               {currentLocationName || "Using GPS"}
//             </Text>
//           </View>
//           {loading && <ActivityIndicator size="small" color="#007bff" />}
//         </TouchableOpacity>
//       </View>

//       {/* Saved Locations Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Saved Locations</Text>
//         <FlatList
//           data={savedLocations}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.locationItem}
//               onPress={() => navigation.navigate("HomeScreen", { selectedLocation: item })}
//             >
//               <Ionicons name="location" size={24} color="#007bff" />
//               <View style={styles.locationTextContainer}>
//                 <Text style={styles.locationLabel}>Other</Text>
//                 <Text style={styles.locationName} numberOfLines={1}>
//                   {item.name}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       </View>

//       {/* Search Results */}
//       {searchResults.length > 0 && (
//         <FlatList
//           data={searchResults}
//           keyExtractor={(item) => item.place_id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.resultItem}
//               onPress={() => handleSelectLocation(item.place_id)}
//             >
//               <Text style={styles.resultText}>{item.description}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   searchInput: {
//     flex: 1,
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//   },
//   searchButton: {
//     marginLeft: 10,
//     padding: 10,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   locationItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   locationTextContainer: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   locationLabel: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   locationName: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 5,
//   },
//   resultItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   resultText: {
//     fontSize: 16,
//     color: "#333",
//   },
// });

// export default LocationScreen;




















// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import * as Location from "expo-location";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";

// const LocationScreen = () => {
//   const navigation = useNavigation();
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [currentLocationName, setCurrentLocationName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [savedLocations, setSavedLocations] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch current location using GPS
//   const getCurrentLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission Denied", "Allow location access to use this feature.");
//       return;
//     }

//     setLoading(true);
//     try {
//       let location = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = location.coords;
//       setCurrentLocation({ latitude, longitude });

//       // Reverse geocode to get the address name
//       const address = await reverseGeocode(latitude, longitude);
//       setCurrentLocationName(address);
//     } catch (error) {
//       console.error("Error fetching location:", error);
//       Alert.alert("Error", "Failed to fetch location. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reverse geocode coordinates to get the address name
//   const reverseGeocode = async (latitude, longitude) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCkWyB3a0UJS91wJntXf1OC4HV-qhqgb8I`
//       );
//       const data = await response.json();
//       if (data.results && data.results.length > 0) {
//         return data.results[0].formatted_address;
//       }
//     } catch (error) {
//       console.error("Error reverse geocoding:", error);
//     }
//     return "Unknown Location";
//   };

//   // Handle search for addresses
//   const handleSearch = async () => {
//     if (!searchQuery) {
//       Alert.alert("Error", "Please enter a location to search.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
//           searchQuery
//         )}&key=AIzaSyCkWyB3a0UJS91wJntXf1OC4HV-qhqgb8I`
//       );
//       const data = await response.json();
//       if (data.predictions && data.predictions.length > 0) {
//         setSearchResults(data.predictions);
//       } else {
//         setSearchResults([]);
//         Alert.alert("No Results", "No locations found for your search.");
//       }
//     } catch (error) {
//       console.error("Error searching location:", error);
//       Alert.alert("Error", "Failed to search location. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle selecting a location from search results
//   const handleSelectLocation = async (placeId) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyCkWyB3a0UJS91wJntXf1OC4HV-qhqgb8I`
//       );
//       const data = await response.json();
//       if (data.result) {
//         const { formatted_address, geometry } = data.result;
//         const location = {
//           name: formatted_address,
//           latitude: geometry.location.lat,
//           longitude: geometry.location.lng,
//         };

//         // Navigate back to HomeScreen with the selected location
//         navigation.navigate("HomeScreen", { selectedLocation: location });
//       }
//     } catch (error) {
//       console.error("Error fetching location details:", error);
//       Alert.alert("Error", "Failed to fetch location details. Please try again.");
//     }
//   };

//   // Fetch saved locations from AsyncStorage
//   const fetchSavedLocations = async () => {
//     try {
//       const savedLocations = await AsyncStorage.getItem("savedLocations");
//       if (savedLocations) {
//         setSavedLocations(JSON.parse(savedLocations));
//       }
//     } catch (error) {
//       console.error("Error fetching saved locations:", error);
//     }
//   };

//   // Fetch current location and saved locations on component mount
//   useEffect(() => {
//     getCurrentLocation();
//     fetchSavedLocations();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search a new address"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//           <Ionicons name="search" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {/* Current Location Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Your Location</Text>
//         <TouchableOpacity style={styles.locationItem} onPress={getCurrentLocation}>
//           <Ionicons name="locate" size={24} color="#007bff" />
//           <View style={styles.locationTextContainer}>
//             <Text style={styles.locationLabel}>Current location</Text>
//             <Text style={styles.locationName} numberOfLines={1}>
//               {currentLocationName || "Using GPS"}
//             </Text>
//           </View>
//           {loading && <ActivityIndicator size="small" color="#007bff" />}
//         </TouchableOpacity>
//       </View>

//       {/* Saved Locations Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Saved Locations</Text>
//         <FlatList
//           data={savedLocations}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.locationItem}
//               onPress={() => navigation.navigate("HomeScreen", { selectedLocation: item })}
//             >
//               <Ionicons name="location" size={24} color="#007bff" />
//               <View style={styles.locationTextContainer}>
//                 <Text style={styles.locationLabel}>Other</Text>
//                 <Text style={styles.locationName} numberOfLines={1}>
//                   {item.name}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       </View>

//       {/* Search Results */}
//       {searchResults.length > 0 && (
//         <FlatList
//           data={searchResults}
//           keyExtractor={(item) => item.place_id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.resultItem}
//               onPress={() => handleSelectLocation(item.place_id)}
//             >
//               <Text style={styles.resultText}>{item.description}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   searchInput: {
//     flex: 1,
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//   },
//   searchButton: {
//     marginLeft: 10,
//     padding: 10,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   locationItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   locationTextContainer: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   locationLabel: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   locationName: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 5,
//   },
//   resultItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   resultText: {
//     fontSize: 16,
//     color: "#333",
//   },
// });

// export default LocationScreen;
















// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Alert,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import * as Location from "expo-location";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";

// const LocationScreen = () => {
//   const navigation = useNavigation();
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [currentLocationName, setCurrentLocationName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [savedLocations, setSavedLocations] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch current location using GPS
//   const getCurrentLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission Denied", "Allow location access to use this feature.");
//       return;
//     }

//     setLoading(true);
//     try {
//       let location = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = location.coords;
//       setCurrentLocation({ latitude, longitude });

//       // Reverse geocode to get the address name
//       const address = await reverseGeocode(latitude, longitude);
//       setCurrentLocationName(address);

//       // Pass the current location to HomeScreen
//       navigation.navigate("HomeScreen", {
//         selectedLocation: { latitude, longitude, name: address },
//       });
//     } catch (error) {
//       console.error("Error fetching location:", error);
//       Alert.alert("Error", "Failed to fetch location. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reverse geocode coordinates to get the address name
//   const reverseGeocode = async (latitude, longitude) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCkWyB3a0UJS91wJntXf1OC4HV-qhqgb8I`
//       );
//       const data = await response.json();
//       if (data.results && data.results.length > 0) {
//         return data.results[0].formatted_address;
//       }
//     } catch (error) {
//       console.error("Error reverse geocoding:", error);
//     }
//     return "Unknown Location";
//   };

//   // Handle search for addresses
//   const handleSearch = async () => {
//     if (!searchQuery) {
//       Alert.alert("Error", "Please enter a location to search.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
//           searchQuery
//         )}&key=AIzaSyCkWyB3a0UJS91wJntXf1OC4HV-qhqgb8I`
//       );
//       const data = await response.json();
//       if (data.predictions && data.predictions.length > 0) {
//         setSearchResults(data.predictions);
//       } else {
//         setSearchResults([]);
//         Alert.alert("No Results", "No locations found for your search.");
//       }
//     } catch (error) {
//       console.error("Error searching location:", error);
//       Alert.alert("Error", "Failed to search location. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle selecting a location from search results
//   const handleSelectLocation = async (placeId) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyCkWyB3a0UJS91wJntXf1OC4HV-qhqgb8I`
//       );
//       const data = await response.json();
//       if (data.result) {
//         const { formatted_address, geometry } = data.result;
//         const location = {
//           name: formatted_address,
//           latitude: geometry.location.lat,
//           longitude: geometry.location.lng,
//         };

//         // Navigate back to HomeScreen with the selected location
//         navigation.navigate("HomeScreen", { selectedLocation: location });
//       }
//     } catch (error) {
//       console.error("Error fetching location details:", error);
//       Alert.alert("Error", "Failed to fetch location details. Please try again.");
//     }
//   };

//   // Fetch saved locations from AsyncStorage
//   const fetchSavedLocations = async () => {
//     try {
//       const savedLocations = await AsyncStorage.getItem("savedLocations");
//       if (savedLocations) {
//         setSavedLocations(JSON.parse(savedLocations));
//       }
//     } catch (error) {
//       console.error("Error fetching saved locations:", error);
//     }
//   };

//   // Fetch current location and saved locations on component mount
//   useEffect(() => {
//     fetchSavedLocations();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search a new address"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//           <Ionicons name="search" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {/* Search Results with Opacity */}
//       {searchResults.length > 0 && (
//         <View style={styles.resultsContainer}>
//           <FlatList
//             data={searchResults}
//             keyExtractor={(item) => item.place_id}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={styles.resultItem}
//                 onPress={() => handleSelectLocation(item.place_id)}
//               >
//                 <Text style={styles.resultText}>{item.description}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       )}

//       {/* Current Location Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Your Location</Text>
//         <TouchableOpacity style={styles.locationItem} onPress={getCurrentLocation}>
//           <Ionicons name="locate" size={24} color="#007bff" />
//           <View style={styles.locationTextContainer}>
//             <Text style={styles.locationLabel}>Current location</Text>
//             <Text style={styles.locationName} numberOfLines={1}>
//               {currentLocationName || "Using GPS"}
//             </Text>
//           </View>
//           {loading && <ActivityIndicator size="small" color="#007bff" />}
//         </TouchableOpacity>
//       </View>

//       {/* Saved Locations Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Saved Locations</Text>
//         <FlatList
//           data={savedLocations}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.locationItem}
//               onPress={() => navigation.navigate("HomeScreen", { selectedLocation: item })}
//             >
//               <Ionicons name="location" size={24} color="#007bff" />
//               <View style={styles.locationTextContainer}>
//                 <Text style={styles.locationLabel}>Other</Text>
//                 <Text style={styles.locationName} numberOfLines={1}>
//                   {item.name}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   searchInput: {
//     flex: 1,
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//   },
//   searchButton: {
//     marginLeft: 10,
//     padding: 10,
//   },
//   resultsContainer: {
//     backgroundColor: "rgba(255, 255, 255, 0.9)",
//     borderRadius: 10,
//     marginTop: 10,
//     maxHeight: 200,
//   },
//   resultItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   resultText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   locationItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   locationTextContainer: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   locationLabel: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   locationName: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 5,
//   },
// });

// export default LocationScreen;














import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const LocationScreen = () => {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentLocationName, setCurrentLocationName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch current location using GPS
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Allow location access to use this feature.");
      return;
    }

    setLoading(true);
    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });

      // Reverse geocode to get the address name
      const address = await reverseGeocode(latitude, longitude);
      setCurrentLocationName(address);

      // Pass the current location to HomeScreen
      navigation.navigate("HomeScreen", {
        selectedLocation: { latitude, longitude, name: address },
      });
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Failed to fetch location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reverse geocode coordinates to get the address name
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCkWyB3a0UJS91wJntXf1OC4HV-qhqgb8I`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
    return "Unknown Location";
  };

  // Handle search for addresses as the user types
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          query
        )}&key=AIzaSyCkWyB3a0UJS91wJntXf1OC4HV-qhqgb8I`
      );
      const data = await response.json();
      if (data.predictions && data.predictions.length > 0) {
        setSearchResults(data.predictions);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching location:", error);
      Alert.alert("Error", "Failed to search location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle selecting a location from search results
  const handleSelectLocation = async (placeId) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyCkWyB3a0UJS91wJntXf1OC4HV-qhqgb8I`
      );
      const data = await response.json();
      if (data.result) {
        const { formatted_address, geometry } = data.result;
        const location = {
          name: formatted_address,
          latitude: geometry.location.lat,
          longitude: geometry.location.lng,
        };

        // Navigate back to HomeScreen with the selected location
        navigation.navigate("HomeScreen", { selectedLocation: location });
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
      Alert.alert("Error", "Failed to fetch location details. Please try again.");
    }
  };

  // Fetch saved locations from AsyncStorage
  const fetchSavedLocations = async () => {
    try {
      const savedLocations = await AsyncStorage.getItem("savedLocations");
      if (savedLocations) {
        setSavedLocations(JSON.parse(savedLocations));
      }
    } catch (error) {
      console.error("Error fetching saved locations:", error);
    }
  };

  // Fetch current location and saved locations on component mount
  useEffect(() => {
    fetchSavedLocations();
  }, []);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter your location"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Search Results with Opacity */}
      {searchResults.length > 0 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleSelectLocation(item.place_id)}
              >
                <Text style={styles.resultText}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Current Location Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Location</Text>
        <TouchableOpacity style={styles.locationItem} onPress={getCurrentLocation}>
          <Ionicons name="locate" size={24} color="#007bff" />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>Current location</Text>
            <Text style={styles.locationName} numberOfLines={1}>
              {currentLocationName || "Using GPS"}
            </Text>
          </View>
          {loading && <ActivityIndicator size="small" color="#007bff" />}
        </TouchableOpacity>
      </View>

      {/* Saved Locations Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Locations</Text>
        <FlatList
          data={savedLocations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.locationItem}
              onPress={() => navigation.navigate("HomeScreen", { selectedLocation: item })}
            >
              <Ionicons name="location" size={24} color="#007bff" />
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationLabel}>Other</Text>
                <Text style={styles.locationName} numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  resultsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    marginTop: 10,
    maxHeight: 200,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultText: {
    fontSize: 16,
    color: "#333",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  locationTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  locationLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  locationName: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default LocationScreen;