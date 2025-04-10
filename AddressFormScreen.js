import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';

const AddressFormScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    type: 'Home',
    orderFor: 'myself',
    flatNo: '',
    floor: '',
    locality: '', // Removed default value
    landmark: '',
    name: '',
    phoneNumber: ''
  });

  const handleSubmit = () => {
    if (!formData.flatNo || !formData.name || !formData.phoneNumber || !formData.locality) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const newAddress = {
      id: Date.now(),
      type: formData.type,
      current: false,
      address: `${formData.flatNo}${formData.floor ? ', ' + formData.floor : ''}, ${formData.locality}${formData.landmark ? ' (Near ' + formData.landmark + ')' : ''}`,
      name: formData.name,
      phoneNumber: formData.phoneNumber
    };

    // Changed navigation destination to match the screen name in your navigation stack
    navigation.navigate('AddressListScreen', { newAddress });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Who you are ordering for?</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity 
          style={[styles.radioButton, formData.orderFor === 'myself' && styles.radioButtonSelected]}
          onPress={() => setFormData({...formData, orderFor: 'myself'})}
        >
          <Text style={[styles.radioText, formData.orderFor === 'myself' && styles.radioTextSelected]}>
            Myself
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.radioButton, formData.orderFor === 'someoneElse' && styles.radioButtonSelected]}
          onPress={() => setFormData({...formData, orderFor: 'someoneElse'})}
        >
          <Text style={[styles.radioText, formData.orderFor === 'someoneElse' && styles.radioTextSelected]}>
            Someone else
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Save address as</Text>
      <View style={styles.addressTypeGroup}>
        {['Home', 'Office', 'Other'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.addressTypeButton, formData.type === type && styles.addressTypeButtonSelected]}
            onPress={() => setFormData({...formData, type: type})}
          >
            <Text style={[styles.addressTypeText, formData.type === type && styles.addressTypeTextSelected]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Flat / House no / Building name"
        value={formData.flatNo}
        onChangeText={(text) => setFormData({...formData, flatNo: text})}
      />

      <TextInput
        style={styles.input}
        placeholder="Floor (optional)"
        value={formData.floor}
        onChangeText={(text) => setFormData({...formData, floor: text})}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your locality, city"
        value={formData.locality}
        onChangeText={(text) => setFormData({...formData, locality: text})}
      />

      <TextInput
        style={styles.input}
        placeholder="Nearby landmark (optional)"
        value={formData.landmark}
        onChangeText={(text) => setFormData({...formData, landmark: text})}
      />

      <Text style={styles.sectionTitle}>Enter your details for seamless delivery experience</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.phoneInputContainer}>
          <View style={styles.countryCode}>
            <Text>+91(IND)</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            value={formData.phoneNumber}
            onChangeText={(text) => setFormData({...formData, phoneNumber: text})}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Save Address</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  radioText: {
    color: '#666',
  },
  radioTextSelected: {
    color: '#fff',
  },
  addressTypeGroup: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addressTypeButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  addressTypeButtonSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#2E7D32',
  },
  addressTypeText: {
    color: '#666',
  },
  addressTypeTextSelected: {
    color: '#2E7D32',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  localityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 15,
  },
  changeButton: {
    color: '#2E7D32',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  phoneInputContainer: {
    flexDirection: 'row',
  },
  countryCode: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
  },
  saveButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddressFormScreen;