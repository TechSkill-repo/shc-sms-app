import { View, Text, Alert } from "react-native";
import React from "react";
import { TextInput, Button } from "react-native-paper";

const Form = ({
  handleSubmit,
  fsgrData,
  setFsgrData,
  currentDate,
  currentTime,
}) => {
  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <View
        style={{
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <TextInput
          mode="outlined"
          label="Report Time"
          value={currentDate}
          editable={false}
          style={{
            width: "45%",
          }}
        />
        <TextInput
          mode="outlined"
          value={currentTime}
          label="Time of report"
          style={{
            width: "45%",
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          mode="outlined"
          label="Location"
          style={{
            marginTop: 20,
            width: "95%",
          }}
          onChangeText={(Location) => {
            setFsgrData({ ...fsgrData, Location });
          }}
        />
        <TextInput
          mode="outlined"
          label="Employee Name"
          style={{
            marginTop: 10,
            width: "95%",
          }}
          onChangeText={(Emp_Name) => {
            setFsgrData({ ...fsgrData, Emp_Name });
          }}
        />
        <TextInput
          mode="outlined"
          label="Employee Designation"
          style={{
            marginTop: 10,
            width: "95%",
          }}
          onChangeText={(Emp_Designation) => {
            setFsgrData({ ...fsgrData, Emp_Designation });
          }}
        />
        <TextInput
          mode="outlined"
          label="Incharge Name"
          style={{
            marginTop: 10,
            width: "95%",
          }}
          onChangeText={(Incharge_Name) => {
            setFsgrData({ ...fsgrData, Incharge_Name });
          }}
        />
        <TextInput
          mode="outlined"
          label="Safety Supervisor Name"
          style={{
            marginTop: 10,
            width: "95%",
          }}
          onChangeText={(Site_Supervisior) => {
            setFsgrData({ ...fsgrData, Site_Supervisior });
          }}
        />
        <TextInput
          mode="outlined"
          label="What is your problem ?"
          style={{
            marginTop: 10,
            width: "95%",
          }}
          onChangeText={(Message) => {
            setFsgrData({ ...fsgrData, Message });
          }}
          multiline
          numberOfLines={3}
        />
        <Button
          icon="check"
          mode="contained"
          onPress={() => {
            fsgrData.Message === ""
              ? Alert.alert("Please Fill The Form", "", [
                  { text: "OK", onPress: () => console.log("OK Pressed") },
                ])
              : handleSubmit();
          }}
          style={{
            marginTop: 20,
            width: "95%",
          }}
        >
          Submit your FSGR
        </Button>
      </View>
    </View>
  );
};

export default Form;
