import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DashboardScreen = ({ navigation }) => {
  const menuItems = [
    { id: 1, title: 'Abha', icon: 'document-text-outline', screen: null },
    { id: 2, title: 'Order & Booking', icon: 'cart-outline', screen: 'OrdersScreen' },
    { id: 3, title: 'Addresses', icon: 'location-outline', screen: 'AddressListScreen' },
    { id: 4, title: 'Reminder', icon: 'alarm-outline', screen: null },
    { id: 5, title: 'Ambulance', icon: 'car-outline', screen: null },
    { id: 6, title: 'Help & Support', icon: 'help-circle-outline', screen: 'SupportScreen' },
    { id: 7, title: 'Logout', icon: 'log-out-outline', screen: null }
  ];

  const handleMenuPress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    } else if (item.title === 'Logout') {
      // Handle logout
      navigation.navigate('LoginScreen');
    } else {
      // For features that are not yet implemented
      alert('This feature is coming soon!');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={40} color="#666" />
        </View>
        <Text style={styles.name}>Arpita Yadav</Text>
        <Text style={styles.phone}>7007460688</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item)}
          >
            <Ionicons name={item.icon} size={24} color="#333" style={styles.menuIcon} />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  closeButton: {
    padding: 15,
    alignSelf: 'flex-end',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DashboardScreen;