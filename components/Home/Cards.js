import { View, Text } from "react-native";
import React from "react";

const Cards = ({ text, bgColor, color }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          marginHorizontal: 20,
          marginVertical: 8,
          padding: 10,
          backgroundColor: bgColor,
          borderRadius: 5,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 22,
              color: color,
              fontWeight: "400",
            }}
          >
            {text}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: color,
              fontWeight: "300",
            }}
          >
            Monthly
          </Text>
        </View>
        <Text
          style={{
            fontSize: 28,
            color: color,
            fontWeight: "600",
          }}
        >
          0
        </Text>
      </View>
    </View>
  );
};

export default Cards;
