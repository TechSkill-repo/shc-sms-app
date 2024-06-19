import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

const BottomPopup = ({ visible, setVisible }) => {
  const windowHeight = Dimensions.get("window").height;
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
            height: windowHeight * 0.8,
            marginTop: windowHeight * 0.2,
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
          <View style={styles.detailContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date:</Text>
              <Text style={styles.detailValue}>12.06.2024</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location:</Text>
              <Text style={styles.detailValue}>RMM</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>During:</Text>
              <Text style={styles.detailValue}>Option 1</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Severity:</Text>
              <Text style={styles.detailValue}>High</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Type:</Text>
              <Text style={styles.detailValue}>Violation</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Responsibility Of Closure:</Text>
              <Text style={styles.detailValue}>Fahad Mahmood</Text>
            </View>
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text style={styles.detailLabel}>Description:</Text>
              <Text
                style={[
                  styles.detailValue,
                  {
                    marginTop: 10,
                  },
                ]}
              >
                This is the description of the violation. This is the
                description of the violation. This is the description of the
                violation.
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
              }}
            >
              <Text style={styles.detailLabel}>Before Image:</Text>
              <Image
                source={{ uri: "https://via.placeholder.com/150" }}
                style={styles.image}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.imageButton}>
                <Entypo name="camera" size={20} color="#4caf50" />
                <Text style={styles.imageButtonText}>After Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: "#21005d",
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
  },
  closeButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
  },
});

export default BottomPopup;
