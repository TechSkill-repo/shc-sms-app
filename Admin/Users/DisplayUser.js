import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import { serveraddress } from "../../assets/values/Constants";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";

const DisplayUser = ({ hide, setHide, refreshing }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, [refreshing]);

  useEffect(() => {
    const results = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${serveraddress}users`);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const toggleSearchBox = () => {
    setHide(!hide);
    setSearchTerm(""); // Reset search term when hiding the search box
  };

  const renderUserCards = () => {
    return filteredUsers.map((user) => (
      <TouchableOpacity key={user.id} style={styles.cardContainer}>
        <View style={styles.cardContent}>
          <Text style={styles.cardUsername}>{user.username}</Text>
          <Text style={styles.userInfo}>{user.email}</Text>
          <Text style={styles.userInfo}>
            {user.role === "si" ? "Site Incharge" : "Safety Manager"}
          </Text>
        </View>
      </TouchableOpacity>
    ));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        {hide === true && (
          <View style={styles.searchBox}>
            <TextInput
              mode="outlined"
              label="Search by Name"
              style={styles.searchInput}
              onChangeText={(text) => setSearchTerm(text)}
              value={searchTerm}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleSearchBox}
            >
              <Entypo name="cross" size={24} color="#f44336" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.cardsContainer}>{renderUserCards()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  searchInput: {
    margin: 5,
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  closeButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#f443361a",
    marginLeft: 10,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cardContainer: {
    width: "48%",
    marginBottom: 10,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fffbfe",
    elevation: 5,
  },
  cardContent: {},
  cardUsername: {
    color: "#21005d",
    fontWeight: "bold",
    marginBottom: 5,
  },
  userInfo: {
    paddingVertical: 4,
    fontSize: 12,
    color: "#505050",
  },
});

export default DisplayUser;
