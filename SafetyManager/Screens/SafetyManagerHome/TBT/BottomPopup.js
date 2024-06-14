import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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
            `${serveraddress}forms/tbm-form/${id}`
          );
          setData(response.data);
        } catch (err) {
          setError(err);
          console.error("Error fetching data:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

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
      <View style={styles.modalBackground}>
        <ScrollView style={[styles.container, { height: screenHeight * 0.9 }]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>TBM Report - {data?.location}</Text>
            <Entypo
              name="cross"
              size={30}
              color="red"
              onPress={() => setIsVisible(false)}
            />
          </View>
          <View style={styles.subHeader}>
            <Text style={styles.permitText}>
              Permit No. {data?.permitNumber}
            </Text>
            <Text style={styles.dateText}>{data?.createdAt.slice(0, 10)}</Text>
          </View>
          <DetailRow
            label="Company Supervisor"
            value={data?.companySupervisor}
          />
          <DetailRow
            label="Safety Representative"
            value={data?.safetyRepresentative}
          />
          <DetailRow label="Department" value={data?.department} />
          <DetailRow
            label="Contractor Representative"
            value={data?.contractorRepresentative}
          />
          <DetailRow
            label="Contractor Employee"
            value={data?.contractorEmployee}
          />
          <DetailRow
            label="Safety Contract Review Items"
            value={data?.safetyContractReviewItemsL}
          />
          <TextBlock
            label="Items of General Safety Importance"
            value={data?.itemsOfGeneralSafetyImportance}
          />
          <TextBlock label="Queries" value={data?.queries} />
          <TextBlock label="Standard Operating Procedure" value={data?.sop} />
          <TextBlock label="Responsibilities" value={data?.responsibilities} />
          <TextBlock label="Safety Message" value={data?.safetyMessage} />
          <TextBlock
            label="Total Number of People Assign"
            value={data?.totalNumberOfPeopleAssign}
          />
          <View style={styles.textBlock}>
            <Text style={styles.textBlockLabel}>
              Total Number of People Present
            </Text>
            <Text style={styles.textBlockValue}>
              {data?.attendance
                .map((attn, index) => `${index + 1}. ${attn}`)
                .join(" ")}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Verified</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const TextBlock = ({ label, value }) => (
  <View style={styles.textBlock}>
    <Text style={styles.textBlockLabel}>{label}</Text>
    <Text style={styles.textBlockValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "#FFF",
    width: "100%",
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#21005d",
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  permitText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#505050",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
  },
  detailRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#21005d",
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#505050",
  },
  textBlock: {
    marginTop: 20,
  },
  textBlockLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#21005d",
  },
  textBlockValue: {
    marginTop: 10,
    fontSize: 16,
    color: "#505050",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  button: {
    width: "90%",
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    borderRadius: 50,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default BottomPopup;
