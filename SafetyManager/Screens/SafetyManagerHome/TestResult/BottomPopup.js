import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { serveraddress } from "../../../../assets/values/Constants";

const BottomPopup = ({ isVisible, setIsVisible, id }) => {
  const screenHeight = Dimensions.get("screen").height;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (serveraddress && id) {
        try {
          const response = await axios.get(`${serveraddress}training/test/${id}`);
          console.log("test:", response.data);
          setData(response.data);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      }
    };
    fetchData();
  }, [id]);

  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      transparent
      animationType="slide"
    >
      <View style={styles.modalBackground}>
        <ScrollView style={[styles.scrollView, { height: screenHeight * 0.9 }]}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Test Name - {data?.testName}</Text>
            <Entypo
              name="cross"
              size={30}
              color="red"
              onPress={() => setIsVisible(false)}
            />
          </View>
          <View style={styles.subHeader}>
            <Text style={styles.subHeaderTitle}>
              About Test - {data?.aboutTest}
            </Text>
            <Text style={styles.subHeaderDate}>
              {data?.createdAt.slice(0, 10)}
            </Text>
          </View>
          <View style={styles.hazardsContainer}>
            <View>
              <Text style={styles.hazardsTitle}>Marks</Text>
              {data?.marks?.map((mark, index) => (
                <Text key={index} style={styles.hazardItem}>
                  {index + 1}. {mark.empName} - Marks: {mark.empMarks}, Status: {mark.testStatus}
                </Text>
              ))}
            </View>
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
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scrollView: {
    backgroundColor: "#FFF",
    width: "100%",
    marginTop: Dimensions.get("screen").height * 0.1,
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
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
  subHeaderTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#505050",
  },
  subHeaderDate: {
    fontSize: 14,
    fontWeight: "500",
  },
  hazardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  hazardsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f44336",
  },
  hazardItem: {
    margin: 2,
    fontSize: 14,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 20,
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
