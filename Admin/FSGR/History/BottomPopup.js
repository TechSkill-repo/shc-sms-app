import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { serveraddress } from "../../../assets/values/Constants";
import { Image } from "react-native";

const BottomPopup = ({ isVisible, setIsVisible, id }) => {
  const screenHeight = Dimensions.get("screen").height;
  const [data, setData] = useState(null);
  const [imageLoadingBefore, setImageLoadingBefore] = useState(true);
  const [imageLoadingAfter, setImageLoadingAfter] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (serveraddress && id) {
        try {
          const response = await axios.get(`${serveraddress}fsgr/${id}`);
          setData(response.data);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      }
    };
    fetchData();
  }, [id]);

  const getImageUrl = (imagePath) => {
    if (imagePath) {
      const url = `https://shconstruction.co.in/fsgr/${imagePath}`;
      console.log("Image URL:", url);
      return url;
    }
    return null;
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      transparent
      animationType="slide"
    >
      <View style={styles.modalBackground}>
        <ScrollView style={[styles.scrollView, { height: screenHeight * 0.9 }]}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              FSGR locartion - {data?.location}
            </Text>
            <Entypo
              name="cross"
              size={30}
              color="red"
              onPress={() => setIsVisible(false)}
            />
          </View>
          <View style={styles.subHeader}>
            <Text style={styles.subHeaderTitle}>
              Report Date - {data?.workPermitNumber}
            </Text>
            <Text style={styles.subHeaderDate}>
              {data?.createdAt.slice(0, 10)}
            </Text>
          </View>
          <Text style={styles.sectionTitle}>Employee Name</Text>
          <Text style={styles.sectionContent}>{data?.empName}</Text>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.infoLabel}>Employee Designation</Text>
              <Text style={styles.infoText}>{data?.empDesignation}</Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>Incharge Name</Text>
              <Text style={styles.infoText}>{data?.inchargeName}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Site Supervisor</Text>
            <Text style={styles.sectionContent}>{data?.siteSupervisor}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Message</Text>
            <Text style={styles.sectionContent}>{data?.message}</Text>
          </View>
          <View>
            <Text style={styles.infoLabel}>Priority</Text>
            <Text style={styles.infoText}>{data?.priority}</Text>
          </View>
          <View>
            <Text style={styles.infoLabel}>What is the issue</Text>
            <Text style={styles.infoText}>{data?.what_is_the_issue}</Text>
          </View>
          <View>
            <Text style={styles.infoLabel}>what is the fact</Text>
            <Text style={styles.infoText}>{data?.what_is_the_fact}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>where_the_trouble_arrises</Text>
            <Text style={styles.sectionContent}>
              {data?.where_the_trouble_arrises}
            </Text>
          </View>
          <View>
            <Text style={styles.infoLabel}>why_did_the_issue_arrises</Text>
            <Text style={styles.infoText}>
              {data?.why_did_the_issue_arrises}
            </Text>
          </View>
          <View>
            <Text style={styles.infoLabel}>how_sevier_this_is</Text>
            <Text style={styles.infoText}>{data?.how_sevier_this_is}</Text>
          </View>
          <View>
            <Text style={styles.infoLabel}>how_sevier_rating_this_is</Text>
            <Text style={styles.infoText}>
              {data?.how_sevier_rating_this_is}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conclusion</Text>
            <Text style={styles.sectionContent}>{data?.conclusion}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>recommendation</Text>
            <Text style={styles.sectionContent}>{data?.recommendation}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>investigation_done_by</Text>
            <Text style={styles.sectionContent}>
              {data?.investigation_done_by}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>approval_by</Text>
            <Text style={styles.sectionContent}>{data?.approval_by}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>description</Text>
            <Text style={styles.sectionContent}>{data?.description}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>category</Text>
            <Text style={styles.sectionContent}>{data?.category}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>suggestion</Text>
            <Text style={styles.sectionContent}>{data?.suggestion}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>benifits</Text>
            <Text style={styles.sectionContent}>{data?.benifits}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>implementation</Text>
            <Text style={styles.sectionContent}>{data?.implementation}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>date_of_ssi</Text>
            <Text style={styles.sectionContent}>{data?.date_of_ssi}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>duration_of_completion</Text>
            <Text style={styles.sectionContent}>
              {data?.duration_of_completion}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>management and assessment</Text>
            <Text style={styles.sectionContent}>
              {data?.management_and_assessment}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>priority of concern</Text>
            <Text style={styles.sectionContent}>
              {data?.priority_of_concern}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>completion_of_job</Text>
            <Text style={styles.sectionContent}>{data?.completion_of_job}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>accuracy</Text>
            <Text style={styles.sectionContent}>{data?.accuracy}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>rate</Text>
            <Text style={styles.sectionContent}>{data?.rate}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>status</Text>
            <Text style={styles.sectionContent}>{data?.status}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>current_status</Text>
            <Text style={styles.sectionContent}>{data?.currentStatus}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>site Supervisor</Text>
            <Text style={styles.sectionContent}>{data?.site_supervisor}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              initial investigation status
            </Text>
            <Text style={styles.sectionContent}>
              {data?.initial_investigation_status}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>initial investigation team</Text>
            <Text style={styles.sectionContent}>
              {data?.initial_investigation_team}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>resource_planning_done_by</Text>
            <Text style={styles.sectionContent}>
              {data?.resource_planning_done_by}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>planning_date</Text>
            <Text style={styles.sectionContent}>{data?.planning_date}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>heading</Text>
            <Text style={styles.sectionContent}>{data?.heading}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>resource_required</Text>
            <Text style={styles.sectionContent}>{data?.resource_required}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>cancel info</Text>
            <Text style={styles.sectionContent}>{data?.cancelInfo}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conclusion</Text>
            <Text style={styles.sectionContent}>{data?.conclusion}</Text>
            <Text style={styles.sectionContent}>{data?.beforeImage}</Text>
            <Text style={styles.sectionContent}>{data?.afterImage}</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.detailLabel}>Before Image:</Text>
            {data?.beforeImage ? (
              <View>
                {imageLoadingBefore && (
                  <ActivityIndicator size="small" color="#21005d" />
                )}
                <Image
                  source={{
                    uri: getImageUrl(data?.beforeImage),
                  }}
                  style={styles.image}
                  onLoadEnd={() => setImageLoadingBefore(false)}
                  onError={() => {
                    console.error("Failed to load image");
                    setImageLoadingBefore(false);
                  }}
                />
              </View>
            ) : (
              <Text style={styles.detailValue}>No image available</Text>
            )}
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.detailLabel}>After Image:</Text>
            {data?.afterImage ? (
              <View>
                {imageLoadingAfter && (
                  <ActivityIndicator size="small" color="#21005d" />
                )}
                <Image
                  source={{
                    uri: getImageUrl(data?.afterImage),
                  }}
                  style={styles.image}
                  onLoadEnd={() => setImageLoadingAfter(false)}
                  onError={() => {
                    console.error("Failed to load image");
                    setImageLoadingAfter(false);
                  }}
                />
              </View>
            ) : (
              <Text style={styles.detailValue}>No image available</Text>
            )}
          </View>

          {/* <View style={styles.hazardsContainer}>
            <View>
              <Text style={styles.hazardsTitle}>Hazard's Descriptions</Text>
              {hazards.map((haz, index) => (
                <Text key={index} style={styles.hazardItem}>
                  {index + 1}. {haz}
                </Text>
              ))}
            </View>
            <View>
              <Text style={styles.stepsTitle}>Necessary Steps</Text>
              {necessarySteps.map((necessaryStep, index) => (
                <Text key={index} style={styles.hazardItem}>
                  {index + 1}. {necessaryStep}
                </Text>
              ))}
            </View>
          </View> */}

          {/* <View>
            <Text style={styles.attendanceTitle}>Present Workers List</Text>
            {attendance.map((worker, index) => (
              <Text key={index} style={styles.attendanceItem}>
                {index + 1}. {worker}
              </Text>
            ))}
          </View> */}

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

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scrollView: {
    backgroundColor: "#FFF",
    width: "100%",
    marginTop: Dimensions.get("screen").height * 0.1,
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
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
  subHeaderTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#505050",
  },
  subHeaderDate: {
    fontSize: 14,
    fontWeight: "500",
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 12,
    fontWeight: "500",
  },
  sectionContent: {
    fontSize: 20,
    fontWeight: "500",
  },
  infoContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#21005d",
  },
  infoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#505050",
  },
  section: {
    marginTop: 20,
  },
  hazardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  hazardsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f44336",
  },
  hazardItem: {
    margin: 2,
    fontSize: 14,
    marginBottom: 5,
  },
  stepsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4caf50",
  },
  attendanceTitle: {
    fontSize: 16,
    marginTop: 16,
    fontWeight: "600",
    color: "#505050",
  },
  attendanceItem: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
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
