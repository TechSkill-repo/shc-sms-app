import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Nearmess from "./AccidentScreens/Nearmess";
import FirstAde from "./AccidentScreens/FirstAde";
import LostTimeEng from "./AccidentScreens/LostTimeEng";
import Disabled from "./AccidentScreens/Disabled";
import AccidentForm from "../../models/AccidentModel/AccidentForm";
import DangerousIncident from "./AccidentScreens/DangerousIncident";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from "react-native-gesture-handler";

const AccidentReports = () => {
  const [selectedCard, setSelectedCard] = useState(1);

  const [isVisible, setIsVisible] = useState(false);

  const handleCardSelect = (cardNumber) => {
    setSelectedCard(cardNumber);
  };

  const handleGesture = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX < -50) {
        setSelectedCard((prev) => Math.min(prev + 1, 5));
      } else if (nativeEvent.translationX > 50) {
        setSelectedCard((prev) => Math.max(prev - 1, 1));
      }
    }
  };

  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
  }, [navigation]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onHandlerStateChange={handleGesture}>
        <ScrollView
          style={{
            backgroundColor: "white",
          }}
        >
          <Appbar.Header>
            <Appbar.BackAction
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Appbar.Content title="Accident" />
            <Appbar.Action icon="pencil" onPress={() => setIsVisible(true)} />
            {/* <Appbar.Action icon="magnify" /> */}
          </Appbar.Header>
          <View>
            <View style={styles.container}>
              <ScrollView style={styles.buttonsContainer} horizontal={true}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedCard === 1 && styles.selectedButton,
                  ]}
                  onPress={() => handleCardSelect(1)}
                >
                  <Text style={styles.buttonText}>Near Miss</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedCard === 2 && styles.selectedButton,
                  ]}
                  onPress={() => handleCardSelect(2)}
                >
                  <Text style={styles.buttonText}>First Aid</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedCard === 3 && styles.selectedButton,
                  ]}
                  onPress={() => handleCardSelect(3)}
                >
                  <Text style={styles.buttonText}>L.T.I</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedCard === 4 && styles.selectedButton,
                  ]}
                  onPress={() => handleCardSelect(4)}
                >
                  <Text style={styles.buttonText}>Disability</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedCard === 5 && styles.selectedButton,
                  ]}
                  onPress={() => handleCardSelect(5)}
                >
                  <Text style={styles.buttonText}>Dangerous Incident</Text>
                </TouchableOpacity>
              </ScrollView>

              <View>
                {selectedCard === 1 && <Nearmess />}
                {selectedCard === 2 && <FirstAde />}
                {selectedCard === 3 && <LostTimeEng />}
                {selectedCard === 4 && <Disabled />}
                {selectedCard === 5 && <DangerousIncident />}
              </View>
            </View>
          </View>
          <AccidentForm isVisible={isVisible} setIsVisible={setIsVisible} />
        </ScrollView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
  },
  button: {
    padding: 12,
    borderBottomWidth: 2,
    backgroundColor: "#fffbfe",
    borderBottomColor: "lightgray",
  },
  selectedButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#21005d",
  },
  buttonText: {
    fontSize: 16,
    color: "#21005d",
    fontWeight: "500",
  },
});

export default AccidentReports;
