import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { TextInput } from "react-native-paper";
import useAuthStore from "../../store/userAuthStore";
import { serveraddress } from "../../assets/values/Constants";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countdown, setCountdown] = useState(60);
  const setUser = useAuthStore((state) => state.setUser);
  const navigation = useNavigation();

  const showToast = () => {
    Toast.show({
      type: "error",
      text1: "Wrong credentials",
      text2: "Please enter correct UserId or Password",
      visibilityTimeout: 5000,
      position: "top",
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    setCountdown(60);
    try {
      const response = await fetch(`${serveraddress}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (responseData.message === "successful") {
        setUser({
          username: responseData.username,
          role: responseData.role,
          email: responseData.email,
          token: responseData.token,
        });
        setLoading(false);
        setCountdown(60); // Reset countdown to 60 upon successful login
      } else {
        showToast();
        setLoading(false);
        setCountdown(60); // Reset countdown to 60 upon unsuccessful login
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while trying to login");
      setCountdown(60); // Reset countdown to 60 upon error
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      } else {
        setCountdown(60); // Reset countdown to 60 when it reaches 0
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("StartingPage")}
          style={styles.backButton}
        >
          <FontAwesome name="chevron-left" size={14} color="#034694" />
        </TouchableOpacity>
        <Text style={styles.title}>Let's Login in the App.</Text>
        <Text style={styles.subtitle}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Safety First</Text>
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label="Enter User ID"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
            placeholder="Enter Your User EmailId"
          />
          <TextInput
            mode="outlined"
            label="Enter Password"
            onChangeText={setPassword}
            value={password}
            style={styles.input}
            placeholder="Enter Your Password"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View style={styles.loginButtonContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#21005d" />
              <Text style={styles.countdownText}>
                Please wait for {countdown}'s
              </Text>
            </View>
          ) : (
            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>LogIn in Your Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = {
  safeArea: {
    backgroundColor: "white",
    height: "100%",
  },
  backButton: {
    marginTop: 20,
    marginLeft: 20,
    width: 40,
    borderWidth: 1,
    borderColor: "#034694",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 50,
  },
  title: {
    fontSize: 26,
    paddingVertical: 20,
    paddingHorizontal: 20,
    fontWeight: "700",
    color: "#21005d",
  },
  subtitle: {
    fontSize: 36,
    paddingVertical: 0,
    paddingHorizontal: 20,
    fontWeight: "200",
    color: "#C0C0C0",
  },
  inputContainer: {
    marginTop: 40,
    marginHorizontal: 20,
    width: "100%",
  },
  input: {
    width: "90%",
    backgroundColor: "white",
    marginBottom: 20,
  },
  loginButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  loginButton: {
    width: "90%",
    backgroundColor: "#21005d",
    paddingVertical: 14,
    borderRadius: 5,
    elevation: 10,
  },
  loginButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  countdownText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#21005d",
  },
};

export default LoginPage;
