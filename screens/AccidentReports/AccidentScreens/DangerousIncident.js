import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AccidentPopup from "../../../models/AccidentModel/AccidentPopup";
import { serveraddress } from "../../../assets/values/Constants";
import axios from "axios";
import Loading from "../../../assets/logo/Loading.png";

const DangerousIncident = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${serveraddress}accident/dangerous_incident/`
        );
        if (response.data) {
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

    fetchData(); // Fetch data when component mounts
  }, []);

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <Image
          source={Loading}
          style={{
            height: 500,
            width: "100%",
          }}
        />
      ) : data ? (
        data.map((data) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setIsVisible(true);
                setId(data.id);
              }}
              style={styles.container}
              key={data.id}
            >
              <View>
                <Text>{data.Date}</Text>
                <Text
                  style={
                    ([styles.text],
                    {
                      marginRight: 20,
                    })
                  }
                >
                  Location
                  <Text style={styles.text}>
                    {data.Location === null ? "" : data.Location}
                  </Text>
                </Text>
              </View>
              <View>
                <AntDesign
                  name="right"
                  size={20}
                  opacity={0.5}
                  color="#21005d"
                />
              </View>
            </TouchableOpacity>
          );
        })
      ) : dataNotFound === true ? (
        <Text>No data found</Text>
      ) : null}

      <AccidentPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        id={id}
        endPoint="dangerous_incident"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fffbfe",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
    borderRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  color: {
    color: "#21005d",
  },
  text: {
    paddingVertical: 4,
    fontSize: 16,
    fontWeight: "600",

    color: "#21005d",
  },
});

export default DangerousIncident;
