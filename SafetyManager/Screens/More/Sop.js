import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";

const Sop = () => {
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "#fffbfe",
          width: "90%",
          marginTop: 20,
          marginLeft: 20,
          elevation: 5,
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500", color: "#21005d" }}>
          Cable Wire SOP
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#21005d",
            marginTop: 5,
            fontWeight: "300",
          }}
        >
          Short Discription about cable wire sop
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 15,
            backgroundColor: "#376fd01a",
            width: "25%",
            padding: 5,
            borderRadius: 5,
            textAlign: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#376fd0",
              fontWeight: "500",
              fontSize: 12,
            }}
          >
            View SOP
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "#fffbfe",
          width: "90%",
          marginTop: 20,
          marginLeft: 20,
          elevation: 5,
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500", color: "#21005d" }}>
          Iron Hammer SOP
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#21005d",
            marginTop: 5,
            fontWeight: "300",
          }}
        >
          Short Discription about Iron Hammer sop
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 15,
            backgroundColor: "#376fd01a",
            width: "25%",
            padding: 5,
            borderRadius: 5,
            textAlign: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#376fd0",
              fontWeight: "500",
              fontSize: 12,
            }}
          >
            View SOP
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "#fffbfe",
          width: "90%",
          marginTop: 20,
          marginLeft: 20,
          elevation: 5,
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500", color: "#21005d" }}>
          Fire Jaket SOP
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#21005d",
            marginTop: 5,
            fontWeight: "300",
          }}
        >
          Short Discription about Fire Jaket sop
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 15,
            backgroundColor: "#376fd01a",
            width: "25%",
            padding: 5,
            borderRadius: 5,
            textAlign: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#376fd0",
              fontWeight: "500",
              fontSize: 12,
            }}
          >
            View SOP
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Sop;
