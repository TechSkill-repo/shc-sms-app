import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { serveraddress } from "../../../../assets/values/Constants";
import Toast from "react-native-toast-message";

const BottomPopup = ({ isVisible, setIsVisible, id }) => {
  const screenHeight = Dimensions.get("screen").height;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showToast = () => {};

  useEffect(() => {
    if (serveraddress && id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${serveraddress}forms/tools-tackles/${id}`
          );
          setData(response.data);
        } catch (err) {
          setError(err);
          console.error("Error fetching data:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
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
            { height: screenHeight * 0.6, marginTop: screenHeight * 0.4 },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Daily Job Plans - {data?.location}</Text>
            <Entypo
              name="cross"
              size={30}
              color="red"
              onPress={() => setIsVisible(false)}
            />
          </View>
          <View style={styles.subHeader}>
            <Text style={styles.permitText}>
              Permit No. {data?.permitNumber}
            </Text>
            <Text style={styles.dateText}>{data?.createdAt.slice(0, 10)}</Text>
          </View>
          <View>
            {data?.tools.map((tool, index) => (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.toolNameText}>{tool.toolName}</Text>
                <View style={styles.toolDetails}>
                  <Text style={styles.toolConditionText}>{tool.condition}</Text>
                  <Text style={styles.toolTpiText}>{tool.tpi}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setTimeout(() => {
                  Toast.show({
                    type: "error",
                    text1: "Wrong credentials",
                    text2: "Please enter correct UserId or Password",
                    visibilityTimeout: 50000,
                    position: "bottom",
                  });
                }, 100);
              }}
            >
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
  toolNameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#21005d",
  },
  toolDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  toolConditionText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#505050",
  },
  toolTpiText: {
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
