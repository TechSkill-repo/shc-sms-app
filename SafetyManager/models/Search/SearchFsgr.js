import {
    View,
    Text,
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
  } from "react-native";
  import React, { useState } from "react";
  import { Entypo } from "@expo/vector-icons";
  
  const SearchFsgr = ({ isVisible, setIsVisible }) => {
  
    const windowHeight = Dimensions.get("window").height;
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
              height: windowHeight * 0.5, // 70% of the screen height
              marginTop: windowHeight * 0.5, // 30% from the top
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
                Accident Details
              </Text>
              <Entypo
                name="cross"
                size={30}
                color="red"
                onPress={() => setIsVisible(false)}
              />
            </View> 
                <Text>Make two input box of location </Text>
                <Text>Submit Button</Text>
          </ScrollView>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    date: {
      paddingVertical: 10,
      fontWeight: "600",
    },
  });
  
  export default SearchFsgr;
  