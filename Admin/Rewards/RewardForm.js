import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import { serveraddress } from "../../assets/values/Constants";

const RewardForm = ({ formVisible, setFormVisible }) => {
  const windowHeight = Dimensions.get("window").height;
  const [empName, setEmpName] = useState("");
  const [empId, setEmpId] = useState("");
  const [location, setLocation] = useState("");
  const [shortDiscription, setShortDiscription] = useState("");
  const [reward, setReward] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      empName,
      empId,
      location,
      shortDiscription,
      Reward: reward,
      Price: price,
    };

    try {
      const response = await axios.post(`${serveraddress}rewards/`, payload);
      Alert.alert("Success", "Reward submitted successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to submit reward");
      console.error("Error submitting reward:", error);
    } finally {
      setLoading(false);
      setFormVisible(false);
    }
  };

  return (
    <Modal
      visible={formVisible}
      onRequestClose={() => setFormVisible(false)}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <ScrollView
          style={[
            styles.container,
            { height: windowHeight * 0.7, marginTop: windowHeight * 0.3 },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Rewards Form</Text>
            <TouchableOpacity onPress={() => setFormVisible(false)}>
              <Entypo name="cross" size={30} color="red" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Employee Name"
              value={empName}
              onChangeText={setEmpName}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Employee ID"
              value={empId}
              onChangeText={setEmpId}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Location"
              value={location}
              onChangeText={setLocation}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Short Description"
              value={shortDiscription}
              onChangeText={setShortDiscription}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Reward"
              value={reward}
              onChangeText={setReward}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Price"
              value={price}
              onChangeText={setPrice}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
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
    fontSize: 25,
    fontWeight: "500",
    color: "#21005d",
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#21005d",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default RewardForm;
