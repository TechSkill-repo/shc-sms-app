import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { serveraddress } from "../../../assets/values/Constants";
import BottomPopup from "./ViolationCards/BottomPopup";

const ViolationGood = () => {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [cardId, setCardId] = useState("");

  useEffect(() => {
    axios
      .get(`${serveraddress}violation/good_observation/pending`)
      .then((response) => {
        setViolations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#21005d" />
      </View>
    );
  }

  return (
    <ScrollView>
      {violations.map((violation, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setVisible(true);
            setCardId(violation.id);
          }}
          style={styles.container}
        >
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.detailColumn}>
                <Text style={styles.date}>
                  {violation.createdAt?.slice(0, 10)}
                </Text>
                <Text style={styles.label}>
                  Location:{" "}
                  <Text style={styles.value}>{violation.location}</Text>
                </Text>
                <Text style={styles.label}>
                  Responsibility:{" "}
                  <Text style={styles.value}>{violation.responsibility}</Text>
                </Text>
              </View>
              <View style={styles.statusContainer}>
                <Text style={styles.status}>{violation.status}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <BottomPopup visible={visible} setVisible={setVisible} cardId={cardId} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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

export default ViolationGood;
