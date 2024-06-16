import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { AntDesign, Feather } from "@expo/vector-icons";
import { serveraddress } from "../../../assets/values/Constants";
import ViewSopPdf from "./ViewSopPdf";
import { fetchLocations } from "../../../components/Global/Global";
import { Dropdown } from "react-native-element-dropdown";

const Sop = () => {
  const [sopData, setSopData] = useState([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pdfId, setPdfId] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    async function fetchLocationsData() {
      try {
        const data = await fetchLocations();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }
    fetchLocationsData();
  }, []);

  const viewPdf = (id) => {
    setVisible(true);
    setPdfId(id);
  };

  const fetchAllSop = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serveraddress}sop/${selectedLocation}`);
      if (res.data) {
        setSopData(res.data);
      } else {
        console.error("Invalid response format:", res);
        setSopData([]);
      }
    } catch (error) {
      console.error("There was an error fetching the SOP data:", error);
      setSopData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={locations.map((location) => ({
            label: location.name,
            value: location.id,
          }))}
          search
          maxHeight={300}
          labelField="label"
          valueField={selectedLocation}
          placeholder={`${selectedLocation}`}
          searchPlaceholder="Search..."
          value={selectedLocation} // Use selectedLocation here
          onChange={(item) => setSelectedLocation(item.label)}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        />
        <TouchableOpacity onPress={fetchAllSop} style={styles.searchButton}>
          <Feather
            name="search"
            size={20}
            color="white"
            style={{ alignSelf: "center", marginTop: 10 }}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : sopData.length === 0 ? (
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>
            Please enter a location to search
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {sopData.map((data) => (
            <View key={data.id} style={styles.card}>
              <Text style={styles.cardTitle}>{data.sopTitle}</Text>
              <Text style={styles.cardDescription}>{data.sopDescription}</Text>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => {
                  viewPdf(data.id);
                }}
              >
                <Text style={styles.viewButtonText}>View SOP</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
      {visible && (
        <ViewSopPdf visible={visible} setVisible={setVisible} pdfId={pdfId} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchButton: {
    backgroundColor: "#21005d",
    height: 45,
    width: 45,
    borderRadius: 100,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  promptContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  promptText: {
    fontSize: 18,
    color: "#999",
  },
  card: {
    backgroundColor: "#fffbfe",
    width: "98%",
    marginTop: 20,
    elevation: 5,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#21005d",
  },
  cardDescription: {
    fontSize: 14,
    color: "#21005d",
    marginTop: 5,
    fontWeight: "300",
  },
  viewButton: {
    marginTop: 15,
    backgroundColor: "#376fd01a",
    width: "25%",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
  },
  viewButtonText: {
    textAlign: "center",
    color: "#376fd0",
    fontWeight: "500",
    fontSize: 12,
  },
  dropdown: {
    width: "80%",
    margin: 10,
    height: 50,
    backgroundColor: "white",
    borderRadius: 7,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default Sop;
