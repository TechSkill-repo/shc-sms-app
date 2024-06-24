import React, { useState } from "react";
import { View, Modal, StyleSheet, ActivityIndicator } from "react-native";
import {
  TextInput,
  Button,
  Snackbar,
  Title,
  IconButton,
} from "react-native-paper";
import axios from "axios";
import { serveraddress } from "../../assets/values/Constants";
import { Entypo } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";

const roleOptions = [
  { label: "Site Incharge", value: "si" },
  { label: "Safety Supervisor", value: "ss" },
  { label: "Safety Manager", value: "admin" },
];

const AddUserModal = ({ visible, hideModal, onUserAdded }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!username) {
      setSnackbarMessage("Username is required");
      setSnackbarVisible(true);
      return false;
    }
    if (!email) {
      setSnackbarMessage("Email is required");
      setSnackbarVisible(true);
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSnackbarMessage("Invalid email format");
      setSnackbarVisible(true);
      return false;
    }
    if (!role) {
      setSnackbarMessage("Role is required");
      setSnackbarVisible(true);
      return false;
    }
    if (!password) {
      setSnackbarMessage("Password is required");
      setSnackbarVisible(true);
      return false;
    }
    if (password.length < 6) {
      setSnackbarMessage("Password must be at least 6 characters");
      setSnackbarVisible(true);
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    try {
      const url = `${serveraddress}auth/register`;

      const payload = {
        email: email,
        role: role.value,
        username: username,
        password: password,
      };

      console.log("payload:", payload);

      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.message === "User registered successfully") {
        setSnackbarMessage("User registered successfully");
        setSnackbarVisible(true);
        hideModal();
        setEmail("");
        setRole("");
        setUsername("");
        setPassword("");
        onUserAdded();
        setTimeout(() => {
          hideModal();
        }, 3000);
      } else if (response.data.message === "Username already exists") {
        setSnackbarMessage("Username already exists");
        setSnackbarVisible(true);
      } else if (response.data.message === "Email already exists") {
        setSnackbarMessage("Email already exists");
        setSnackbarVisible(true);
      } else {
        setSnackbarMessage("Email alredy Exist");
        setSnackbarVisible(true);
      }
      hideModal();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error registering user:", error); // Log the full error object
      if (
        error.response &&
        error.response.data.message === "Username already exists"
      ) {
        setSnackbarMessage("Username already exists");
      } else if (
        error.response &&
        error.response.data.message === "Email already exists"
      ) {
        setSnackbarMessage("Email already exists");
      } else {
        setSnackbarMessage("Error registering user. Please try again.");
      }
      setSnackbarVisible(true);
    }
  };

  const dismissSnackbar = () => setSnackbarVisible(false);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={hideModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Title style={styles.headerTitle}>Register New User</Title>
            <Entypo name="cross" size={30} color="red" onPress={hideModal} />
          </View>
          <View style={styles.form}>
            <TextInput
              mode="outlined"
              label="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            {/* <TextInput
              mode="outlined"
              label="Role"
              value={role}
              onChangeText={(text) => setRole(text)}
              style={styles.input}
            /> */}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={roleOptions}
              labelField="label"
              valueField="value"
              placeholder="Role"
              searchPlaceholder="Search..."
              value={role}
              onChange={(item) => setRole(item)}
            />
            <TextInput
              mode="outlined"
              label="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
            />
            {loading ? (
              <ActivityIndicator size={"small"} color="#0000ff" />
            ) : (
              <Button
                mode="contained"
                onPress={handleRegister}
                style={styles.button}
              >
                Register
              </Button>
            )}
          </View>
        </View>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={dismissSnackbar}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#21005d",
  },
  form: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default AddUserModal;
