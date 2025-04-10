// The complete OrdersScreen code you provided remains exactly the same> Souvik:
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

const OrdersScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Diagnostics');

  const getEmptyStateContent = () => {
    switch (activeTab) {
      case 'Orders':
        return {
          title: 'No orders placed!',
          subtitle: 'Currently you don\'t have any orders.',
          buttonText: 'Order Now',
          message: 'Ordering feature coming soon!'
        };
      case 'Diagnostics':
        return {
          title: 'No diagnostics booked',
          subtitle: 'You haven\'t booked any diagnostics test yet.',
          buttonText: 'Book Now',
          message: 'Diagnostic booking will be available soon!'
        };
      case 'Consultation':
        return {
          title: 'No consultation scheduled',
          subtitle: 'You haven\'t scheduled any consultation yet.',
          buttonText: 'Schedule Now',
          message: 'Consultation scheduling under development!'
        };
      default:
        return {
          title: '',
          subtitle: '',
          buttonText: '',
          message: ''
        };
    }
  };

  const handleButtonPress = (message) => {
    Alert.alert(
      'Under Development',
      message,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const renderEmptyState = () => {
    const content = getEmptyStateContent();
    
    return (
      <View style={styles.noContentContainer}>
        <View style={styles.contentWrapper}>
          <Image
            source={require('./assets/no-orders.png')}
            style={styles.noContentImage}
          />
          <Text style={styles.noContentTitle}>{content.title}</Text>
          <Text style={styles.noContentSubtitle}>
            {content.subtitle}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.orderButton} 
          onPress={() => handleButtonPress(content.message)}
        >
          <Text style={styles.orderButtonText}>{content.buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('./assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders and Booking</Text>
      </View>

      <View style={styles.spacer} />

      <View style={styles.tabContainer}>
        {['Orders', 'Diagnostics', 'Consultation'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderEmptyState()}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 22,
  },
  spacer: {
    height: 16,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#666',
  },
  tabText: {
    fontSize: 15,
    color: '#666',
  },
  activeTabText: {
    color: '#333',
    fontWeight: '500',
  },
  noContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -60, 
  },
  noContentImage: {
    width: 240,
    height: 240,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  noContentTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  noContentSubtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  orderButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
    marginBottom:"15%"
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrdersScreen;
