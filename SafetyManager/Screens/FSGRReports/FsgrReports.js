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
  
  const FsgrReports = () => {
    const [selectedCard, setSelectedCard] = useState(1);
  
    const [isVisible, setIsVisible] = useState(false);
  
    const handleCardSelect = (cardNumber) => {
      setSelectedCard(cardNumber);
    };
  
    const navigation = useNavigation()

    return (
      <ScrollView
        style={{
          backgroundColor: "white",
        }}
      >
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {navigation.goBack()}} />
          <Appbar.Content title="FSGR Reports" />
          <Appbar.Action icon="magnify" onPress={()=>{
           setIsVisible(true)
          }} />
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
                <Text style={styles.buttonText}>In Progress</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedCard === 4 && styles.selectedButton,
                ]}
                onPress={() => handleCardSelect(4)}
              >
                <Text style={styles.buttonText}>Closed</Text>
              </TouchableOpacity>
            </ScrollView>
              <SearchFsgr setIsVisible={setIsVisible} isVisible={isVisible} />
          </View>
        </View>
          <View>
              {selectedCard === 1 && <Approved />}
              {selectedCard === 2 && <Pending />}
              {selectedCard === 3 && <Progress />}
              {selectedCard === 4 && <Close />}
            </View>
            
      </ScrollView>
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
      width:105,
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
      fontSize: 16,
      color: "#21005d",
      fontWeight: "500",
    },
  });
  
  export default FsgrReports;
  