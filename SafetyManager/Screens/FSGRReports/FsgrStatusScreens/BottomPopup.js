import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { serveraddress } from "../../../../assets/values/Constants";
import useAuthStore from "../../../../store/userAuthStore";

const BottomPopup = ({ isVisible, setIsVisible, id }) => {
  const screenHeight = Dimensions.get("screen").height;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verifiedLoading, setVerifiedLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { role } = useAuthStore((state) => ({
    role: state.role,
  }));

  useEffect(() => {
    if (serveraddress && id) {
      fetchData();
    }
  }, [id, refresh]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${serveraddress}fsgr/${id}`);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error("Error fetching data:", err);
    }
  };

  const handleVerified = () => {
    Alert.alert(
      "Confirm Verification",
      "Are you sure you want to verify this report?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setVerifiedLoading(true);
            axios
              .patch(`${serveraddress}fsgr/form/${id}`, {
                id,
                status: "approved",
              })
              .then((res) => {
                setVerifiedLoading(false);
                Alert.alert("Success", "Report verified successfully.");
                setIsVisible(false);
                setRefresh((prev) => !prev);
              })
              .catch((error) => {
                setVerifiedLoading(false);
                Alert.alert("Error", "Failed to verify the report.");
              });
          },
        },
      ]
    );
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      transparent
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={[styles.scrollContainer, { height: screenHeight * 0.6 }]}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                FSGR Report - {data?.location}
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
                {data?.reportDate?.slice(0, 10)}
              </Text>
            </View>
            <View>
              <Text style={styles.nameText}>{data?.empName}</Text>
              <Text style={styles.designationText}>{data?.empDesignation}</Text>
              <View style={styles.infoContainer}>
                <View>
                  <Text style={styles.infoLabel}>Incharge Name</Text>
                  <Text style={styles.infoText}>{data?.inchargeName}</Text>
                </View>
                <View>
                  <Text style={styles.infoLabel}>Site Supervisor Name</Text>
                  <Text style={styles.infoText}>{data?.siteSupervisor}</Text>
                </View>
              </View>
            </View>
            <View style={styles.messageContainer}>
              <Text style={styles.messageLabel}>Reporting Message/Issue</Text>
              <Text style={styles.messageText}>{data?.message}</Text>
            </View>
          </ScrollView>
          {role === "admin" && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  verifiedLoading && styles.buttonDisabled,
                ]}
                disabled={verifiedLoading}
              >
                {verifiedLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Canceled</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.approveButton,
                  verifiedLoading && styles.buttonDisabled,
                ]}
                onPress={handleVerified}
                disabled={verifiedLoading}
              >
                {verifiedLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Approved</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
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
  scrollContainer: {
    backgroundColor: "#FFF",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    padding: 25,
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
  nameText: {
    fontSize: 22,
    paddingTop: 10,
  },
  designationText: {
    fontSize: 13,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  cancelButton: {
    marginHorizontal: 6,
    width: "45%",
    backgroundColor: "#f44336",
    paddingVertical: 10,
    borderRadius: 10,
  },
  approveButton: {
    marginHorizontal: 6,
    width: "45%",
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default BottomPopup;
