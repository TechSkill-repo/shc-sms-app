import { View, Text, Modal, ScrollView, Dimensions } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const BottomPopup = ({ isVisible, setIsVisible, id, endpoint }) => {
  const screenHeight = Dimensions.get("screen").height;
  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      transparent
      animationType="slide"
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
            height: screenHeight * 0.6,
            marginTop: screenHeight * 0.4,
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
              FSGR Report {id}
            </Text>
            <Entypo
              name="cross"
              size={30}
              color="red"
              onPress={() => setIsVisible(false)}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default BottomPopup;
