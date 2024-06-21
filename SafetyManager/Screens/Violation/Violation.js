import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import ViolationForm from "./ViolationForm/ViolationForm";
import ViolationCard from "./ViolationCards/ViolationCard";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from "react-native-gesture-handler";
import VioloationClose from "./VioloationClose";
import ViolationGood from "./ViolationGood";

const Violation = () => {
  const [visible, setVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(1);

  const handleGesture = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX < -50) {
        setSelectedCard((prev) => Math.min(prev + 1, 3));
      } else if (nativeEvent.translationX > 50) {
        setSelectedCard((prev) => Math.max(prev - 1, 1));
      }
    }
  };

  const handleCardSelect = (cardNumber) => {
    setSelectedCard(cardNumber);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={{
          backgroundColor: "white",
        }}
      >
        <Appbar.Header>
          <Appbar.BackAction />
          <Appbar.Content title="VIOLATION & OBSERVATION" />
          <Appbar.Action icon="magnify" />
          <Appbar.Action
            icon="plus"
            onPress={() => {
              setVisible(true);
            }}
          />
        </Appbar.Header>
        <View>
          <View style={styles.container}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedCard === 1 && styles.selectedButton,
                ]}
                onPress={() => handleCardSelect(1)}
              >
                <Text style={styles.buttonText}>Pending Viol.</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedCard === 2 && styles.selectedButton,
                ]}
                onPress={() => handleCardSelect(2)}
              >
                <Text style={styles.buttonText}>Close Viol.</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedCard === 3 && styles.selectedButton,
                ]}
                onPress={() => handleCardSelect(3)}
              >
                <Text style={styles.buttonText}>Good Obser.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ViolationForm visible={visible} setVisible={setVisible} />
      </ScrollView>
      <PanGestureHandler onHandlerStateChange={handleGesture}>
        <ScrollView
          style={{
            backgroundColor: "white",
            height: "100%",
            marginTop: -20,
            paddingTop: 20,
          }}
        >
          {selectedCard === 1 && <ViolationCard />}
          {selectedCard === 2 && <VioloationClose />}
          {selectedCard === 3 && <ViolationGood />}
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
    justifyContent: "space-evenly",
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderBottomWidth: 2,
    backgroundColor: "#fffbfe",
    borderBottomColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: {
    borderBottomColor: "#21005d",
  },
  buttonText: {
    fontSize: 14,
    color: "#21005d",
    fontWeight: "500",
  },
});

export default Violation;
