import { View, Text, Image } from "react-native";
import React from "react";

const UnderConstruction = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/construction-sign-tools-design-vector_624938-756.jpg",
          }}
          style={{
            height: "60%",
            width: "100%",
          }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            color: "#21005d",
          }}
        >
          Under Construction!
        </Text>
        <Text
          style={{
            fontWeight: "300",
            fontSize: 18,
            color: "#21005d",
          }}
        >
          Will be updated soon...
        </Text>
      </View>
    </View>
  );
};

export default UnderConstruction;
