import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState } from "react";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import Toast from "react-native-toast-message";

const ViewSopPdf = ({ visible, setVisible, pdfId, pdfName }) => {
  const windowHeight = Dimensions.get("window").height;
  const [downloading, setDownloading] = useState(false);

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "PDF Downloaded Successfully",
      visibilityTimeout: 5000,
      position: "top",
    });
  };

  const downloadPdfFromUrl = async () => {
    setDownloading(true);
    try {
      const baseUrl = `https://shconstruction.co.in/sop/`;
      const fileName = pdfName ? pdfName : "";
      const fileUri = FileSystem.documentDirectory + fileName;
      const directoryUri = FileSystem.documentDirectory;
      const directoryInfo = await FileSystem.getInfoAsync(directoryUri);

      if (!directoryInfo.exists) {
        await FileSystem.makeDirectoryAsync(directoryUri, {
          intermediates: true,
        });
      }
      const result = await FileSystem.downloadAsync(
        baseUrl + fileName,
        fileUri
      );
      setDownloading(false);
      if (result.status === 200) {
        showToast();
      }
      await save(result.uri, fileName, result.headers["content-type"]);
    } catch (error) {
      setDownloading(false);
      console.log("Error: download PDF", error);
    }
  };

  const save = async (uri, fileName, mimetype) => {
    try {
      // if (Platform.OS === "android") {
      //   const permission =
      //     await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      //   if (permission.granted) {
      //     const base64 = await FileSystem.readAsStringAsync(uri, {
      //       encoding: FileSystem.EncodingType.Base64,
      //     });
      //     await FileSystem.StorageAccessFramework.createFileAsync(
      //       permission.directoryUri,
      //       fileName,
      //       mimetype
      //     )
      //       .then(async (url) => {
      //         await FileSystem.writeAsStringAsync(url, base64, {
      //           encoding: FileSystem.EncodingType.Base64,
      //         });
      //       })
      //       .catch((err) => {
      //         console.log("Error: on saving file", err);
      //       });
      //   } else {
      //     shareAsync(uri);
      //   }
      // }
      await shareAsync(uri);
    } catch (error) {
      console.log("Error file sharing", error);
    }
  };
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
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <ScrollView
          style={{
            backgroundColor: "#FFF",
            width: "100%",
            height: windowHeight * 0.1,
            marginTop: windowHeight * 0.1,
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
                backgroundColor: "#009245",
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
          <View style={{ marginTop: 20 }}>
            <Text style={{ alignSelf: "center", fontSize: 22 }}>
              View SOP PDF{" "}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              downloadPdfFromUrl();
            }}
            style={{
              backgroundColor: "#41B06E",
              width: 200,
              height: 50,
              borderRadius: 10,
              alignSelf: "center",
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {downloading ? (
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                Downloading...
              </Text>
            ) : (
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                View PDF
              </Text>
            )}
            {pdfName === "" ? (
              <View>
                <Text style={{ alignSelf: "center", color: "orange" }}>
                  PDF file not available!
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </ScrollView>
        <Toast />
      </View>
    </Modal>
  );
};

export default ViewSopPdf;
