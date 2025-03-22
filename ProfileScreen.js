// import React from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

// export default function ProfileScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       {/* Profile Header */}
//       <View style={styles.profileHeader}>
//         <Image
//           source={{ uri: "https://via.placeholder.com/150" }}
//           style={styles.profileImage}
//         />
//         <View style={styles.profileTextContainer}>
//           <Text style={styles.profileName}>UHI Avijo</Text>
//         </View>
//         <TouchableOpacity onPress={() => console.log("Edit Profile")}> 
//           <MaterialIcons name="chevron-right" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>
      
//       {/* Menu Options */}
//       <View style={styles.menuContainer}>
//         <MenuItem icon="file-alt" text="ABHA" />
//         <MenuItem icon="list-alt" text="Order & Booking" />
//         <MenuItem icon="map-marker-alt" text="Addresses" />
//         <MenuItem icon="bell" text="Reminders" />
//         <MenuItem icon="ambulance" text="Ambulance" badgeText="NEW" />
//         <MenuItem icon="question-circle" text="Support and Help" />
//       </View>
//     </View>
//   );
// }

// const MenuItem = ({ icon, text, badgeText }) => {
//   return (
//     <TouchableOpacity style={styles.menuItem}>
//       <FontAwesome5 name={icon} size={18} color="#000" style={styles.menuIcon} />
//       <Text style={styles.menuText}>{text}</Text>
//       {badgeText && <Text style={styles.badge}>{badgeText}</Text>}
//       <MaterialIcons name="chevron-right" size={20} color="#000" />
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 40,
//     paddingHorizontal: 20,
//   },
//   profileHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   profileTextContainer: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   profileName: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   menuContainer: {
//     marginTop: 20,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   menuIcon: {
//     width: 30,
//   },
//   menuText: {
//     flex: 1,
//     fontSize: 16,
//   },
//   badge: {
//     backgroundColor: "red",
//     color: "white",
//     fontSize: 12,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 10,
//     overflow: "hidden",
//     marginRight: 10,
//   },
// });
















// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
// import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function ProfileScreen() {
//   const [profileImage, setProfileImage] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const storedImage = await AsyncStorage.getItem("profileImage");
//       if (storedImage) {
//         setProfileImage(storedImage);
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setProfileImage(result.assets[0].uri);
//       await AsyncStorage.setItem("profileImage", result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Profile Panel Screen</Text>
//       <TouchableOpacity style={styles.profileSection} onPress={pickImage}>
//         {profileImage ? (
//           <Image source={{ uri: profileImage }} style={styles.profileImage} />
//         ) : (
//           <FontAwesome5 name="user-circle" size={50} color="#888" style={styles.profileImage} />
//         )}
//         <Text style={styles.userName}>UHI Avijo</Text>
//         <Ionicons name="chevron-forward" size={20} color="#000" />
//       </TouchableOpacity>

//       <View style={styles.menuSection}>
//         <MenuItem icon="file-alt" title="ABHA" />
//         <MenuItem icon="box" title="Order & Booking" />
//         <MenuItem icon="map-marker-alt" title="Addresses" />
//         <MenuItem icon="clock" title="Reminders" />
//         <MenuItem icon="ambulance" title="Ambulance" newTag />
//         <MenuItem icon="question-circle" title="Support and Help" />
//       </View>
//     </View>
//   );
// }

