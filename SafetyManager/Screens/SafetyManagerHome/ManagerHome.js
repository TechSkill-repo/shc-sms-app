import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../../store/userAuthStore";
import HomeNav from "./HomeNav/HomeNav";

const ManagerHome = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const { token, removeToken, removeRole, username, role } = useAuthStore();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current; // Initial position of the sidebar

  const navigation = useNavigation();

  const navigateToNotifications = () => {
    setSidebarVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarVisible(false));
  };

  const removeTokenFromStorage = async () => {
    removeToken();
    removeRole();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fffbfe" barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/1346124870/photo/happy-mixed-race-construction-site-worker-looking-at-camera.jpg?s=612x612&w=0&k=20&c=xoTSYyxwPLbHquvUecUJM6RPzWULeAP2O2q7U8IUmyY=",
            }}
            style={styles.profileImage}
          />
        </View>
        <View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.userRole}>
            {role === "ss" ? "Safety Supervisor" : "Site Incharge"}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={navigateToNotifications}
            style={styles.iconButton}
          >
            <Feather name="bell" size={25} color="#21005d" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={removeTokenFromStorage}
            style={styles.iconButton}
          >
            <AntDesign name="logout" size={25} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <HomeNav />
      </ScrollView>
      {sidebarVisible && (
        <Modal transparent={true} animationType="none" visible={sidebarVisible}>
          <TouchableWithoutFeedback onPress={closeSidebar}>
            <View style={styles.overlay}>
              <Animated.View
                style={[
                  styles.sidebar,
                  { transform: [{ translateX: slideAnim }] },
                ]}
              >
                <Text style={styles.sidebarContent}>Notification Content</Text>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fffbfe",
    paddingBottom: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  contentContainer: {
    paddingTop: 100, // Ensure content is visible below the fixed header
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 9,
    borderColor: "#e9ecef",
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 9,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#21005d",
  },
  userRole: {
    fontSize: 12,
    fontWeight: "600",
    color: "#21005da1",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 70,
    marginRight: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 9,
    borderColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 7,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sidebar: {
    width: 300,
    height: "100%",
    backgroundColor: "white",
    position: "absolute",
    left: 0,
    top: 0,
    padding: 20,
  },
  sidebarContent: {
    fontSize: 18,
    fontWeight: "600",
    color: "#21005d",
  },
});

export default ManagerHome;
