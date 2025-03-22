import React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
        />
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.notificationsList}>
        {/* Notification Item */}
        <View style={styles.notificationItem}>
          <Text style={styles.notificationTitle}>It's Michael Owen's birthday today</Text>
          <Text style={styles.notificationTime}>1 Day ago • 2:00 PM</Text>
        </View>

        {/* Notification Item */}
        <View style={styles.notificationItem}>
          <Text style={styles.notificationTitle}>Recent Appointments with Mauris</Text>
          <Text style={styles.notificationTime}>1 Day ago • 2:00 PM</Text>
        </View>

        {/* Notification Item */}
        <View style={styles.notificationItem}>
          <Text style={styles.notificationTitle}>Recent Appointments with Mauris</Text>
          <Text style={styles.notificationTime}>1 Day ago • 2:00 PM</Text>
        </View>

        {/* Notification Item */}
        <View style={styles.notificationItem}>
          <Text style={styles.notificationTitle}>It's Michael Owen's birthday today</Text>
          <Text style={styles.notificationTime}>1 Day ago • 2:00 PM</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  notificationsList: {
    paddingHorizontal: 16,
  },
  notificationItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  notificationTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});