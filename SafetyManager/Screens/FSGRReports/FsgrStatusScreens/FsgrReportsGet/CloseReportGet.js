import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import useAuthStore from "../../../../../store/userAuthStore";
import { serveraddress } from "../../../../../assets/values/Constants";

const CloseReportGet = ({ isVisible, setIsVisible, id }) => {
  const screenHeight = Dimensions.get("screen").height;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [imageLoadingBefore, setImageLoadingBefore] = useState(true);
  const [imageLoadingAfter, setImageLoadingAfter] = useState(true);

  const { role } = useAuthStore((state) => ({
    role: state.role,
  }));

  useEffect(() => {
    if (serveraddress && id) {
      fetchData();
    }
  }, [id, refresh]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${serveraddress}fsgr/${id}`);
      console.log("ssi close====", response.data);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error("Error fetching data:", err);
    }
  };

  if (loading) {
    return (
      <Modal visible={isVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.container, { height: screenHeight * 0.9 }]}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal visible={isVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.container, { height: screenHeight * 0.9 }]}>
            <Text style={styles.errorText}>Error: {error.message}</Text>
          </View>
        </View>
      </Modal>
    );
  }

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
      <View style={styles.modalContainer}>
        <View style={[styles.container, { height: screenHeight * 0.9 }]}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                SSI Close - {data?.location}
              </Text>
              <Entypo
                name="cross"
                size={30}
                color="red"
                onPress={() => setIsVisible(false)}
              />
            </View>
            <View style={styles.subHeader}>
              <Text style={styles.subHeaderText}>{data?.heading}</Text>
              <Text style={styles.dateText}>
                {data?.reportDate.slice(0, 10)}
              </Text>
            </View>
            <View>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.value}>{data?.description}</Text>
            </View>
            <View>
              <Text style={styles.label}>Category</Text>
              <Text style={styles.value}>{data?.category}</Text>
            </View>
            <View>
              <Text style={styles.label}>Suggestion</Text>
              <Text style={styles.value}>{data?.suggestion}</Text>
            </View>
            <View>
              <Text style={styles.label}>Benefits</Text>
              <Text style={styles.value}>{data?.benifits}</Text>
            </View>
            <View>
              <Text style={styles.label}>Implementation</Text>
              <Text style={styles.value}>{data?.implementation}</Text>
            </View>
            <View>
              <Text style={styles.label}>Date of SSI</Text>
              <Text style={styles.value}>
                {data?.date_of_ssi?.slice(0, 10)}
              </Text>
            </View>
            <View>
              <Text style={styles.label}>Duration of Completion</Text>
              <Text style={styles.value}>{data?.duration_of_completion}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.label}>Before Image:</Text>
                {data?.beforeImage ? (
                  <View>
                    {imageLoadingBefore && (
                      <ActivityIndicator size="small" color="#21005d" />
                    )}
                    <Image
                      source={{
                        uri: getImageUrl(data.beforeImage),
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
                <Text style={styles.label}>After Image:</Text>
                {data?.afterImage ? (
                  <View>
                    {imageLoadingAfter && (
                      <ActivityIndicator size="small" color="#21005d" />
                    )}
                    <Image
                      source={{
                        uri: getImageUrl(data.afterImage),
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

          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#4782da1a" }]}
              onPress={() => {
                /* Handle edit action */
              }}
            >
              <Text style={[styles.buttonText, { color: "#4782da" }]}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#4caf501a" }]}
              onPress={() => setIsVisible(false)}
            >
              <Text style={[styles.buttonText, { color: "#4caf50" }]}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "#FFF",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
  },
  contentContainer: {
    paddingBottom: 25,
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
  subHeaderText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#505050",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#21005d",
    marginTop: 20,
  },
  value: {
    fontSize: 16,
    color: "#505050",
    marginTop: 5,
  },
  loadingText: {
    fontSize: 20,
    color: "#21005d",
    textAlign: "center",
  },
  errorText: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default CloseReportGet;
