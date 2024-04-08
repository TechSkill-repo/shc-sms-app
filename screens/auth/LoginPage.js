import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import useAuthStore from "../../store/userAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { serveraddress } from "../../assets/values/Constants";
import { TextInput } from "react-native-paper";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const navigation = useNavigation();

  const showToast = () => {
    setTimeout(() => {
      Toast.show({
        type: "error",
        text1: "Wrong credentials",
        text2: "Please enter correct UserId or Password",
        visibilityTimeout: 5000,
        position: "top",
      });
    }, 100);
  };

  // API -> http://localhost:8080/auth/login

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(serveraddress + `auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const responseData = await response.json();
      console.log(responseData);
      console.log("token", responseData.token);

      if (responseData.message === "successful") {
        // Handle successful login
        setUser({
          username: responseData.username,
          role: responseData.role,
          email: responseData.email,
          token: responseData.token,
        });
        setLoading(false);
      } else {
        // Handle unsuccessful login
        showToast();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while trying to login");
    }
  };

  return (
    <>{loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>) : (


      <SafeAreaView
        style={{
          backgroundColor: "white",
          height: "100%",
        }}
      >
        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("StartingPage");
            }}
            style={{
              marginTop: 20,
              marginLeft: 20,
              // backgroundColor: "black",
              width: 40,
              borderWidth: 1,
              borderColor: "#034694",
              // backgroundColor: "lightgray",
              paddingHorizontal: 12,
              paddingVertical: 12,
              borderRadius: 50,
            }}
          >
            <FontAwesome name="chevron-left" size={14} color="#034694" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 26,
              paddingVertical: 20,
              paddingHorizontal: 20,
              fontWeight: "700",
              color: "#21005d",
            }}
          >
            Let's Login in the App.
          </Text>
          <Text
            style={{
              fontSize: 36,
              paddingVertical: 0,
              paddingHorizontal: 20,
              fontWeight: "200",
              color: "#C0C0C0",
            }}
          >
            Welcome Back!
          </Text>
          <Text
            style={{
              fontSize: 36,
              paddingVertical: 0,
              paddingHorizontal: 20,
              fontWeight: "200",
              color: "#C0C0C0",
            }}
          >
            Safety First
          </Text>
          <View>
            <View
              style={{
                marginTop: 40,
                marginHorizontal: 20,
                width: "100%",
              }}
            >
              <TextInput
                mode="outlined"
                label="Enter User ID"
                onChangeText={(text) => setEmail(text)}
                value={email}
                style={{
                  width: "90%",
                  backgroundColor: "white",
                }}
                placeholder="Enter Your User EmailId"
              />
            </View>
            <View
              style={{
                marginTop: 20,
                marginHorizontal: 20,
                width: "100%",
              }}
            >
              <TextInput
                mode="outlined"
                label="Enter Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                style={{
                  width: "90%",
                  backgroundColor: "white",
                }}
                placeholder="Enter Your Password"
                returnKeyType="go"
                secureTextEntry
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <TouchableOpacity
              onPress={handleLogin}
              style={{
                width: "90%",
                backgroundColor: "#21005d",
                paddingVertical: 14,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "600",
                  color: "white",
                }}
              >
                LogIn in Your Profile
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Toast />
      </SafeAreaView>
    )}
    </>
  );
};

export default LoginPage;
