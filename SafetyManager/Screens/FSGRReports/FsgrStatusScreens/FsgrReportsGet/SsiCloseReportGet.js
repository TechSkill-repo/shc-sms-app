import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import useAuthStore from "../../../../../store/userAuthStore";
import { serveraddress } from "../../../../../assets/values/Constants";

const SsiCloseReportGet = ({ isVisible, setIsVisible, id }) => {
  const screenHeight = Dimensions.get("screen").height;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verifiedLoading, setVerifiedLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { role } = useAuthStore((state) => ({
    role: state.role,
  }));

  console.log("role:", role);

  useEffect(() => {
    if (serveraddress && id) {
      fetchData();
    }
  }, [id, refresh]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${serveraddress}fsgr/${id}/ssiclose`);
      console.log("approved data:", response.data);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error("Error fetching data:", err);
    }
  };

  if (loading) {
    return (
      <Modal visible={isVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.container, { height: screenHeight * 0.9 }]}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal visible={isVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.container, { height: screenHeight * 0.9 }]}>
            <Text style={styles.errorText}>Error: {error.message}</Text>
          </View>
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
      <View style={styles.modalContainer}>
        <View style={[styles.container, { height: screenHeight * 0.9 }]}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                SSI Close - {data?.location}
              </Text>
              <Entypo
                name="cross"
                size={30}
                color="red"
                onPress={() => setIsVisible(false)}
              />
            </View>
            <View style={styles.subHeader}>
              <Text style={styles.subHeaderText}>{data?.heading}</Text>
              <Text style={styles.dateText}>
                {data?.reportDate.slice(0, 10)}
              </Text>
            </View>
            <View>
              <View style={styles.infoContainer}>
                <View>
                  <Text style={styles.infoLabel}>Site Supervisor Name</Text>
                  <Text style={styles.infoText}>{data?.site_supervisor}</Text>
                </View>
              </View>
            </View>
            <View style={styles.messageContainer}>
              <Text style={styles.messageLabel}>
                Initial Investigation Status
              </Text>
              <Text style={styles.messageText}>
                {data?.initial_investigation_status}
              </Text>
            </View>
            <View style={styles.messageContainer}>
              <Text style={styles.messageLabel}>
                Initial Investigation Team
              </Text>
              <Text style={styles.messageText}>
                {data?.initial_investigation_team}
              </Text>
            </View>
            <View style={styles.messageContainer}>
              <Text style={styles.messageLabel}>Resource Planning Done By</Text>
              <Text style={styles.messageText}>
                {data?.resource_planning_done_by}
              </Text>
            </View>
            <View style={styles.messageContainer}>
              <Text style={styles.messageLabel}>Planning Date</Text>
              <Text style={styles.messageText}>
                {data?.planning_date.slice(0, 10)}
              </Text>
            </View>
            <View style={styles.messageContainer}>
              <Text style={styles.messageLabel}>Resource Required</Text>
              <Text style={styles.messageText}>{data?.resource_required}</Text>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#4782da1a" }]}
              onPress={() => {
                /* Handle edit action */
              }}
            >
              <Text style={[styles.buttonText, { color: "#4782da" }]}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#4caf501a" }]}
              onPress={() => setIsVisible(false)}
            >
              <Text style={[styles.buttonText, { color: "#4caf50" }]}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "#FFF",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
  },
  contentContainer: {
    paddingBottom: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
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
  subHeaderText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#505050",
  },
  dateText: {
    fontSize: 16,
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
  messageContainer: {
    marginTop: 20,
  },
  messageLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#21005d",
  },
  messageText: {
    marginTop: 10,
  },
  loadingText: {
    fontSize: 20,
    color: "#21005d",
    textAlign: "center",
  },
  errorText: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default SsiCloseReportGet;
