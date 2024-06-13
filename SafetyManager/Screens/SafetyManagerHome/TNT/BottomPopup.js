import { View, Text, Modal, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { serveraddress } from "../../../../assets/values/Constants";

const BottomPopup = ({ isVisible, setIsVisible, id }) => {
  const screenHeight = Dimensions.get("screen").height;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (serveraddress && id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${serveraddress}forms/tools-tackles/${id}`
          );
          setData(response.data);
        } catch (err) {
          setError(err);
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    }
  }, [id]);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

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
                fontWeight: "500",
                color: "#21005d",
              }}
            >
              Daily job plans - {data?.location}
            </Text>
            <Entypo
              name="cross"
              size={30}
              color="red"
              onPress={() => setIsVisible(false)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                color: "#505050",
              }}
            >
              {data?.heading}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              {data?.createdAt.slice(0, 10)}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 22,
                paddingTop: 10,
              }}
            >
              {data?.empName}
            </Text>
            <Text
              style={{
                fontSize: 13,
              }}
            >
              {data?.nameOfSupervisor}
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    color: "#21005d",
                  }}
                >
                  Incharge Name
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#505050",
                  }}
                >
                  {data?.inchargeName}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    color: "#21005d",
                  }}
                >
                  Site Supervisor Name
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#505050",
                  }}
                >
                  {data?.siteSupervisor}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: "#21005d",
              }}
            >
              Reporting Message/Issue
            </Text>
            <Text style={{ marginTop: 10 }}>{data?.message}</Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default BottomPopup;
