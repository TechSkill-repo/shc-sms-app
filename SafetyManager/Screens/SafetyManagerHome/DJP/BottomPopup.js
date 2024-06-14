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
  const [hazards, setHazards] = useState([]);
  const [necessarySteps, setNecessarySteps] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (serveraddress && id) {
        try {
          const response = await axios.get(
            `${serveraddress}forms/daily-job-plan/${id}`
          );
          setData(response.data);
          setHazards(JSON.parse(response.data?.hazardsDescription || "[]"));
          setNecessarySteps(JSON.parse(response.data?.necessarySteps || "[]"));
          const parsedAttendance = JSON.parse(
            response.data?.attendance || "[]"
          );
          setAttendance(
            Array.isArray(parsedAttendance) ? parsedAttendance : []
          );
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
            <Text style={styles.headerTitle}>
              Daily Job Plans - {data?.location}
            </Text>
            <Entypo
              name="cross"
              size={30}
              color="red"
              onPress={() => setIsVisible(false)}
            />
          </View>
          <View style={styles.subHeader}>
            <Text style={styles.subHeaderTitle}>
              Permit No - {data?.workPermitNumber}
            </Text>
            <Text style={styles.subHeaderDate}>
              {data?.createdAt.slice(0, 10)}
            </Text>
          </View>
          <Text style={styles.sectionTitle}>Type Of Work</Text>
          <Text style={styles.sectionContent}>{data?.typeOfWork}</Text>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.infoLabel}>Name Of Supervisor</Text>
              <Text style={styles.infoText}>{data?.nameOfSupervisor}</Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>SOP Number</Text>
              <Text style={styles.infoText}>{data?.sopNumber}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Job Description</Text>
            <Text style={styles.sectionContent}>{data?.jobDescription}</Text>
          </View>
          <View style={styles.hazardsContainer}>
            <View>
              <Text style={styles.hazardsTitle}>Hazard's Descriptions</Text>
              {hazards.map((haz, index) => (
                <Text key={index} style={styles.hazardItem}>
                  {index + 1}. {haz}
                </Text>
              ))}
            </View>
            <View>
              <Text style={styles.stepsTitle}>Necessary Steps</Text>
              {necessarySteps.map((necessaryStep, index) => (
                <Text key={index} style={styles.hazardItem}>
                  {index + 1}. {necessaryStep}
                </Text>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.attendanceTitle}>Present Workers List</Text>
            {attendance.map((worker, index) => (
              <Text key={index} style={styles.attendanceItem}>
                {index + 1}. {worker}
              </Text>
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
  sectionTitle: {
    marginTop: 20,
    fontSize: 12,
    fontWeight: "500",
  },
  sectionContent: {
    fontSize: 20,
    fontWeight: "500",
  },
  infoContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#21005d",
  },
  infoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#505050",
  },
  section: {
    marginTop: 20,
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
  stepsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4caf50",
  },
  attendanceTitle: {
    fontSize: 16,
    marginTop: 16,
    fontWeight: "600",
    color: "#505050",
  },
  attendanceItem: {
    fontSize: 16,
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
