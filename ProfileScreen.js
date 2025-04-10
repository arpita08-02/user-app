import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const menuItems = [
  {
    id: 1,
    name: 'My Addresses',
    icon: 'map-marker-alt',
    checked: false,
    screen: 'AddressForm'  // Changed from 'AddressList' to 'AddressForm'
  },
  {
    id: 2,
    name: 'My Orders',
    icon: 'shopping-bag',
    checked: false,
    screen: 'Orders'
  },
  {
    id: 3,
    name: 'Settings',
    icon: 'cog',
    checked: false,
    screen: 'Settings'
  }
];

const ProfileScreen = ({ navigation }) => {
  const [userFullName, setUserFullName] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const [userInfo, setUserInfo] = useState({
    fullName: '',  // Remove any default value
    mobileNumber: '',
    email: ''
  });
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('userFullName');
        const phone = await AsyncStorage.getItem('userMobileNumber');
        const image = await AsyncStorage.getItem('profileImage');
        
        if (name) setUserFullName(name);
        if (phone) setUserPhoneNumber(phone);
        if (image) setProfileImage(image);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userFullName');
        const storedNumber = await AsyncStorage.getItem('userMobileNumber');
        const storedEmail = await AsyncStorage.getItem('userEmail');

        setUserInfo({
          fullName: storedName || '',
          mobileNumber: storedNumber || '',
          email: storedEmail || ''
        });
      } catch (error) {
        console.error('Error loading user info:', error);
      }
    };
  
    loadUserInfo();
  }, []);

  const handleNavigation = (screenName) => {
    if (screenName === 'AddressForm') {
      navigation.navigate('AddressForm', {
        onSave: (address) => {
          navigation.navigate('AddressList', { newAddress: address });
        }
      });
    } else if (screenName === 'Orders') {
      navigation.navigate('Orders');
    } else {
      alert('This feature is coming soon!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <Image 
              source={profileImage ? { uri: profileImage } : require('./assets/Profile.png')}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{userFullName || 'User Name'}</Text>
              <Text style={styles.phone}>{userPhoneNumber || 'Phone Number'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => handleNavigation(item.screen)}
            >
              <FontAwesome5 name={item.icon} size={18} color="#000" style={styles.menuIcon} />
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    padding: 20,
    paddingLeft: 15, // Reduced left padding
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Changed from 'center' to 'flex-start'
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  userInfo: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start', // Added this to align left
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Gilroy-Bold',
    textAlign: 'left', // Explicitly set to left
  },
  phone: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    fontFamily: 'Gilroy-Medium',
    textAlign: 'left', // Explicitly set to left
  },
  menuContainer: {
    padding: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    width: 30,
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
  },
});

export default ProfileScreen;