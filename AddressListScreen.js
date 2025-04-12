import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddressListScreen = ({ navigation, route }) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (route.params?.newAddress) {
      setAddresses(prevAddresses => [...prevAddresses, route.params.newAddress]);
    }
  }, [route.params?.newAddress]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Addresses</Text>
      </View>

      <ScrollView style={styles.container}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddressFormScreen')}
        >
          <Text style={styles.addButtonText}>+ Add New Address</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Your saved addresses</Text>

        {addresses.map((address, index) => (
          <View key={index} style={styles.addressCard}>
            <View style={styles.addressIconContainer}>
              <Ionicons 
                name={address.type === 'Home' ? 'home' : 'location'} 
                size={24} 
                color="white" 
              />
            </View>
            <View style={styles.addressContent}>
              <View style={styles.addressHeader}>
                <Text style={styles.addressType}>
                  {address.type}
                  {address.current && <Text style={styles.currentTag}> You are here</Text>}
                </Text>
                {address.distance && (
                  <Text style={styles.distanceText}>{address.distance} KM away</Text>
                )}
              </View>
              <Text style={styles.addressText}>{address.address}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="share-social-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {addresses.length === 0 && (
          <View style={styles.shareContainer}>
            <View style={styles.shareIconContainer}>
              <Ionicons name="share-social-outline" size={24} color="#666" />
            </View>
            <Text style={styles.shareText}>
              Now share your addresses with friends and family
            </Text>
            <TouchableOpacity style={styles.closeShare}>
              <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2E7D32',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2E7D32',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
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
    padding: 16,
  },
  addressCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addressIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addressContent: {
    flex: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  currentTag: {
    fontSize: 12,
    color: '#2E7D32',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    margin: 16,
    borderRadius: 8,
  },
  shareIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  shareText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  closeShare: {
    padding: 4,
  },
});

export default AddressListScreen;