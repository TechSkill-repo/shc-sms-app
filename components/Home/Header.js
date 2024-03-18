import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import Cards from "./Cards";

const Header = () => {
  // Sample user details
  const userDetails = {
    name: "John Doe",
    role: "Admin",
    email: "john.doe@example.com",
  };

  // Function to handle notification screen navigation
  const navigateToNotifications = () => {
    // Code to navigate to notifications screen
    console.log("Navigating to notifications screen...");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome6 name="gripfire" size={40} color="red" />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "300",
          }}
        >
          SAFETY FIRST
        </Text>
        <TouchableOpacity onPress={() => navigateToNotifications()}>
          {/* Your notification icon component */}
          <MaterialIcons
            name="notifications-active"
            size={25}
            color="#034694"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          //   marginTop: 20,
          backgroundColor: "#ffaa001a",
          padding: 20,
        }}
      >
        <Image
          source={{
            uri: "https://media.istockphoto.com/id/1346124870/photo/happy-mixed-race-construction-site-worker-looking-at-camera.jpg?s=612x612&w=0&k=20&c=xoTSYyxwPLbHquvUecUJM6RPzWULeAP2O2q7U8IUmyY=",
          }}
          style={{
            height: 80,
            width: 80,
            borderRadius: 50,
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
            }}
          >
            Fahad Mahmood
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Safty Manager
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "300",
            }}
          >
            fahadmahmood1200@gmail.com
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Cards text="Rewards" bgColor="#4caf501a" color="#4caf50" />
        <Cards text="Total Violation" bgColor="#f443361a" color="#f44336" />
        <Cards text="Total FSGR" bgColor="#fff4e5" color="#ffaa00" />
        <Cards text="Current FSGR" bgColor="#407ad61a" color="#407ad6" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#ffaa001a",
  },

  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  userDetails: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  notificationScreen: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 20,
  },
});

export default Header;
