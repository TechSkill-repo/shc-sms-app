// import {
//   Alert,
//   Dimensions,
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   TextInput,
//   Platform,
//   ActivityIndicator,
//   Image,
//   ActivityIndicatorBase,
// } from "react-native";
// import React, { useState } from "react";
// import StepFormNavigation from "../../components/StepFormNavigation/StepFormNavigation";
// import { Entypo } from "@expo/vector-icons";
// import axios from "axios";
// import { serveraddress } from "../../../assets/values/Constants";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import * as ImagePicker from "expo-image-picker";

// const SsiCloseReport = ({ isVisible, setIsVisible, id, beforeImage }) => {
//   const screenHeight = Dimensions.get("screen").height;
//   const [dateOfSsi, setDateOfSsi] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [photoUri, setPhotoUri] = useState(null);
//   const [imageLoadingBefore, setImageLoadingBefore] = useState(true);

//   console.log("before image popop======", beforeImage[0].beforeImage);
//   const [formData, setFormData] = useState({
//     description: "",
//     category: "",
//     suggestion: "",
//     benifits: "",
//     implementation: "",
//     date_of_ssi: "",
//     duration_of_completion: "",
//     afterImage: null,
//     status: "close",
//   });

//   const handleInputChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || dateOfSsi;
//     setShowDatePicker(Platform.OS === "ios");
//     setDateOfSsi(currentDate);

//     const formattedDate = new Intl.DateTimeFormat("en-CA", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//     }).format(currentDate);

//     handleInputChange("date_of_ssi", formattedDate);
//   };

//   const showDatepicker = () => {
//     setShowDatePicker(true);
//   };

