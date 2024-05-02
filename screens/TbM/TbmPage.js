import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  AntDesign,
  FontAwesome,
  FontAwesome6,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const TbmPage = () => {
  const navigation = useNavigation();

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentDate(formatDate(date));
    }, 1000); // Update the current date every second

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  const formatDate = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = monthNames[monthIndex];
    return `${day} - ${month} - ${year}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fffbfe" />
      <View
        style={{
          height: "25%",
          backgroundColor: "#fffbfe",
        }}
      >
        <Text style={styles.heading}>Tool Box Meeting</Text>
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 13,
            color: "#21005d",
          }}
        >
          You have to fill all the form on the daily basis, so that the record
          is been maintained. All the details are been able to see on office
          admin site.
        </Text>
        <Text></Text>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TbtForm");
            }}
            style={[styles.box, { borderTopWidth: 1, borderRightWidth: 1 }]}
          >
            <FontAwesome6 name="file-waveform" size={40} color="#318CE7" />
            <Text
              style={{
                marginTop: 20,
                fontSize: 18,
                fontWeight: "600",
                color: "rgb(120, 69, 172)",
              }}
            >
              TBT FORM
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DailyJobPlan");
            }}
            style={[styles.box, { borderTopWidth: 1 }]}
          >
            <FontAwesome6 name="person-walking" size={40} color="#17B169" />
            <Text
              style={{
                marginTop: 20,
                fontSize: 18,
                fontWeight: "600",
                color: "rgb(120, 69, 172)",
              }}
            >
              Daily Job Plan
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.box, { borderTopWidth: 1, borderRightWidth: 1 }]}
            onPress={() => {
              navigation.navigate("toolsTackles");
            }}
          >
            <Entypo name="tools" size={40} color="#b87333" />
            <Text
              style={{
                marginTop: 20,
                fontSize: 18,
                fontWeight: "600",
                color: "rgb(120, 69, 172)",
              }}
            >
              Tools & Tackles
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ppeChecklist");
            }}
            style={[styles.box, { borderTopWidth: 1 }]}
          >
            <FontAwesome6 name="helmet-safety" size={40} color="#FEBE10" />
            <Text
              style={{
                marginTop: 20,
                fontSize: 18,
                fontWeight: "600",
                color: "rgb(120, 69, 172)",
              }}
            >
              PPE Check List
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("fsgr");
            }}
            style={[
              styles.box,
              { borderTopWidth: 1, borderBottomWidth: 1, borderRightWidth: 1 },
            ]}
          >
            <FontAwesome name="fire" size={40} color="#FF0000" />
            <Text
              style={{
                marginTop: 20,
                fontSize: 20,
                fontWeight: "600",
                color: "rgb(120, 69, 172)",
              }}
            >
              F.S.G.R
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("accidentReport");
            }}
            style={[styles.box, { borderTopWidth: 1, borderBottomWidth: 1 }]}
          >
            <MaterialCommunityIcons
              name="traffic-cone"
              size={40}
              color="#ee7600"
            />
            <Text
              style={{
                marginTop: 20,
                fontSize: 20,
                fontWeight: "600",
                color: "rgb(120, 69, 172)",
              }}
            >
              Accident Report
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  heading: {
    fontSize: 25,
    fontWeight: "600",
    color: "#21005d",
    paddingHorizontal: 20,
    paddingVertical: 20,
    // marginBottom: 20,
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 10,
  },
  box: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "50%", // Adjust width as needed
    height: 165, // Adjust height as needed
    borderColor: "#21005d1a",
  },
});

export default TbmPage;
