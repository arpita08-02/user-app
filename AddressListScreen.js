import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddressListScreen = ({ navigation, route }) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (route.params?.newAddress) {
      setAddresses(prevAddresses => [...prevAddresses, route.params.newAddress]);
    }
  }, [route.params?.newAddress]);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddressForm')}
      >
        <Text style={styles.addButtonText}>+ Add New Address</Text>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </TouchableOpacity>

      {addresses.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>Your saved addresses</Text>
          {addresses.map((address) => (
            <View key={address.id} style={styles.addressCard}>
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={address.type === 'Home' ? 'home' : 'location'} 
                  size={24} 
                  color="#666" 
                />
              </View>
              <View style={styles.addressContent}>
                <View style={styles.addressHeader}>
                  <Text style={styles.addressType}>{address.type}</Text>
                </View>
                <Text style={styles.addressText}>{address.address}</Text>
                <Text style={styles.nameText}>{address.name}</Text>
                <Text style={styles.phoneText}>{address.phoneNumber}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="share-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No addresses saved yet</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addButtonText: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    padding: 15,
  },
  addressCard: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  addressContent: {
    flex: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  addressType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentTag: {
    fontSize: 12,
    color: '#2E7D32',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#666',
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
  },
  nameText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  phoneText: {
    fontSize: 14,
    color: '#666',
  },
});

export default AddressListScreen;
