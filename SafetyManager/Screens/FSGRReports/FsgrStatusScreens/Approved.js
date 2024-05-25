import { View, Text } from "react-native";
import React from "react";

const Approved = () => {
  return (
    <View
      style={{
        flex: 1, // Take up the full screen
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
      }}
    >
      <View
        style={{
          width: "90%", // Adjust the width as needed
          justifyContent: "center",
          backgroundColor: "white", // Set background color to see the centered view more clearly
          borderRadius:5,
          elevation:5,
          marginBottom:10
        }}
      >
        <View  style={{
            flexDirection: "row",
            justifyContent:"space-between",
            padding:10,
            alignItems:"center"
          }}>
        <View>
          <Text style={{
            fontSize:16,
            fontWeight:600,
            color:"#505050"
          }}>24 May 2024</Text>
          <Text style={{
            paddingVertical:5,
            fontWeight:700,
            fontSize:18,
            color:"#21005d"
          }}>Rmm E22</Text>
        </View>
        <View>
          <View style={{
            backgroundColor:"#fff4e5",
            paddingHorizontal:20,
            paddingVertical:5,
            borderRadius:5
          }}>
            <Text style={{
              fontSize:12,
              fontWeight:600,
              color:"#663c00"
            }}>Pending</Text>
          </View>
        </View>
        </View>
      </View>
    </View>
  );
};

export default Approved;
