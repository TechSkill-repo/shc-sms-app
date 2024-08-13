import React, { useState, useRef, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import Cards from "./Cards";
import useAuthStore from "../../store/userAuthStore";
import job from "../../assets/icons/job.png";
import consequence from "../../assets/icons/consequence.png";
import yellowCard from "../../assets/icons/tools.png";
import ppe from "../../assets/icons/ppe.png";
import { useNavigation } from "@react-navigation/native";

const items = [
  { id: 1, label: "Tool Box", icon: consequence, screen: "TBM" },
  { id: 2, label: "DJP", icon: job, screen: "DJP" },
  { id: 3, label: "PPE Check", icon: ppe, screen: "PPE" },
  { id: 4, label: "Tool & Tackle", icon: yellowCard, screen: "TNT" },
];

const backgroundColors = [
  "#fbf1de",
  "#ffddd5",
  "#ffd0b0",
  "#ffe1ed",
  "#ebeaff",
  "#e8eaeb",
  "#fcdcd6",
  "#fbf1de",
  "#d1e7dd",
  "#e2e3e9",
  "#f8d7da",
  "#d1ecf1",
];

const Item = memo(({ label, icon, backgroundColor, onPress }) => (
  <View style={styles.itemContainer}>
    <TouchableOpacity
      onPress={onPress}
      style={[styles.touchable, { backgroundColor }]}
    >
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
    <Text style={styles.text}>{label}</Text>
  </View>
));

const { width } = Dimensions.get("window");

const Header = () => {
  const { removeToken, removeRole, username, role, location } = useAuthStore();
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current; // Initial position is off-screen to the left

  const navigation = useNavigation();

  const handlePress = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  console.log("role===", role);

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < items.length; i += 4) {
      const rowItems = items.slice(i, i + 4);
      rows.push(
        <View style={styles.row} key={i}>
          {rowItems.map((item, index) => (
            <Item
              key={item.id}
              {...item}
              backgroundColor={backgroundColors[i + index]}
              onPress={() => handlePress(item.screen)}
            />
          ))}
        </View>
      );
    }
    return rows;
  };

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

  const handleCallPress = () => {
    Linking.openURL(`tel:7272977850`);
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
          <View style={{flexDirection:"row"}}>

          <Text style={styles.userRole}>
            {role === "sm" ? "Safety Manager" : "Site Incharge"}
          </Text>
          <Text style={styles.userRole}>{", "}{location}</Text>
          </View>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={handleCallPress}
            style={styles.iconWrapper}
          >
            <MaterialIcons name="phone" size={25} color="#21005d" />
          </TouchableOpacity>
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

      <>
        {renderRows()}
        <View style={styles.cardsContainer}>
          <Cards text="Rewards" bgColor="#4caf501a" color="#4caf50" />
          <Cards text="Total Violation" bgColor="#f443361a" color="#f44336" />
          <Cards text="Total FSGR" bgColor="#fff4e5" color="#ffaa00" />
          <Cards text="Current FSGR" bgColor="#407ad61a" color="#407ad6" />
        </View>
      </>

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
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 9,
    borderColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 2,
    marginHorizontal: 2,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 8,
    padding: 8,
  },
  itemContainer: {
    alignItems: "center",
    flexDirection: "column",
  },
  touchable: {
    padding: 12,
    borderRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  text: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
    color: "#21005d",
  },
  title: {
    marginHorizontal: 25,
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#21005d",
    marginBottom: 10,
  },
});

export default Header;
