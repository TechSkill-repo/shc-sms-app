import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";

const Step3 = ({ onNext, onPrev, formData, setFormData }) => {
  return (
    <ScrollView
      style={{
        width: "100%",
        height: "100%",
        // justifyContent: "center",
        flexDirection: "column",
        // alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 120,
          backgroundColor: "#ffaa00a1",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              color: "#2e2d6e",
              fontSize: 22,
              marginLeft: 0,
              fontWeight: "600",
            }}
          >
            3.) Safety Contract & Reviews
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: 14,
            paddingHorizontal: 5,
            paddingVertical: 5,
            fontWeight: "600",
            color: "#00308F",
          }}
        >
          1.) Safety Contract review of action items from last meetings.
        </Text>
      </View>

      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          width: "100%",
        }}
      >
        <TextInput
          style={{
            paddingHorizontal: 12,
            paddingVertical: 12,
            width: "90%",
            backgroundColor: "#F5F5F5",
            elevation: 3,
            borderRadius: 5,
            color: "black",
          }}
          placeholder="Type your answer..."
          multiline={true} // Allow multiline input
          numberOfLines={4} // Set maximum number of lines
          textAlignVertical="top"
          onChangeText={(safetyContractReviewItems)=>{setFormData({...formData, safetyContractReviewItems})}}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: 14,
            paddingHorizontal: 10,
            paddingVertical: 5,
            fontWeight: "600",
            color: "#00308F",
          }}
        >
          2.) Items of General Safety Importance to the total work site.
        </Text>
        <Text
          style={{
            marginHorizontal: 10,
            marginRight: 50,
            fontSize: 12,
            marginBottom: 20,
            color: "gray",
            fontWeight: "300",
            color: "#2c8fff",
          }}
        >
          Ask employee to mention any Incident/near miss duration that past day
          which may have or have resulted into damage to property or injury yo
          company or Contract personnel
        </Text>
        <TextInput
          style={{
            paddingHorizontal: 12,
            paddingVertical: 12,
            width: "90%",
            backgroundColor: "#F5F5F5",
            elevation: 3,
            borderRadius: 5,
            color: "black",
          }}
          placeholder="Type your answer..."
          multiline={true} // Allow multiline input
          numberOfLines={4} // Set maximum number of lines
          textAlignVertical="top"
          onChangeText={(itemsOfGeneralSafetyImportance)=>{setFormData({...formData, itemsOfGeneralSafetyImportance})}}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: 14,
            paddingHorizontal: 5,
            paddingVertical: 5,
            fontWeight: "600",
            color: "#00308F",
          }}
        >
          3.) Items of Safety Interest to this Group.
        </Text>
        <Text
          style={{
            marginHorizontal: 10,
            marginRight: 50,
            fontSize: 12,
            marginBottom: 0,
            color: "gray",
            fontWeight: "300",
            color: "#2c8fff",
          }}
        >
          Red Strips, Orange Strips, Green Strips, Safety-alert tips for Satefy
          communications, hazards or Safety conditions applicable to this
          group's work area
        </Text>
      </View>

      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          width: "100%",
        }}
      >
        <TextInput
          style={{
            paddingHorizontal: 12,
            paddingVertical: 12,
            width: "90%",
            backgroundColor: "#F5F5F5",
            elevation: 3,
            borderRadius: 5,
            color: "black",
          }}
          placeholder="Please provide any queries you may have on the above..."
          multiline={true} // Allow multiline input
          numberOfLines={4} // Set maximum number of lines
          textAlignVertical="top"
          onChangeText={(queries)=>{setFormData({...formData, queries})}}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginTop: 40,
        }}
      >
        <TouchableOpacity
          onPress={onPrev}
          style={{
            backgroundColor: "#2e2d6e",
            padding: 10,
            borderRadius: 50,
          }}
        >
          {/* <Button title="Next" onPress={onNext} /> */}
          <Text
            style={{
              paddingHorizontal: 20,
              paddingVertical: 0,
              fontSize: 16,
              textAlign: "center",
              fontWeight: "500",
              color: "white",
            }}
          >
            Prev
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#2e2d6e",
            padding: 10,
            borderRadius: 50,
            marginLeft: 10,
          }}
          onPress={onNext}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                paddingHorizontal: 20,
                paddingVertical: 0,
                fontSize: 16,
                textAlign: "center",
                fontWeight: "500",
                color: "white",
              }}
            >
              Next
            </Text>
            <AntDesign name="right" size={18} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Step3;
