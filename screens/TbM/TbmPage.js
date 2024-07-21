import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome,
  FontAwesome6,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const TbmPage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fffbfe" />
      <View style={styles.header}>
        <Text style={styles.heading}>Tool Box Meeting</Text>
        <Text style={styles.subheading}>
          You have to fill all the forms on a daily basis, so that the record is
          maintained. All the details can be seen on the office admin site.
        </Text>
      </View>
      <View style={styles.centerContent}>
        <View style={styles.content}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.navigate("TbtForm")}
              style={styles.box}
            >
              <FontAwesome6 name="file-waveform" size={30} color="#21005d" />
              <Text style={styles.boxText}>TBT FORM</Text>
              <Text style={styles.boxSubText}>
                You can fill the TBM form from here.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("DailyJobPlan")}
              style={styles.box}
            >
              <FontAwesome6 name="person-walking" size={30} color="#21005d" />
              <Text style={styles.boxText}>Daily Job Plan</Text>
              <Text style={styles.boxSubText}>
                You can fill the TBM form from here.
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.navigate("toolsTackles")}
              style={styles.box}
            >
              <Entypo name="tools" size={30} color="#21005d" />
              <Text style={styles.boxText}>Tools & Tackles</Text>
              <Text style={styles.boxSubText}>
                You can fill the TBM form from here.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ppeChecklist")}
              style={styles.box}
            >
              <FontAwesome6 name="helmet-safety" size={30} color="#21005d" />
              <Text style={styles.boxText}>PPE Check List</Text>
              <Text style={styles.boxSubText}>
                You can fill the TBM form from here.
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.navigate("fsgr")}
              style={styles.box}
            >
              <FontAwesome name="fire" size={30} color="#21005d" />
              <Text style={styles.boxTextLarge}>F.S.G.R</Text>
              <Text style={styles.boxSubText}>
                You can fill the TBM form from here.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("accidentReport")}
              style={styles.box}
            >
              <MaterialCommunityIcons
                name="traffic-cone"
                size={30}
                color="#21005d"
              />
              <Text style={styles.boxTextLarge}>Accident Report</Text>
              <Text style={styles.boxSubText}>
                You can fill the TBM form from here.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: "25%",
    backgroundColor: "#fffbfe",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: "600",
    color: "#21005d",
  },
  subheading: {
    fontSize: 13,
    color: "#21005d",
    marginTop: 10,
  },
  centerContent: {
    alignItems: "center",
  },
  content: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  box: {
    justifyContent: "center",
    paddingHorizontal: 15,
    width: "48%",
    height: 165,
    borderColor: "#21005d1a",
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 10,
    marginVertical: 10,
  },
  boxText: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "600",
    color: "rgb(120, 69, 172)",
  },
  boxTextLarge: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: "600",
    color: "rgb(120, 69, 172)",
  },
  boxSubText: {
    fontSize: 12,
    color: "gray",
    fontWeight: "300",
  },
});

export default TbmPage;
