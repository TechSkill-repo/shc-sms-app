import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { serveraddress } from "../../assets/values/Constants";

const Rewards = () => {
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
      const response = await axios.post(`${serveraddress}rewareds/`, payload);
      Alert.alert("Success", "Reward submitted successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to submit reward");
      console.error("Error submitting reward:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rewards</Text>
      <TextInput
        style={styles.input}
        placeholder="Employee Name"
        value={empName}
        onChangeText={setEmpName}
      />
      <TextInput
        style={styles.input}
        placeholder="Employee ID"
        value={empId}
        onChangeText={setEmpId}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Short Description"
        value={shortDiscription}
        onChangeText={setShortDiscription}
      />
      <TextInput
        style={styles.input}
        placeholder="Reward"
        value={reward}
        onChangeText={setReward}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Rewards;