//   const validateForm = () => {
//     for (const key in formData) {
//       if (formData[key] === null || formData[key].trim() === "") {
//         Alert.alert("Validation Error", `Please fill out the ${key} field.`);
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     if (!validateForm()) {
//       setLoading(false);
//       return;
//     }
//     try {
//       const formDataNew = new FormData();

//       formDataNew.append("description", formData.description);
//       formDataNew.append("category", formData.category);
//       formDataNew.append("suggestion", formData.suggestion);
//       formDataNew.append("benifits", formData.benifits);
//       formDataNew.append("implementation", formData.implementation);
//       formDataNew.append("date_of_ssi", formData.date_of_ssi);
//       formDataNew.append(
//         "duration_of_completion",
//         formData.duration_of_completion
//       );
//       formDataNew.append("status", "close");

//       if (photoUri) {
//         const filename = photoUri.split("/").pop();
//         const match = /\.(\w+)$/.exec(filename);
//         const type = match ? `image/${match[1]}` : `image`;

//         formDataNew.append("afterImage", {
//           uri: photoUri,
//           name: filename,
//           type: type,
//         });
//       }
//       const response = await fetch(`${serveraddress}fsgr/form/${id}/`, {
//         method: "PATCH",
//         body: formDataNew,
//         headers: {
//           "Content-Type": "multipart/form-data", // Ensure correct content type
//         },
//       });
//       if (!response.ok) {
//         const responseData = await response.text();
//         console.error("Server response:", responseData);
//         throw new Error("Network response was not ok");
//       }
//       setLoading(false);
//       Alert.alert("Success", "Form Submitted Successfully");
//       setIsVisible(false);
//     } catch (error) {
//       setLoading(false);
//       Alert.alert("Error", "Failed to submit form");
//     }
//   };

//   const handleCameraPress = async () => {
//     try {
//       const { status } = await ImagePicker.requestCameraPermissionsAsync();
//       if (status !== "granted") {
//         alert("Sorry, we need camera permissions to make this work!");
//         return;
//       }

//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.canceled) {
//         // setPhotoUri(result.assets[0].uri);

//         const uri = result.assets[0].uri;
//         setPhotoUri(uri);
//         handleInputChange("afterImage", uri);
//         console.log("Photo URI:", uri);
//       }
//     } catch (error) {
//       console.error("Error taking photo:", error);
//     }
//   };

//   const getImageUrl = (imagePath) => {
//     if (imagePath) {
//       const url = `https://shconstruction.co.in/fsgr/form/${imagePath}`;
//       console.log("Image URL:", url);
//       return url;
//     }
//     return null;
//   };

//   console.log("before image ssi:", beforeImage);

//   return (
//     <Modal
//       visible={isVisible}
//       onRequestClose={() => setIsVisible(false)}
//       transparent
//       animationType="slide"
//     >
//       <View style={styles.modalContainer}>
//         <ScrollView
//           style={[
//             styles.scrollView,
//             { height: screenHeight * 0.95, marginTop: screenHeight * 0.05 },
//           ]}
//         >
//           <View style={styles.header}>
//             <Text style={styles.headerText}>SSI CLOSE Report</Text>
//             <TouchableOpacity onPress={() => setIsVisible(false)}>
//               <Entypo name="cross" size={30} color="red" />
//             </TouchableOpacity>
//           </View>
//           <StepFormNavigation stepNo={3} />
//           <View style={styles.formContainer}>
//             {[
//               { label: "Description", name: "description", multiline: true },
//               { label: "Category", name: "category", multiline: true },
//               { label: "Suggestion", name: "suggestion", multiline: true },
//               { label: "Benifits", name: "benifits", multiline: true },
//               {
//                 label: "Implementation",
//                 name: "implementation",
//                 multiline: true,
//               },
//               {
//                 label: "Duration of completion",
//                 name: "duration_of_completion",
//                 multiline: false,
//               },
//             ].map((field, index) => (
//               <View key={index} style={styles.inputGroup}>
//                 <Text style={styles.label}>{field.label}</Text>
//                 <TextInput
//                   placeholder={`Enter the ${field.label.toLowerCase()}...`}
//                   multiline={field.multiline}
//                   numberOfLines={field.multiline ? 3 : 1}
//                   textAlignVertical="top"
//                   onChangeText={(text) => handleInputChange(field.name, text)}
//                   style={styles.textInput}
//                 />
//               </View>
//             ))}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Date of SSI</Text>
//               <TouchableOpacity onPress={showDatepicker}>
//                 <TextInput
//                   value={dateOfSsi.toLocaleDateString()}
//                   editable={false}
//                   style={styles.textInput}
//                 />
//               </TouchableOpacity>
//             </View>
//             {showDatePicker && (
//               <DateTimePicker
//                 testID="dateTimePicker"
//                 value={dateOfSsi}
//                 mode="date"
//                 is24Hour={true}
//                 display="default"
//                 onChange={onChange}
//               />
//             )}
//             <View style={{ marginTop: 10 }}>
//               <Text style={styles.detailLabel}>Before Image:</Text>
//               {beforeImage[0].beforeImage ? (
//                 <View>
//                   {imageLoadingBefore && (
//                     <ActivityIndicatorBase size="small" color="#21005d" />
//                   )}
//                   <Image
//                     source={{
//                       uri: getImageUrl(beforeImage),
//                     }}
//                     style={styles.image}
//                     onLoadEnd={() => setImageLoadingBefore(false)}
//                     onError={() => {
//                       console.error("Failed to load image");
//                       setImageLoadingBefore(false);
//                     }}
//                   />
//                 </View>
//               ) : (
//                 <Text style={styles.detailValue}>No image available</Text>
//               )}
//             </View>
//             <View style={{ marginVertical: 10 }}>
//               <Text style={styles.detailLabel}>After Image:</Text>
//               {photoUri && (
//                 <Image source={{ uri: photoUri }} style={styles.image} />
//               )}
//             </View>
//             <View style={styles.cameraButtonContainer}>
//               <TouchableOpacity
//                 style={styles.cameraButton}
//                 onPress={handleCameraPress}
//               >
//                 <Entypo name="camera" size={22} color="#6750a4" />
//                 <Text style={styles.cameraButtonText}>After Image</Text>
//               </TouchableOpacity>
//             </View>
//             {/* {formData.afterImage && (
//               <View style={styles.imagePreviewContainer}>
//                 <Image
//                   source={{ uri: formData.after_image }}
//                   style={styles.imagePreview}
//                 />
//               </View>
//             )} */}
//             <TouchableOpacity
//               onPress={handleSubmit}
//               style={styles.submitButton}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator size="small" color="#FFF" />
//               ) : (
//                 <Text style={styles.submitButtonText}>Submit</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </View>
//     </Modal>
//   );
// };

// export default SsiCloseReport;

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   scrollView: {
//     backgroundColor: "#FFF",
//     width: "100%",
//     padding: 25,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   headerText: {
//     fontWeight: "500",
//     fontSize: 18,
//     color: "#21005d",
//   },
//   formContainer: {
//     marginBottom: 20,
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     paddingHorizontal: 10,
//     fontWeight: "500",
//     paddingVertical: 5,
//     color: "#21005d",
//     marginBottom: 5,
//   },
//   textInput: {
//     backgroundColor: "white",
//     elevation: 2,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   cameraButtonContainer: {
//     marginBottom: 15,
//   },
//   cameraButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#6750a41a",
//     padding: 6,
//     borderRadius: 50,
//   },
//   cameraButtonText: {
//     marginLeft: 20,
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#6750a4",
//   },
//   imagePreviewContainer: {
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   imagePreview: {
//     width: "100%",
//     height: 200,
//     borderRadius: 10,
//   },
//   submitButton: {
//     backgroundColor: "#21005d",
//     padding: 10,
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 30,
//     borderRadius: 5,
//   },
//   submitButtonText: {
//     color: "white",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   detailLabel: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#21005d",
//   },
//   detailValue: {
//     fontSize: 16,
//     color: "#555",
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     borderRadius: 5,
//     marginTop: 10,
//   },
// });


import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState } from "react";
import StepFormNavigation from "../../components/StepFormNavigation/StepFormNavigation";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { serveraddress } from "../../../assets/values/Constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

const SsiCloseReport = ({ isVisible, setIsVisible, id, beforeImage }) => {
  const screenHeight = Dimensions.get("screen").height;
  const [dateOfSsi, setDateOfSsi] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [imageLoadingBefore, setImageLoadingBefore] = useState(true);

  const [formData, setFormData] = useState({
    description: "",
    category: "",
    suggestion: "",
    benifits: "",
    implementation: "",
    date_of_ssi: "",
    duration_of_completion: "",
    afterImage: null,
    status: "close",
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfSsi;
    setShowDatePicker(Platform.OS === "ios");
    setDateOfSsi(currentDate);

    const formattedDate = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(currentDate);

    handleInputChange("date_of_ssi", formattedDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const validateForm = () => {
    for (const key in formData) {
      if (formData[key] === null || formData[key].trim() === "") {
        Alert.alert("Validation Error", `Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    try {
      const formDataNew = new FormData();

      formDataNew.append("description", formData.description);
      formDataNew.append("category", formData.category);
      formDataNew.append("suggestion", formData.suggestion);
      formDataNew.append("benifits", formData.benifits);
      formDataNew.append("implementation", formData.implementation);
      formDataNew.append("date_of_ssi", formData.date_of_ssi);
      formDataNew.append(
        "duration_of_completion",
        formData.duration_of_completion
      );
      formDataNew.append("status", "close");

      if (photoUri) {
        const filename = photoUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formDataNew.append("afterImage", {
          uri: photoUri,
          name: filename,
          type: type,
        });
      }
      const response = await fetch(`${serveraddress}fsgr/form/${id}/`, {
        method: "PATCH",
        body: formDataNew,
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct content type
        },
      });
      if (!response.ok) {
        const responseData = await response.text();
        console.error("Server response:", responseData);
        throw new Error("Network response was not ok");
      }
      setLoading(false);
      Alert.alert("Success", "Form Submitted Successfully");
      setIsVisible(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to submit form");
    }
  };

  const handleCameraPress = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setPhotoUri(uri);
        handleInputChange("afterImage", uri);
        console.log("Photo URI:", uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  const getImageUrl = (imagePath) => {
    if (imagePath) {
      const url = `${serveraddress}violation/${imagePath}`;
      console.log("Image URL:", url);
      return url;
    }
    return null;
  };

  console.log("before image ssi:", beforeImage);

  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      transparent
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <ScrollView
          style={[
            styles.scrollView,
            { height: screenHeight * 0.95, marginTop: screenHeight * 0.05 },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>SSI CLOSE Report</Text>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Entypo name="cross" size={30} color="red" />
            </TouchableOpacity>
          </View>
          <StepFormNavigation stepNo={3} />
          <View style={styles.formContainer}>
            {[
              { label: "Description", name: "description", multiline: true },
              { label: "Category", name: "category", multiline: true },
              { label: "Suggestion", name: "suggestion", multiline: true },
              { label: "Benifits", name: "benifits", multiline: true },
              {
                label: "Implementation",
                name: "implementation",
                multiline: true,
              },
              {
                label: "Duration of completion",
                name: "duration_of_completion",
                multiline: false,
              },
            ].map((field, index) => (
              <View key={index} style={styles.inputGroup}>
                <Text style={styles.label}>{field.label}</Text>
                <TextInput
                  placeholder={`Enter the ${field.label.toLowerCase()}...`}
                  multiline={field.multiline}
                  numberOfLines={field.multiline ? 3 : 1}
                  textAlignVertical="top"
                  onChangeText={(text) => handleInputChange(field.name, text)}
                  style={styles.textInput}
                />
              </View>
            ))}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of SSI</Text>
              <TouchableOpacity onPress={showDatepicker}>
                <TextInput
                  value={dateOfSsi.toLocaleDateString()}
                  editable={false}
                  style={styles.textInput}
                />
              </TouchableOpacity>
            </View>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateOfSsi}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <View style={{ marginTop: 10 }}>
              <Text style={styles.detailLabel}>Before Image:</Text>
              {beforeImage ? (
                <View>
                  {imageLoadingBefore && (
                    <ActivityIndicator size="small" color="#21005d" />
                  )}
                  <Image
                    source={{
                      uri: getImageUrl(beforeImage),
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
              {photoUri && (
                <Image source={{ uri: photoUri }} style={styles.image} />
              )}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 30,
                justifyContent: "space-between",
                alignItems: "center",
                // backgroundColor:"teal"
              }}
            >
              <View style={styles.cameraButtonContainer}>
                <TouchableOpacity
                  style={styles.cameraButton}
                  onPress={handleCameraPress}
                >
                  <Entypo name="camera" size={24} color="#FFFFFF" />
                  <Text style={styles.cameraButtonText}>Take After Image</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.submitButtonContainer}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                  disabled={loading}
                >
                  <Text style={styles.submitButtonText}>
                    {loading ? "Submitting..." : "Submit"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SsiCloseReport;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  scrollView: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  formContainer: {
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 5,
    padding: 10,
    height: 40,
    backgroundColor: "#F5F5F5",
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    color: "#666666",
  },
  cameraButtonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#21005d",
    padding: 10,
    borderRadius: 5,
  },
  cameraButtonText: {
    color: "#FFFFFF",
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginVertical: 10,

    alignSelf: "center",
  },
  submitButtonContainer: {
    marginTop: 20,
    alignItems: "center",
    // backgroundColor:"tomato"
  },
  submitButton: {
    backgroundColor: "#21005d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    // alignSelf:"center"
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
