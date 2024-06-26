import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  Image,
  Button,
} from "react-native";
import { PDFReader } from "expo-av";
import React, { useEffect, useState } from "react";
import { serveraddress } from "../../../assets/values/Constants";
import axios from "axios";

const ViewSopPdf = ({ visible, setVisible, pdfId }) => {
  const windowHeight = Dimensions.get("window").height;
  console.log("pdf id==", pdfId);
  const [pdfUri, setPdfUri] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPdf = async () => {
      const uri = `${serveraddress}sop/viewpdf/${pdfId}`;
      axios
        .get(uri)
        .then((res) => {
          setPdfUri(res);
          console.log("sop:", res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchPdf();
  }, [pdfId]);
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
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
            height: windowHeight * 0.1, // 70% of the screen height
            marginTop: windowHeight * 0.0, // 30% from the top
            padding: 25,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#21005d",
                width: 80,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 30,
              }}
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
          {loading && <Button title="Loading PDF..." disabled />}
          {!loading && pdfUri && <PDFReader source={{ uri: pdfUri }} />}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ViewSopPdf;
