import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddressFormScreen = ({ navigation }) => {
  const [orderingFor, setOrderingFor] = useState('Myself');
  const [addressType, setAddressType] = useState('');
  const [buildingInfo, setBuildingInfo] = useState('');
  const [floor, setFloor] = useState('');
  const [locality, setLocality] = useState('Mahalaxmi Nagar , Indore');
  const [landmark, setLandmark] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSaveAddress = () => {
    const newAddress = {
      id: Date.now(),
      type: addressType || 'Others',
      address: `${buildingInfo}${floor ? ', ' + floor : ''}, ${locality}${landmark ? ', Near ' + landmark : ''}`,
      name: name,
      phoneNumber: mobileNumber,
    };

    navigation.navigate('AddressListScreen', { newAddress });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enter complete address</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Who you are ordering for?</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity 
              style={styles.radioButton}
              onPress={() => setOrderingFor('Myself')}
            >
              <View style={[
                styles.radio,
                orderingFor === 'Myself' && styles.radioSelected
              ]} />
              <Text style={styles.radioText}>Myself</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.radioButton}
              onPress={() => setOrderingFor('Someone else')}
            >
              <View style={[
                styles.radio,
                orderingFor === 'Someone else' && styles.radioSelected
              ]} />
              <Text style={styles.radioText}>Someone else</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Save address as</Text>
          <View style={styles.addressTypeContainer}>
            <TouchableOpacity 
              style={[styles.addressTypeButton, addressType === 'Home' && styles.addressTypeSelected]}
              onPress={() => setAddressType('Home')}
            >
              <Ionicons 
                name="home-outline" 
                size={20} 
                color={addressType === 'Home' ? 'white' : '#333'} 
              />
              <Text style={[
                styles.addressTypeText,
                addressType === 'Home' && styles.addressTypeTextSelected
              ]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.addressTypeButton, addressType === 'Office' && styles.addressTypeSelected]}
              onPress={() => setAddressType('Office')}
            >
              <Ionicons 
                name="business-outline" 
                size={20} 
                color={addressType === 'Office' ? 'white' : '#333'} 
              />
              <Text style={[
                styles.addressTypeText,
                addressType === 'Office' && styles.addressTypeTextSelected
              ]}>Office</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.addressTypeButton, addressType === 'Other' && styles.addressTypeSelected]}
              onPress={() => setAddressType('Other')}
            >
              <Ionicons 
                name="location-outline" 
                size={20} 
                color={addressType === 'Other' ? 'white' : '#333'} 
              />
              <Text style={[
                styles.addressTypeText,
                addressType === 'Other' && styles.addressTypeTextSelected
              ]}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Flat / House no / Building name"
          value={buildingInfo}
          onChangeText={setBuildingInfo}
        />

        <TextInput
          style={styles.input}
          placeholder="Floor (optional)"
          value={floor}
          onChangeText={setFloor}
        />

        <View style={styles.localitySection}>
          <Text style={styles.localityLabel}>Area/Sector/Locality</Text>
          <View style={styles.localityContainer}>
            <TextInput
              style={styles.localityInput}
              value={locality}
              onChangeText={setLocality}
            />
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Nearby landmark ( optional)"
          value={landmark}
          onChangeText={setLandmark}
        />

        <View style={styles.section}>
          <Text style={styles.detailsTitle}>
            Enter your details for seamless delivery experience
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />

          <View style={styles.phoneContainer}>
            <TouchableOpacity style={styles.countryCodeButton}>
              <Text style={styles.countryCodeText}>+91(IND)</Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
            <TextInput
              style={styles.phoneInput}
              placeholder="Mobile Number"
              keyboardType="numeric"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              maxLength={10}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSaveAddress}
        >
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableOpacity>
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 24,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#666',
    marginRight: 8,
  },
  radioSelected: {
    borderColor: '#2E7D32',
    backgroundColor: '#2E7D32',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  addressTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  addressTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    gap: 8,
  },
  addressTypeSelected: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  addressTypeText: {
    fontSize: 14,
    color: '#333',
  },
  addressTypeTextSelected: {
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  localitySection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  localityLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  localityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  localityInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  changeButton: {
    paddingHorizontal: 16,
  },
  changeButtonText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailsTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#2E7D32',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddressFormScreen;