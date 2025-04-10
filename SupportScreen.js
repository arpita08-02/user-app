import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, StatusBar, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from './components/GlobalTheme';
import Icon from 'react-native-vector-icons/Ionicons';

const SupportScreen = () => {
  const navigation = useNavigation();

  // Dummy chat messages
  const messages = [
    { id: 1, text: 'Hello, how can I help you today?', sender: 'agent', time: '9:41 AM' },
    { id: 2, text: 'I have a question about my recent order', sender: 'user', time: '9:42 AM' },
    { id: 3, text: 'Could you please provide your order number?', sender: 'agent', time: '9:43 AM' },
    { id: 4, text: 'My order number is #12345', sender: 'user', time: '9:44 AM' },
    { id: 5, text: 'Thank you! I can see your order. What specific information do you need?', sender: 'agent', time: '9:45 AM' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.blue} barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support</Text>
        <TouchableOpacity style={styles.callButton}>
          <Icon name="call" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
        {messages.map((message) => (
          <View 
            key={message.id} 
            style={[
              styles.messageBubble, 
              message.sender === 'user' ? styles.userMessage : styles.agentMessage
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.messageTime}>{message.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write your message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Icon name="send" size={24} color={colors.blue} />
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.blue,
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 3,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  callButton: {
    padding: 8,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatContent: {
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.blue,
    borderBottomRightRadius: 5,
  },
  agentMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  userMessageText: {
    color: 'white',
  },
  messageTime: {
    fontSize: 10,
    color: '#999',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  userMessageTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SupportScreen;