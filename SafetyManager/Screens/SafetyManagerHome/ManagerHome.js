import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../../store/userAuthStore";
import HomeNav from "./HomeNav/HomeNav";

const ManagerHome = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const { token, removeToken, removeRole, username, role } = useAuthStore();
  // Sample user details

  // Function to handle notification screen navigation
  const navigateToNotifications = () => {
    // Code to navigate to notifications screen
    console.log("Navigating to notifications screen...");
  };

  const navigation = useNavigation();

  // Function to remove token from AsyncStorage
  const removeTokenFromStorage = async () => {
    removeToken();
    removeRole();
  };

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <StatusBar backgroundColor="#fffbfe" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              width: 40,
              height: 40,
              borderWidth: 0.5,
              borderRadius: 9,
              borderColor: "#e9ecef",
            }}
          >
            {/* <FontAwesome6 name="gripfire" size={40} color="red" /> */}
            <Image
              source={{
                uri: "https://media.istockphoto.com/id/1346124870/photo/happy-mixed-race-construction-site-worker-looking-at-camera.jpg?s=612x612&w=0&k=20&c=xoTSYyxwPLbHquvUecUJM6RPzWULeAP2O2q7U8IUmyY=",
              }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 9,
              }}
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#21005d",
              }}
            >
              {username}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: "#21005da1",
              }}
            >
              {role === "ss" ? "Safety Supervisor" : "Site Incharge"}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 70,
              marginRight: 12,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderWidth: 0.5,
                borderRadius: 9,
                borderColor: "#e9ecef",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => navigateToNotifications()}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Your notification icon component */}
                <Feather name="bell" size={25} color="#21005d" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderWidth: 0.5,
                borderRadius: 9,
                borderColor: "#e9ecef",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 7,
              }}
            >
              <TouchableOpacity
                onPress={removeTokenFromStorage}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Your notification icon component */}
                <AntDesign name="logout" size={25} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <HomeNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fffbfe",
    paddingBottom: 20,
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

export default ManagerHome;
