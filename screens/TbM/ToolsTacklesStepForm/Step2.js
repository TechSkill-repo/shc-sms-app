import {
    View,
    Text,
    Button,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";

const data = [
    { label: 'Good', value: 'good' },
    { label: 'Bad', value: 'bad' },
];

const Step2 = ({ onNext, onPrev, formData, setStep2Data, step1Data }) => {


    const [inputList, setInputList] = useState([{ id: 1, toolName: "", condition: "" }]);
    const [idCounter, setIdCounter] = useState(2); // Counter for generating unique ids

    const handleAddInput = () => {
        const newInput = { id: idCounter, toolName: "", condition: "" };

        const exists = inputList.some(item => item.toolName === "" && item.condition === "");
        if (!exists) {
            setInputList([...inputList, newInput]);
            setIdCounter(idCounter + 1);
        }
    };

    const handleRemoveInput = (idToRemove) => {
        const updatedList = inputList.filter((item) => item.id !== idToRemove);
        setInputList(updatedList);

        // const updatedTools = formData.toolsName.filter(
        //     (item, index) => index !== idToRemove - 1
        // );
        // const updatedTools = formData.toolsName.filter((item) => item.id !== idToRemove);

        const updatedTools = formData.toolsName ? formData.toolsName.filter((item) => item.id !== idToRemove) : [];


        setStep2Data({ ...formData, toolsName: updatedTools });
    };

    const handleInputChange = (text, id, field) => {
        const updatedList = inputList.map((item) =>
            item.id === id ? { ...item, [field]: text } : item
        );

        console.log("Updated List:", updatedList); // Log updated list to inspect
        setInputList(updatedList);

        const updatedTools = updatedList
            .map((item) => ({ toolName: item.toolName.trim(), condition: item.condition.trim() })).filter(Boolean);
        setStep2Data({ ...formData, tools: updatedList });
    };

    const handleNext = () => {
        const combinedFormData = {
            ...step1Data,
            ...formData, // Include step2 data
            tools: inputList, // Include tools list
        };
        // Post formData to your server
        console.log("Form data:", combinedFormData);

        // Example of navigating to the next step
        onNext();
    }
    return (
        <ScrollView
            style={{
                width: "100%",
                height: "100%",
                // justifyContent: "center",
                flexDirection: "column",
                // alignItems: "center",
                backgroundColor: "white",
            }}
        >
            <View
                style={{
                    width: "100%",
                    height: 120,
                    backgroundColor: "#ffaa00a1",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    alignItems: "center",
                }}
            >
                <View>
                    <Text
                        style={{
                            color: "#2e2d6e",
                            fontSize: 22,
                            marginLeft: 0,
                            fontWeight: "600",
                        }}
                    >
                        Tools Tackles
                    </Text>
                </View>
            </View>

            <View
                style={{
                    flex: 1,
                    //   justifyContent: "center",
                    //   alignItems: "center",
                    padding: 20,
                }}
            >
                <Text
                    style={{
                        textAlign: "left",
                        fontSize: 16,
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                        fontWeight: "600",
                        color: "#00308F",
                        paddingRight: 15,
                        marginBottom: 10,
                    }}
                >
                    Tools Name
                </Text>

                {inputList.map((input, index) => (
                    <View
                        key={input.id}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 10,
                        }}
                    >
                        <View style={{ width: "95%", justifyContent:"center", alignItems:"center" }}>


                            <TextInput
                                style={{
                                    paddingHorizontal: 12,
                                    paddingVertical: 12,
                                    width: "90%",
                                    backgroundColor: "#F5F5F5",
                                    elevation: 3,
                                    borderRadius: 5,
                                    color: "black",
                                    marginBottom: 10
                                }}
                                value={input.text}
                                onChangeText={(text) => handleInputChange(text, input.id, 'toolName')}
                                placeholder={`Tools Name ${index + 1}`}
                            />
                            {/* <TextInput
                                style={{
                                    paddingHorizontal: 12,
                                    paddingVertical: 12,
                                    width: "90%",
                                    backgroundColor: "#F5F5F5",
                                    elevation: 3,
                                    borderRadius: 5,
                                    color: "black",
                                }}
                                value={input.text}
                                onChangeText={(text) => handleInputChange(text, input.id, 'condition')}
                                placeholder={`Condition ${index + 1}`}
                            /> */}

                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={data}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={`Condition ${index + 1}`}
                                searchPlaceholder="Search..."
                                value={input.text}
                                onChange={(selectedValue) => {
                                    const { label, value } = selectedValue;
                                    console.log("onchange running");
                                    handleInputChange(label, input.id, 'condition')
                                }
                                }
                                renderLeftIcon={() => (
                                    <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                                )}
                            />
                        </View>
                        {index > 0 && ( // Render remove button for all inputs except the first one
                            <TouchableOpacity
                                onPress={() => handleRemoveInput(input.id)}
                                style={{
                                    marginTop: 10,
                                    // backgroundColor: "#244aca",
                                    paddingHorizontal: 0,
                                    paddingVertical: 10,
                                    borderRadius: 50,
                                    // marginLeft: 10,
                                }}
                            >
                                <AntDesign name="delete" size={24} color="red" />
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
                {/* <Button title="+" onPress={handleAddInput} /> */}
                <TouchableOpacity
                    onPress={handleAddInput}
                    style={{
                        marginTop: 10,
                        backgroundColor: "#244aca",
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 50,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "600",
                            color: "#fff",
                        }}
                    >
                        + Add Tools
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    marginTop: 40,
                }}
            >
                <TouchableOpacity
                    onPress={onPrev}
                    style={{
                        backgroundColor: "#2e2d6e",
                        padding: 10,
                        borderRadius: 50,
                    }}
                >
                    {/* <Button title="Next" onPress={onNext} /> */}
                    <Text
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 0,
                            fontSize: 16,
                            textAlign: "center",
                            fontWeight: "500",
                            color: "white",
                        }}
                    >
                        Prev
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: "green",
                        padding: 10,
                        borderRadius: 50,
                        marginLeft: 10,
                    }}
                    onPress={handleNext}
                >
                    <View
                        style={{
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 0,
                                fontSize: 16,
                                textAlign: "center",
                                fontWeight: "500",
                                color: "white",
                            }}
                        >
                            SUBMIT
                        </Text>
                        <MaterialIcons name="done" size={18} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};
export default Step2;

const styles = StyleSheet.create({
    dropdown: {
        width:"90%",
        margin: 10,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 7,
        padding: 12,
        shadowColor: '#000',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
