import {
  View,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";

const AccidentForm = ({ isVisible, setIsVisible }) => {
  const windowHeight = Dimensions.get("window").height;
  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      transparent
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        }}
      >
        <ScrollView
          style={{
            backgroundColor: "#FFF",
            width: "100%",
            height: windowHeight * 0.9, // 70% of the screen height
            marginTop: windowHeight * 0.1, // 30% from the top
            padding: 25,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#21005d",
              }}
            >
              Accident Form
            </Text>
            <Entypo
              name="cross"
              size={30}
              color="red"
              onPress={() => setIsVisible(false)}
            />
          </View>
          <Text
            style={{
              marginTop: 5,
              fontWeight: "300",
            }}
          >
            Fill in the details as for your report
          </Text>
          <View style={{ marginTop: 20 }}>
            <TextInput
              mode="outlined"
              label="Accident Date"
              style={{
                backgroundColor: "white",
                marginBottom: 10,
              }}
            />
            <TextInput
              mode="outlined"
              label="Location"
              style={{
                backgroundColor: "white",
                marginBottom: 10,
              }}
            />
            <TextInput
              mode="outlined"
              label="Safety Supervisor"
              style={{
                backgroundColor: "white",
                marginBottom: 10,
              }}
            />
            <TextInput
              mode="outlined"
              label="Person Name"
              style={{
                backgroundColor: "white",
                marginBottom: 10,
              }}
            />
            <TextInput
              mode="outlined"
              label="Accident Type"
              style={{
                backgroundColor: "white",
                marginBottom: 10,
              }}
            />
            <TextInput
              mode="outlined"
              label="Write a Accident Note..."
              multiline
              numberOfLines={4} // Set the number of lines you want to display
              style={{
                backgroundColor: "white",
                marginBottom: 10,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#21005d",
              height: 45,
              borderRadius: 50,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
              elevation: 2,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "white",
              }}
            >
              SUBMIT REPORT
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AccidentForm;
