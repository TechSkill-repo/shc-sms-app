import React, { memo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Medal from "../../../../assets/icons/medal.png";
import fireExtinguisher from "../../../../assets/icons/fire-extinguisher.png";
import policy from "../../../../assets/icons/compliant.png";
import smokeDetector from "../../../../assets/icons/gas-sensor.png";
import yellowCard from "../../../../assets/icons/tools.png";
import ppe from "../../../../assets/icons/ppe.png";
import job from "../../../../assets/icons/job.png";
import consequence from "../../../../assets/icons/consequence.png";
import training from "../../../../assets/icons/training.png";
import exam from "../../../../assets/icons/exam.png";
import result from "../../../../assets/icons/result.png";
import meeting from "../../../../assets/icons/meeting.png";
import Cards from "../../../../components/Home/Cards";
import useAuthStore from "../../../../store/userAuthStore";

const items = [
  { id: 1, label: "Rewards", icon: Medal, screen: "Rewards" },
  { id: 2, label: "Tool Box", icon: consequence, screen: "TBM" },
  { id: 3, label: "DJP", icon: job, screen: "DJP" },
  { id: 4, label: "PPE Check", icon: ppe, screen: "PPE" },
  { id: 5, label: "Tool & Tackle", icon: yellowCard, screen: "TNT" },
  { id: 6, label: "Gas Detect", icon: smokeDetector },
  { id: 7, label: "Fire Ext.", icon: fireExtinguisher },
  { id: 8, label: "Conseq. Policy", icon: policy },
  { id: 9, label: "Training Test", icon: exam, screen: "TrainingTest" },
  { id: 10, label: "Training", icon: training, screen: "Training" },
  { id: 11, label: "Test Result", icon: result, screen: "TestResult" },
  { id: 12, label: "Mass Meating", icon: meeting },
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

const HomeNav = () => {
  const navigation = useNavigation();
  const { role } = useAuthStore((state) => ({
    role: state.role,
  }));

  const handlePress = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  const filterItemsByRole = (items, role) => {
    if (role === "admin") {
      return items.filter(
        (item) =>
          item.label !== "Training Test" &&
          item.label !== "Conseq. Policy" &&
          item.label !== "Training" &&
          item.label !== "upcoming"
      );
    }
    // Add more role-based filtering logic if needed
    return items;
  };

  const filteredItems = filterItemsByRole(items, role);

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < filteredItems.length; i += 4) {
      const rowItems = filteredItems.slice(i, i + 4);
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

  return (
    <>
      {renderRows()}
      <Text style={styles.title}>Data Visualization</Text>
      <Cards text="Rewards" bgColor="#4caf501a" color="#4caf50" />
      <Cards text="Total Violation" bgColor="#f443361a" color="#f44336" />
      <Cards text="Total FSGR" bgColor="#fff4e5" color="#ffaa00" />
      <Cards text="Current FSGR" bgColor="#407ad61a" color="#407ad6" />
    </>
  );
};

const styles = StyleSheet.create({
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

export default HomeNav;
