import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const ImagePickerComponent = ({ onImagePicked, onClose }) => {
  const [photoUri, setPhotoUri] = useState(null);

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
        setPhotoUri(result.assets[0].uri);
        onImagePicked(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
        onImagePicked(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <AntDesign name="folderopen" size={50} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCameraPress} style={styles.button}>
          <Feather name="camera" size={50} color="white" />
        </TouchableOpacity>
      </View>
      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.imagePreview} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 120,
    backgroundColor: "#03346E",
    marginTop: 15,
    flexDirection: "column",
    borderRadius: 7,
    marginBottom: 50,
  },
  header: {
    width: "100%",
    height: "20%",
  },
  closeButton: {
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
  closeButtonText: {
    alignSelf: "flex-end",
    color: "white",
    fontWeight:"bold",
    fontSize: 18,
  },
  content: {
    backgroundColor: "#180161",
    height: "80%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginTop: 10,
  },
});

export default ImagePickerComponent;
