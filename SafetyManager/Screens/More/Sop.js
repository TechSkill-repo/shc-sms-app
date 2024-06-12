import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { serveraddress } from "../../../assets/values/Constants";

const Sop = () => {
  const [sopData, setSopData] = useState([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAllSop = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serveraddress}sop/${location}`);
      if (res.data) {
        setSopData(res.data);
      } else {
        console.error("Invalid response format:", res);
        setSopData([]);
      }
    } catch (error) {
      console.error("There was an error fetching the SOP data:", error);
      setSopData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="Enter location"
          style={styles.textInput}
        />
        <TouchableOpacity onPress={fetchAllSop} style={styles.searchButton}>
          <Feather name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : sopData.length === 0 ? (
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>
            Please enter a location to search
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {sopData.map((data) => (
            <View key={data.createdAt} style={styles.card}>
              <Text style={styles.cardTitle}>{data.sopTitle}</Text>
              <Text style={styles.cardDescription}>{data.sopDescription}</Text>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View SOP</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchButton: {
    backgroundColor: "#21005d",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginLeft: 15,
    borderRadius: 100,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  promptContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  promptText: {
    fontSize: 18,
    color: "#999",
  },
  card: {
    backgroundColor: "#fffbfe",
    width: "98%",
    marginTop: 20,
    elevation: 5,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#21005d",
  },
  cardDescription: {
    fontSize: 14,
    color: "#21005d",
    marginTop: 5,
    fontWeight: "300",
  },
  viewButton: {
    marginTop: 15,
    backgroundColor: "#376fd01a",
    width: "25%",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
  },
  viewButtonText: {
    textAlign: "center",
    color: "#376fd0",
    fontWeight: "500",
    fontSize: 12,
  },
});

export default Sop;
