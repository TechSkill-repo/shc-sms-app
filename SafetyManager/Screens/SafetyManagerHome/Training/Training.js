import { View, Text, Image } from "react-native";
import React from "react";
import UnderConstruction from "../../../../components/Global/UnderConstruction/UnderConstruction";

const Training = () => {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "white",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Image
        source={{
          uri: "https://media.istockphoto.com/id/1411798446/vector/modern-coming-soon-under-construction-sticker-banner.jpg?s=612x612&w=0&k=20&c=KgQ9eYEfuzTdmc5ypmMYoz8JHPTbe_TjEXxyxNixKQ4=",
        }}
        style={{
          height: "40%",
          width: "100%",
        }}
      />
    </View>
  );
};

export default Training;
