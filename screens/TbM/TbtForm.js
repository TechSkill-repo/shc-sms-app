import { View, Text, Button, TextInput } from "react-native";
import React, { useState } from "react";

const Step1 = ({ onNext }) => {
  return (
    <View style={{ width: "100%", height: "100%", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

      <Text>Step 1</Text>
      <View style={{ height: "80%", width: "90%" }}>

        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Date
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Date"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Time
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Time"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Shift
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Shift"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Permit Number
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Permit Number"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Location
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Location"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", flexDirection: "row", width: "90%", position: "absolute", bottom: 20 }}>

        <Button title="Next" onPress={onNext} />
      </View>
    </View>
  )
}


const Step2 = ({ onNext, onPrev }) => {
  return (
    <View style={{ width: "100%", height: "100%", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

      <Text>Step 2</Text>
      <View style={{ height: "80%", width: "90%" }}>

        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Company Supervisor
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Company Supervisor"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Safety Representative
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Safety Representative"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "90%", position: "absolute", bottom: 20 }}>

        <Button title="Previous" onPress={onPrev} />
        <Button title="Next" onPress={onNext} />
      </View>
    </View>
  )
};

const Step3 = ({ onNext, onPrev }) => {
  return (
    <View style={{ width: "100%", height: "100%", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

      <Text>Step 3</Text>
      <View style={{ height: "80%", width: "90%" }}>

        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Date
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Date"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Time
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Time"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Shift
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Shift"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Permit Number
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Permit Number"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Location
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Location"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "90%", position: "absolute", bottom: 20 }}>


        <Button title="Previous" onPress={onPrev} />
        <Button title="Next" onPress={onNext} />
      </View>
    </View>
  )
}

const Step4 = ({ onNext, onPrev }) => {
  return (
    <View style={{ width: "100%", height: "100%", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

      <Text>Step 4</Text>
      <View style={{ height: "80%", width: "90%" }}>

        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Date
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Date"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Time
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Time"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Shift
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Shift"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Permit Number
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Permit Number"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Location
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Location"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "90%", position: "absolute", bottom: 20 }}>


        <Button title="Previous" onPress={onPrev} />
        <Button title="Next" onPress={onNext} />
      </View>
    </View>
  )
}

const Step5 = ({ onNext, onPrev }) => {

  return (
    <View style={{ width: "100%", height: "100%", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

      <Text>Step 5</Text>
      <View style={{ height: "80%", width: "90%" }}>

        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Date
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Date"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Time
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Time"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Shift
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Shift"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Permit Number
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Permit Number"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 12,
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: "300",
              color: "#00308F",
            }}
          >
            Location
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              width: "90%",
              backgroundColor: "#F0F8FF",
              borderRadius: 5,
              color: "black",
            }}
            placeholder="Location"
            returnKeyType="go"
            secureTextEntry
          />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "90%", position: "absolute", bottom: 20 }}>


        <Button title="Previous" onPress={onPrev} />

        <Button title="Next" onPress={onNext} />
      </View>
    </View>
  )
}

const TbtForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 onNext={nextStep} />

      case 2:
        return <Step2 onNext={nextStep} onPrev={prevStep} />

      case 3:
        return <Step3 onNext={nextStep} onPrev={prevStep} />

      case 4:
        return <Step4 onNext={nextStep} onPrev={prevStep} />

      case 5:
        return <Step5 onNext={nextStep} onPrev={prevStep} />

      default:
        return null;

    }
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <Text>Tbt Form</Text> */}
      {/* <Button title="Next" /> */}
      {renderStep()}
    </View>
  );
};

export default TbtForm;
