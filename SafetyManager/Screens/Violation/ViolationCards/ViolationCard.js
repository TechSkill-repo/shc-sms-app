import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import BottomPopup from "./BottomPopup";

const ViolationCard = () => {
  const [visible, setVisible] = useState(false);
  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
        style={styles.container}
      >
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.detailColumn}>
              <Text style={styles.date}>12.06.2024</Text>
              <Text style={styles.label}>
                Location <Text style={styles.value}>RMM</Text>
              </Text>
              <Text style={styles.label}>
                Responsibility: <Text style={styles.value}>Fahad Mahmood</Text>
              </Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.status}>Pending</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <BottomPopup visible={visible} setVisible={setVisible} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 2,
    marginBottom: 10,
  },
  card: {
    width: "90%",
    backgroundColor: "#fffbfe",
    padding: 10,
    elevation: 5,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailColumn: {
    flex: 1,
  },
  date: {
    fontWeight: "600",
    color: "#21005d",
  },
  label: {
    fontWeight: "400",
    color: "#21005d",
    marginTop: 5,
  },
  value: {
    fontWeight: "500",
    fontSize: 16,
    color: "#21005d",
  },
  statusContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFCDD2",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  status: {
    fontWeight: "600",
    color: "#D32F2F",
    fontSize: 12,
  },
});

export default ViolationCard;
