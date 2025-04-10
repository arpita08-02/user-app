import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DashboardScreen = ({ navigation }) => {
  const menuItems = [
    { id: 1, title: 'Abha', icon: 'document-text-outline' },
    { id: 2, title: 'Order & Booking', icon: 'cart-outline' },
    { id: 3, title: 'Addresses', icon: 'location-outline', screen: 'AddressList' },
    { id: 4, title: 'Reminder', icon: 'alarm-outline' },
    { id: 5, title: 'Ambulance', icon: 'car-outline' },
    { id: 6, title: 'Help & Support', icon: 'help-circle-outline' },
    { id: 7, title: 'Logout', icon: 'log-out-outline' }
  ];

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
            onPress={() => item.screen ? navigation.navigate(item.screen) : null}
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
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
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
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    marginRight: 15,
    width: 24,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DashboardScreen;