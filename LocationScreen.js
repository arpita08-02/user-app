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

      // Save to recent locations
      await saveLocation({ latitude, longitude, name: address });

      // Pass to HomeScreen
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

  // Save location to AsyncStorage
  const saveLocation = async (location) => {
    try {
      const saved = await AsyncStorage.getItem("savedLocations");
      const savedLocations = saved ? JSON.parse(saved) : [];
      
      // Check if location already exists
      const exists = savedLocations.some(
        loc => loc.latitude === location.latitude && 
              loc.longitude === location.longitude
      );
      
      if (!exists) {
        const updatedLocations = [location, ...savedLocations];
        await AsyncStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
        setSavedLocations(updatedLocations);
      }
    } catch (error) {
      console.error("Error saving location:", error);
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

  // Handle search for addresses
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

        // Save to recent locations
        await saveLocation(location);

        // Navigate to HomeScreen
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
      const saved = await AsyncStorage.getItem("savedLocations");
      if (saved) {
        setSavedLocations(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error fetching saved locations:", error);
    }
  };

  // Handle selecting a saved location
  const handleSelectSavedLocation = (location) => {
    navigation.navigate("HomeScreen", { selectedLocation: location });
  };

  // Load saved locations on mount
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

      {/* Search Results */}
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
              onPress={() => handleSelectSavedLocation(item)}
            >
              <Ionicons name="location" size={24} color="#007bff" />
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationLabel}>Saved Location</Text>
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

// ... [keep your existing styles unchanged] ...
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

export default LocationScreen;