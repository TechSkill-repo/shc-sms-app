import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome,
  FontAwesome6,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { height } from "../../assets/values/Constants";
import UploadPermit from "./UploadPermit/UploadPermit";

const TbmPage = () => {
  const navigation = useNavigation();

  const [viewUploadPermit, setViewUploadPermit] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fffbfe" />
      <View style={styles.header}>
        <Text style={styles.heading}>Safe Execution Of Job</Text>
        <Text style={styles.subheading}>
          You have to fill all the forms on a daily basis, so that the record is
          maintained. All the details can be seen on the office admin site.
        </Text>
      </View>
      <ScrollView style={styles.centerContent}>
        <View style={styles.content}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.navigate("TbtForm")}
              style={styles.box}
            >
              <FontAwesome6 name="file-waveform" size={30} color="#009245" />
              <Text style={styles.boxText}>TBT FORM</Text>
              <Text style={styles.boxSubText}>
                You can fill the TBM form from here.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("DailyJobPlan")}
              style={styles.box}
            >
              <FontAwesome6 name="person-walking" size={30} color="#009245" />
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
              <Entypo name="tools" size={30} color="#009245" />
              <Text style={styles.boxText}>Tools & Tackles</Text>
              <Text style={styles.boxSubText}>
                You can fill the TBM form from here.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ppeChecklist")}
              style={styles.box}
            >
              <FontAwesome6 name="helmet-safety" size={30} color="#009245" />
              <Text style={styles.boxText}>PPE Check List</Text>
              <Text style={styles.boxSubText}>
                You can fill the TBM form from here.
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setViewUploadPermit(true)}
              style={styles.box}
            >
              <FontAwesome6 name="upload" size={30} color="#009245" />
              <Text style={styles.boxText}>Upload Permit</Text>
              <Text style={styles.boxSubText}>
                Upload the permit from here.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("fsgr")}
              style={styles.box}
            >
              <FontAwesome name="fire" size={30} color="#009245" />
              <Text style={styles.boxTextLarge}>F.S.G.R</Text>
              <Text style={styles.boxSubText}>
                You can fill the TBM form from here.
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.navigate("accidentReport")}
              style={styles.box}
            >
              <MaterialCommunityIcons
                name="traffic-cone"
                size={30}
                color="#009245"
              />
              <Text style={styles.boxTextLarge}>Accident Report</Text>
              <Text style={styles.boxSubText}>
                You can fill the TBM form from here.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <UploadPermit
        setViewUploadPermit={setViewUploadPermit}
        viewUploadPermit={viewUploadPermit}
      />
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
    color: "#009245",
  },
  subheading: {
    fontSize: 13,
    color: "#009245",
    marginTop: 10,
  },
  centerContent: {
    // alignItems: "center",
    // marginBottom: height / 1.5,
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
    borderColor: "#0092451a",
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 10,
    marginVertical: 10,
  },
  boxText: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "600",
    color: "#397d5a",
  },
  boxTextLarge: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: "600",
    color: "#397d5a",
  },
  boxSubText: {
    fontSize: 12,
    color: "gray",
    fontWeight: "300",
  },
});

export default TbmPage;
