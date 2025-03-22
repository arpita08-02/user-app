// import React, { useState, useEffect } from "react";
// import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
// import { Ionicons, FontAwesome, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function SettingsScreen({ navigation }) {
//   const [phoneNumber, setPhoneNumber] = useState("");

//   useEffect(() => {
//     (async () => {
//       try {
//         const storedPhone = await AsyncStorage.getItem("phoneNumber");
//         if (storedPhone) {
//           setPhoneNumber(storedPhone);
//         } else {
//           setPhoneNumber("Not Available");
//         }
//       } catch (error) {
//         console.error("Error retrieving phone number:", error);
//       }
//     })();
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Settings</Text>
//       </View>

//       {/* Profile Section */}
//       <View style={styles.profileSection}>
//         <Image source={require("./assets/Profile.png")} style={styles.profileImage} />
//         <View style={styles.profileText}>
//           <Text style={styles.userName}>Souvik De</Text>
//           <Text style={styles.phoneNumber}>{phoneNumber}</Text>
//         </View>
//       </View>

//       {/* Refer & Earn Card */}
//       <View style={styles.referCard}>
//         <Text style={styles.referTitle}>Earn <Text style={{ color: "#007AFF" }}>₹200</Text> for every friend you refer</Text>
//         <Text style={styles.referText}>On your friend's first order, you get ₹200 and they get ₹50</Text>
//         <TouchableOpacity style={styles.referButton}>
//           <Text style={styles.referButtonText}>Invite from contacts</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Update Notification */}
//       <View style={styles.updateCard}>
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <MaterialCommunityIcons name="update" size={22} color="#000" />
//           <Text style={styles.updateText}> Update Available</Text>
//         </View>
//         <Text style={styles.updateDesc}>Enjoy a more seamless shopping experience</Text>
//       </View>

//       {/* Settings Options */}
//       <TouchableOpacity style={styles.menuItem}>
//         <FontAwesome name="shopping-bag" size={20} color="#007AFF" />
//         <Text style={styles.menuText}>Orders</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.menuItem}>
//         <FontAwesome name="gift" size={20} color="#007AFF" />
//         <Text style={styles.menuText}>Refer & Earn</Text>
//         <Text style={styles.newBadge}>NEW</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.menuItem}>
//         <Feather name="help-circle" size={20} color="#007AFF" />
//         <Text style={styles.menuText}>Customer Support & FAQ</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.menuItem}>
//         <Ionicons name="location-outline" size={20} color="#007AFF" />
//         <Text style={styles.menuText}>Addresses</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.menuItem}>
//         <FontAwesome name="money" size={20} color="#007AFF" />
//         <Text style={styles.menuText}>Refunds</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 20,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginLeft: 10,
//   },

//   profileSection: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   profileImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//   },
//   profileText: {
//     marginLeft: 15,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   phoneNumber: {
//     fontSize: 14,
//     color: "#555",
//   },

//   referCard: {
//     backgroundColor: "#EAF4FF",
//     padding: 20,
//     margin: 15,
//     borderRadius: 10,
//   },
//   referTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   referText: {
//     fontSize: 14,
//     color: "#555",
//     marginVertical: 5,
//   },
//   referButton: {
//     backgroundColor: "#007AFF",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//     alignItems: "center",
//   },
//   referButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },

//   updateCard: {
//     backgroundColor: "#f5f5f5",
//     padding: 15,
//     margin: 15,
//     borderRadius: 10,
//   },
//   updateText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   updateDesc: {
//     fontSize: 14,
//     color: "#555",
//   },

//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   menuText: {
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   newBadge: {
//     fontSize: 12,
//     color: "#fff",
//     backgroundColor: "#007AFF",
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 5,
//     marginLeft: 10,
//     fontWeight: "bold",
//   },
// });


















import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { Ionicons, FontAwesome, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Base URL for the backend
const BASE_URL = "https://avijobackend-production.up.railway.app";

export default function SettingsScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  // Fetch phone number from AsyncStorage
  useEffect(() => {
    (async () => {
      try {
        const storedPhone = await AsyncStorage.getItem("phoneNumber");
        if (storedPhone) {
          setPhoneNumber(storedPhone);
        } else {
          setPhoneNumber("Not Available");
        }
      } catch (error) {
        console.error("Error retrieving phone number:", error);
      }
    })();
  }, []);

  // Function to delete the user's account
  const deleteAccount = async () => {
    try {
      // Get the user's phone number from AsyncStorage
      const phoneNumber = await AsyncStorage.getItem("phoneNumber");

      if (!phoneNumber) {
        Alert.alert("Error", "Phone number not found.");
        return;
      }

      // Call the backend API to delete the account
      const response = await axios.delete(`${BASE_URL}/user/delete-user`, {
        data: { mobileNumber: phoneNumber }, // Send the phone number in the request body
      });

      if (response.status === 200) {
        // Clear AsyncStorage
        await AsyncStorage.removeItem("phoneNumber");

        // Navigate to CreateAccountScreen
        navigation.replace("CreateAccountScreen");
      } else {
        Alert.alert("Error", "Failed to delete account. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      Alert.alert("Error", "An error occurred while deleting your account.");
    }
  };

  // Confirm account deletion
  const confirmDelete = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: deleteAccount, style: "destructive" },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require("./assets/profile.jpeg")} style={styles.profileImage} />
        <View style={styles.profileText}>
          <Text style={styles.userName}>Souvik De</Text>
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        </View>
      </View>

      {/* Refer & Earn Card */}
      <View style={styles.referCard}>
        <Text style={styles.referTitle}>Earn <Text style={{ color: "#007AFF" }}>₹200</Text> for every friend you refer</Text>
        <Text style={styles.referText}>On your friend's first order, you get ₹200 and they get ₹50</Text>
        <TouchableOpacity style={styles.referButton}>
          <Text style={styles.referButtonText}>Invite from contacts</Text>
        </TouchableOpacity>
      </View>

      {/* Update Notification */}
      <View style={styles.updateCard}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons name="update" size={22} color="#000" />
          <Text style={styles.updateText}> Update Available</Text>
        </View>
        <Text style={styles.updateDesc}>Enjoy a more seamless shopping experience</Text>
      </View>

      {/* Settings Options */}
      <TouchableOpacity style={styles.menuItem}>
        <FontAwesome name="shopping-bag" size={20} color="#007AFF" />
        <Text style={styles.menuText}>Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <FontAwesome name="gift" size={20} color="#007AFF" />
        <Text style={styles.menuText}>Refer & Earn</Text>
        <Text style={styles.newBadge}>NEW</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Feather name="help-circle" size={20} color="#007AFF" />
        <Text style={styles.menuText}>Customer Support & FAQ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="location-outline" size={20} color="#007AFF" />
        <Text style={styles.menuText}>Addresses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <FontAwesome name="money" size={20} color="#007AFF" />
        <Text style={styles.menuText}>Refunds</Text>
      </TouchableOpacity>

      {/* Delete Account Button */}
      <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileText: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  phoneNumber: {
    fontSize: 14,
    color: "#555",
  },

  referCard: {
    backgroundColor: "#EAF4FF",
    padding: 20,
    margin: 15,
    borderRadius: 10,
  },
  referTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  referText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  referButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  referButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  updateCard: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    margin: 15,
    borderRadius: 10,
  },
  updateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  updateDesc: {
    fontSize: 14,
    color: "#555",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
  newBadge: {
    fontSize: 12,
    color: "#fff",
    backgroundColor: "#007AFF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginLeft: 10,
    fontWeight: "bold",
  },

  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});