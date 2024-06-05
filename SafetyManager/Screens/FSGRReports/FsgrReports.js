import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Close from "./FsgrStatusScreens/Close";
import Pending from "./FsgrStatusScreens/Pending";
import Progress from "./FsgrStatusScreens/Progress";
import Approved from "./FsgrStatusScreens/Approved";
import SearchFsgr from "../../models/Search/SearchFsgr";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import SsiClose from "./FsgrStatusScreens/SsiClose";

const FsgrReports = () => {
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
            <Appbar.Content title="FSGR Reports" />
            <Appbar.Action
              icon="magnify"
              onPress={() => {
                setIsVisible(true);
              }}
            />
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
                  <Text style={styles.buttonText}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedCard === 2 && styles.selectedButton,
                  ]}
                  onPress={() => handleCardSelect(2)}
                >
                  <Text style={styles.buttonText}>Approved</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedCard === 3 && styles.selectedButton,
                  ]}
                  onPress={() => handleCardSelect(3)}
                >
                  <Text style={styles.buttonText}>Planning</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedCard === 4 && styles.selectedButton,
                  ]}
                  onPress={() => handleCardSelect(4)}
                >
                  <Text style={styles.buttonText}>SSI Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    selectedCard === 5 && styles.selectedButton,
                  ]}
                  onPress={() => handleCardSelect(5)}
                >
                  <Text style={styles.buttonText}>Closed</Text>
                </TouchableOpacity>
              </ScrollView>
              <SearchFsgr setIsVisible={setIsVisible} isVisible={isVisible} />
            </View>
          </View>
          <ScrollView>
            {selectedCard === 1 && <Pending />}
            {selectedCard === 2 && <Approved />}
            {selectedCard === 3 && <Progress />}
            {selectedCard === 4 && <SsiClose />}
            {selectedCard === 5 && <Close />}
          </ScrollView>
        </ScrollView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // display:"flex",
    // backgroundColor:"red"
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
    // backgroundColor:"red"
  },
  button: {
    width: 90,
    padding: 10,
    borderBottomWidth: 2,
    backgroundColor: "#fffbfe",
    borderBottomColor: "lightgray",
  },
  selectedButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#21005d",
  },
  buttonText: {
    fontSize: 14,
    color: "#21005d",
    fontWeight: "500",
  },
});

export default FsgrReports;
