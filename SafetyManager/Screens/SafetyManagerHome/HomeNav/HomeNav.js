import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Medal from "../../../../assets/icons/medal.png";
import fireExtinguisher from "../../../../assets/icons/fire-extinguisher.png";
import policy from "../../../../assets/icons/compliant.png";
import smokeDetector from "../../../../assets/icons/gas-sensor.png";
import yellowCard from "../../../../assets/icons/data.png";
import goodFeedback from "../../../../assets/icons/satisfaction.png";
import arrow from "../../../../assets/icons/arrows.png";
import consequence from "../../../../assets/icons/consequence.png";
import Cards from "../../../../components/Home/Cards";

const items = [
  { id: 1, label: "Rewards", icon: Medal, backgroundColor: "#fbf1de" },
  {
    id: 2,
    label: "Consequences",
    icon: consequence,
    backgroundColor: "#ffddd5",
  },
  { id: 3, label: "Recognition", icon: arrow, backgroundColor: "#ffd0b0" },
  { id: 4, label: "Feedback", icon: goodFeedback, backgroundColor: "#ffe1ed" },
  { id: 5, label: "Violation", icon: yellowCard, backgroundColor: "#ebeaff" },
  {
    id: 6,
    label: "Gas Detect",
    icon: smokeDetector,
    backgroundColor: "#e8eaeb",
  },
  {
    id: 7,
    label: "Fire Ext.",
    icon: fireExtinguisher,
    backgroundColor: "#fcdcd6",
  },
  { id: 8, label: "Conseq. Policy", icon: policy, backgroundColor: "#fbf1de" },
];

const Item = ({ label, icon, backgroundColor }) => (
  <View style={styles.itemContainer}>
    <TouchableOpacity style={[styles.touchable, { backgroundColor }]}>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
    <Text style={styles.text}>{label}</Text>
  </View>
);

const HomeNav = () => {
  return (
    <>
      <View style={styles.row}>
        {items.slice(0, 4).map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </View>
      <View style={styles.row}>
        {items.slice(4).map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </View>
      <Text
        style={{
          marginHorizontal: 25,
          marginTop: 20,
          fontSize: 20,
          fontWeight: "bold",
          color: "#21005d",
          marginBottom: 10,
        }}
      >
        Data Visulization
      </Text>
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
    marginTop: 20,
    padding: 10,
  },
  itemContainer: {
    alignContent: "center",
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
});

export default HomeNav;
