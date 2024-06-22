import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import Cards from "./Cards";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../store/userAuthStore";

const { width } = Dimensions.get("window");

const Header = () => {
  const { removeToken, removeRole, username, role } = useAuthStore();
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current; // Initial position is off-screen to the left

  const toggleNotificationSlider = () => {
    const toValue = isNotificationVisible ? -width : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsNotificationVisible(!isNotificationVisible);
    });
  };

  const removeTokenFromStorage = async () => {
    removeToken();
    removeRole();
  };

  return (
    <View style={styles.container}>
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
            {role === "sm" ? "Safety Manager" : "Site Incharge"}
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={toggleNotificationSlider}
            style={styles.iconWrapper}
          >
            <Feather name="bell" size={25} color="#21005d" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={removeTokenFromStorage}
            style={[styles.iconWrapper, styles.logoutIcon]}
          >
            <AntDesign name="logout" size={25} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <Cards text="Rewards" bgColor="#4caf501a" color="#4caf50" />
        <Cards text="Total Violation" bgColor="#f443361a" color="#f44336" />
        <Cards text="Total FSGR" bgColor="#fff4e5" color="#ffaa00" />
        <Cards text="Current FSGR" bgColor="#407ad61a" color="#407ad6" />
      </View>

      {isNotificationVisible && (
        <TouchableWithoutFeedback onPress={toggleNotificationSlider}>
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.notificationSlider,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              <Text style={styles.notificationText}>Notifications</Text>
              {/* Add your notification items here */}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
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
    backgroundColor: "#fffbfe",
    paddingBottom: 20,
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
    justifyContent: "space-between",
    alignItems: "center",
    width: 90,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 9,
    borderColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutIcon: {
    marginHorizontal: 7,
  },
  cardsContainer: {
    marginTop: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1000,
  },
  notificationSlider: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width * 0.8,
    height: "100%",
    backgroundColor: "#fffbfe",
    padding: 20,
    elevation: 5,
    zIndex: 1001,
  },
  notificationText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#21005d",
    marginBottom: 10,
  },
});

export default Header;
