import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { serveraddress } from "../../../../assets/values/Constants";
import useAuthStore from "../../../../store/userAuthStore";

const ClosePopup = ({ visible, setVisible, cardId }) => {
  const windowHeight = Dimensions.get("window").height;
  const [loading, setLoading] = useState(true);
  const [violationDetails, setViolationDetails] = useState(null);
  const [imageLoadingBefore, setImageLoadingBefore] = useState(true);
  const [imageLoadingAfter, setImageLoadingAfter] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { role } = useAuthStore((state) => ({
    role: state.role,
  }));
  console.log("role", role);
  useEffect(() => {
    if (visible) {
      setLoading(true);
      axios
        .get(`${serveraddress}violation/${cardId}`)
        .then((response) => {
          console.log(response.data);
          setViolationDetails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [visible, cardId]);

  const getImageUrl = (imagePath) => {
    if (imagePath) {
      const url = `https://shconstruction.co.in/violation/${imagePath}`;
      console.log("Image URL:", url);
      return url;
    }
    return null;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const formDataNew = new FormData();

      formDataNew.append("status", "finalClosed");

      const response = await fetch(`${serveraddress}violation/${cardId}`, {
        method: "PATCH",
        body: formDataNew,
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct content type
        },
      });
      if (!response.ok) {
        const responseData = await response.text();
        console.error("Server response:", responseData);
        throw new Error("Network response was not ok");
      }

      setIsSubmitting(false);
      setVisible(false);
    } catch (error) {
      setIsSubmitting(false);
      Alert.alert("Error", "Failed to submit form");
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      transparent
      animationType="slide"
    >
      <View style={styles.modalBackground}>
        <ScrollView
          style={{
            ...styles.scrollView,
            height: windowHeight * 0.9,
            marginTop: windowHeight * 0.1,
          }}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>VIOLATION Details</Text>
            <Entypo
              name="cross"
              size={30}
              color="red"
              onPress={() => setVisible(false)}
            />
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#21005d" />
          ) : (
            <View style={styles.detailContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date:</Text>
                <Text style={styles.detailValue}>
                  {violationDetails?.createdAt.slice(0, 10)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Location:</Text>
                <Text style={styles.detailValue}>
                  {violationDetails?.location}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>During:</Text>
                <Text style={styles.detailValue}>
                  {violationDetails?.during}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Severity:</Text>
                <Text style={styles.detailValue}>
                  {violationDetails?.severity}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Type:</Text>
                <Text style={styles.detailValue}>{violationDetails?.type}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  Responsibility Of Closure:
                </Text>
                <Text style={styles.detailValue}>
                  {violationDetails?.responsiblePerson}
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.detailLabel}>Description:</Text>
                <Text style={[styles.detailValue, { marginTop: 10 }]}>
                  {violationDetails?.discription}
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.detailLabel}>Comment:</Text>
                <Text style={[styles.detailValue, { marginTop: 10 }]}>
                  {violationDetails?.comment}
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.detailLabel}>Before Image:</Text>
                {violationDetails?.violationBeforeImage ? (
                  <View>
                    {imageLoadingBefore && (
                      <ActivityIndicator size="small" color="#21005d" />
                    )}
                    <Image
                      source={{
                        uri: getImageUrl(violationDetails.violationBeforeImage),
                      }}
                      style={styles.image}
                      onLoadEnd={() => setImageLoadingBefore(false)}
                      onError={() => {
                        console.error("Failed to load image");
                        setImageLoadingBefore(false);
                      }}
                    />
                  </View>
                ) : (
                  <Text style={styles.detailValue}>No image available</Text>
                )}
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.detailLabel}>After Image:</Text>
                {violationDetails?.violationAfterImage ? (
                  <View>
                    {imageLoadingAfter && (
                      <ActivityIndicator size="small" color="#21005d" />
                    )}
                    <Image
                      source={{
                        uri: getImageUrl(violationDetails.violationAfterImage),
                      }}
                      style={styles.image}
                      onLoadEnd={() => setImageLoadingAfter(false)}
                      onError={() => {
                        console.error("Failed to load image");
                        setImageLoadingAfter(false);
                      }}
                    />
                  </View>
                ) : (
                  <Text style={styles.detailValue}>No image available</Text>
                )}
              </View>
              <View style={styles.buttonContainer}>
                {role === "admin" && (
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.closeButton}
                  >
                    {isSubmitting ? (
                      <Text style={styles.closeButtonText}>Requesting...</Text>
                    ) : (
                      <Text style={styles.closeButtonText}>Closed</Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
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
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#21005d",
  },
  detailContainer: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#21005d",
  },
  detailValue: {
    fontSize: 16,
    color: "#555",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  imageButton: {
    backgroundColor: "#4caf501a",
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    flexDirection: "row",
  },
  imageButtonText: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "700",
    color: "#4caf50",
  },
  closeButton: {
    backgroundColor: "#f44336",
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  closeButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
  },
});

export default ClosePopup;
