import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { serveraddress } from "../../../../assets/values/Constants";

const BottomPopup = ({ isVisible, setIsVisible, id }) => {
  const screenHeight = Dimensions.get("screen").height;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (serveraddress && id) {
        try {
          const response = await axios.get(
            `${serveraddress}forms/ppe-checklist/${id}`
          );
          setData(response.data);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
          console.error("Error fetching data:", err);
        }
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Modal visible={isVisible} transparent animationType="slide">
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" color="#21005d" />
        </View>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal visible={isVisible} transparent animationType="slide">
        <View style={styles.centeredView}>
          <Text style={styles.errorText}>Error: {error.message}</Text>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <ScrollView
          style={[
            styles.scrollView,
            { height: screenHeight * 0.9, marginTop: screenHeight * 0.1 },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>PPE checklist - {data?.location}</Text>
            <Entypo
              name="cross"
              size={30}
              color="red"
              onPress={() => setIsVisible(false)}
            />
          </View>
          <View style={styles.subHeader}>
            <Text style={styles.permitText}>
              Permit No. {data?.workOrderNumber}
            </Text>
            <Text style={styles.dateText}>{data?.date.slice(0, 10)}</Text>
          </View>
          <View>
            {data?.PPEs.map((ppes, index) => (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.empNameText}>{ppes.empName}</Text>
                <View style={styles.ppeDetails}>
                  <Text style={styles.ppeItemText}>{ppes.ppeItem}</Text>
                  <Text style={styles.ppeStatusText}>{ppes.ppeStatus}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Verified</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scrollView: {
    backgroundColor: "#FFF",
    width: "100%",
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#21005d",
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  permitText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#505050",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemContainer: {
    marginTop: 20,
  },
  empNameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#21005d",
  },
  ppeDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  ppeItemText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#505050",
  },
  ppeStatusText: {
    fontSize: 12,
    fontWeight: "300",
    color: "#505050",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  button: {
    width: "90%",
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    borderRadius: 50,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default BottomPopup;
