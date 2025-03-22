// import React, { useState } from "react";
// import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
// import MapView, { Marker, UrlTile } from "react-native-maps";

// export default function MapScreen({ route, navigation }) {
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   // Handle map press to select a location
//   const handleMapPress = (event) => {
//     const { coordinate } = event.nativeEvent;
//     setSelectedLocation(coordinate);
//   };

//   // Confirm location selection
//   const confirmLocation = () => {
//     if (selectedLocation) {
//       route.params.onLocationChange(selectedLocation);
//       navigation.goBack();
//     } else {
//       Alert.alert("Error", "Please select a location on the map.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 23.2599, // Default center (Bhopal, India)
//           longitude: 77.4126,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         onPress={handleMapPress}
//       >
//         {/* OpenStreetMap Tile Layer */}
//         <UrlTile
//           urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           maximumZ={19}
//         />

//         {/* Marker for selected location */}
//         {selectedLocation && <Marker coordinate={selectedLocation} />}
//       </MapView>

//       {/* Confirm Location Button */}
//       <TouchableOpacity style={styles.confirmButton} onPress={confirmLocation}>
//         <Text style={styles.confirmButtonText}>Confirm Location</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   confirmButton: {
//     position: "absolute",
//     bottom: 20,
//     alignSelf: "center",
//     backgroundColor: "#FF4673",
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 5,
//   },
//   confirmButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });
























import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";

export default function MapScreen({ route, navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Handle map press to select a location
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  // Confirm location selection
  const confirmLocation = () => {
    if (selectedLocation) {
      if (route.params?.onLocationChange) {
        route.params.onLocationChange(selectedLocation);
      }
      navigation.goBack();
    } else {
      Alert.alert("Error", "Please select a location on the map.");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 23.2599, // Default center (Bhopal, India)
          longitude: 77.4126,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {/* OpenStreetMap Tile Layer */}
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
        />

        {/* Marker for selected location */}
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>

      {/* Confirm Location Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={confirmLocation}>
        <Text style={styles.confirmButtonText}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  confirmButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#FF4673",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
