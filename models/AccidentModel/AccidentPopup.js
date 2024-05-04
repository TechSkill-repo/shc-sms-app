import {
  View,
  Text,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { serveraddress } from "../../assets/values/Constants";

const AccidentPopup = ({ isVisible, setIsVisible, id, endPoint }) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${serveraddress}accident/${endPoint}/${id}`
        );
        if (response.data) {
          console.log(response.data);
          setData(response.data);
        } else {
          setDataNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
            height: windowHeight * 0.6, // 70% of the screen height
            marginTop: windowHeight * 0.4, // 30% from the top
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
              Accident Details{id}
            </Text>
            <Entypo
              name="cross"
              size={30}
              color="red"
              onPress={() => setIsVisible(false)}
            />
          </View>
          <View>
            {/* <Text>{id}</Text> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 12,
                    color: "#21005d",
                  }}
                >
                  Date
                </Text>
                <Text style={{ fontWeight: "600", color: "#505050" }}>
                  12 - 04 - 2024
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 12,
                    color: "#21005d",
                  }}
                >
                  Location
                </Text>
                <Text
                  style={{ fontWeight: "600", color: "#505050", fontSize: 18 }}
                >
                  {data.Location}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 0,
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 12,
                    color: "#21005d",
                  }}
                >
                  Safety Supervisor
                </Text>
                <Text
                  style={{ fontWeight: "600", color: "#505050", marginTop: 2 }}
                >
                  {data.SupervisorName}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 12,
                    color: "#21005d",
                  }}
                >
                  Person Name
                </Text>
                <Text style={{ fontWeight: "600", color: "#505050" }}>
                  {data.PersonName}
                </Text>
              </View>
            </View>
            <Text
              style={{
                marginTop: 20,
                fontWeight: "600",
                fontSize: 16,
                color: "#e32636",
              }}
            >
              Incident Report
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 15,
                fontWeight: "400",
                color: "#505050",
                letterSpacing: 0,
                lineHeight: 25,
              }}
            >
              {data.Message}
            </Text>
          </View>
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

export default AccidentPopup;