// const MenuItem = ({ icon, title, newTag }) => (
//   <TouchableOpacity style={styles.menuItem}>
//     <FontAwesome5 name={icon} size={18} color="#555" />
//     <Text style={styles.menuText}>{title}</Text>
//     {newTag && <Text style={styles.newTag}>NEW</Text>}
//     <Ionicons name="chevron-forward" size={20} color="#888" />
//   </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 40,
//     alignItems: "center",
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#007AFF",
//     marginBottom: 10,
//   },
//   profileSection: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     backgroundColor: "#f8f8f8",
//     borderRadius: 10,
//     width: "90%",
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   userName: {
//     flex: 1,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   menuSection: {
//     marginTop: 20,
//     width: "90%",
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   menuText: {
//     flex: 1,
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   newTag: {
//     color: "red",
//     fontSize: 12,
//     fontWeight: "bold",
//     marginRight: 5,
//   },
// });






















// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
// import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";

// const Drawer = createDrawerNavigator();

// function ProfileScreen({ navigation }) {
//   const [profileImage, setProfileImage] = useState(null);
//   const [userName, setUserName] = useState("User");
//   const [userMobile, setUserMobile] = useState("Not Available");

//   useEffect(() => {
//     (async () => {
//       const storedImage = await AsyncStorage.getItem("profileImage");
//       if (storedImage) setProfileImage(storedImage);

//       const storedName = await AsyncStorage.getItem("userName");
//       if (storedName) setUserName(storedName);

//       const storedMobile = await AsyncStorage.getItem("userMobile");
//       if (storedMobile) setUserMobile(storedMobile);
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setProfileImage(result.assets[0].uri);
//       await AsyncStorage.setItem("profileImage", result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.header}>Profile Panel Screen</Text>
//         <TouchableOpacity onPress={() => navigation.openDrawer()}>
//           <Ionicons name="settings" size={24} color="#007AFF" />
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity style={styles.profileSection} onPress={pickImage}>
//         {profileImage ? (
//           <Image source={{ uri: profileImage }} style={styles.profileImage} />
//         ) : (
//           <FontAwesome5 name="user-circle" size={50} color="#888" style={styles.profileImage} />
//         )}
//         <Text style={styles.userName}>{userName}</Text>
//         <Ionicons name="chevron-forward" size={20} color="#000" />
//       </TouchableOpacity>
//     </View>
//   );
// }

// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={styles.drawerHeader}>
//         <FontAwesome5 name="user-circle" size={50} color="#888" />
//         <Text style={styles.drawerUserName}>{props.userName}</Text>
//         <Text style={styles.drawerUserMobile}>{props.userMobile}</Text>
//       </View>
//       <DrawerItemList {...props} />
//     </DrawerContentScrollView>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         drawerContent={(props) => (
//           <CustomDrawerContent {...props} userName="User Name" userMobile="1234567890" />
//         )}
//       >
//         <Drawer.Screen name="Profile" component={ProfileScreen} />
//         <Drawer.Screen name="Update" component={() => <Text>Update Screen</Text>} />
//         <Drawer.Screen name="Orders" component={() => <Text>Orders Screen</Text>} />
//         <Drawer.Screen name="Address" component={() => <Text>Address Screen</Text>} />
//         <Drawer.Screen name="Customer Support & FAQ" component={() => <Text>Support Screen</Text>} />
//         <Drawer.Screen name="Refer & Earn" component={() => <Text>Refer Screen</Text>} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 40,
//     alignItems: "center",
//   },
//   headerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "90%",
//     alignItems: "center",
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#007AFF",
//   },
//   profileSection: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     backgroundColor: "#f8f8f8",
//     borderRadius: 10,
//     width: "90%",
//     marginTop: 10,
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   userName: {
//     flex: 1,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   drawerHeader: {
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#f8f8f8",
//   },
//   drawerUserName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 5,
//   },
//   drawerUserMobile: {
//     fontSize: 14,
//     color: "#666",
//   },
// });






















import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Modal } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(null);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const storedImage = await AsyncStorage.getItem("profileImage");
      if (storedImage) {
        setProfileImage(storedImage);
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      await AsyncStorage.setItem("profileImage", result.assets[0].uri);
    }
  };

  const toggleSettings = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Panel Screen</Text>
      <TouchableOpacity style={styles.profileSection} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <FontAwesome5 name="user-circle" size={50} color="#888" style={styles.profileImage} />
        )}
        <Text style={styles.userName}>UHI Avijo</Text>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>

      <View style={styles.menuSection}>
        <MenuItem icon="file-alt" title="ABHA" />
        <MenuItem icon="box" title="Order & Booking" />
        <MenuItem icon="map-marker-alt" title="Addresses" />
        <MenuItem icon="clock" title="Reminders" />
        <MenuItem icon="ambulance" title="Ambulance" newTag />
        <MenuItem icon="question-circle" title="Support and Help" />
      </View>

      {/* Settings Icon */}
      <TouchableOpacity style={styles.settingsIcon} onPress={toggleSettings}>
        <Ionicons name="settings" size={30} color="#007AFF" />
      </TouchableOpacity>

      {/* Settings Drawer (Modal) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSettingsVisible}
        onRequestClose={() => setIsSettingsVisible(false)}
      >
        <View style={styles.settingsDrawer}>
          <View style={styles.settingsHeader}>
            <Text style={styles.settingsHeaderText}>Settings</Text>
            <TouchableOpacity onPress={toggleSettings}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.settingsContent}>
            <Text style={styles.settingsName}>John Doe</Text>
            <Text style={styles.settingsPhone}>+1 234 567 890</Text>
            <TouchableOpacity style={styles.settingsItem}>
              <Text style={styles.settingsItemText}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <Text style={styles.settingsItemText}>Refer a Friend</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <Text style={styles.settingsItemText}>FAQ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const MenuItem = ({ icon, title, newTag }) => (
  <TouchableOpacity style={styles.menuItem}>
    <FontAwesome5 name={icon} size={18} color="#555" />
    <Text style={styles.menuText}>{title}</Text>
    {newTag && <Text style={styles.newTag}>NEW</Text>}
    <Ionicons name="chevron-forward" size={20} color="#888" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 10,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    width: "90%",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  menuSection: {
    marginTop: 20,
    width: "90%",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  newTag: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 5,
  },
  settingsIcon: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  settingsDrawer: {
    flex: 1,
    width: "70%",
    backgroundColor: "#fff",
    marginLeft: "30%",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  settingsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingsHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  settingsContent: {
    padding: 15,
  },
  settingsName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  settingsPhone: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  settingsItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingsItemText: {
    fontSize: 16,
  },
});