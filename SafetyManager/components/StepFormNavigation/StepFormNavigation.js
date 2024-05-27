import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const StepFormNavigation = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, label: "Investigation", content: <Text>Content for Step 1</Text> },
    {
      id: 2,
      label: "Planning",
      content: <Text>Content for Step 2</Text>,
    },
    { id: 3, label: "SSI Close", content: <Text>Content for Step 3</Text> },
    { id: 4, label: "Close", content: <Text>Content for Step 4</Text> },
  ];

  const handleStepPress = (stepId) => {
    setCurrentStep(stepId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <View style={styles.stepContainer}>
              <TouchableOpacity
                onPress={() => handleStepPress(step.id)}
                style={styles.step}
              >
                <View
                  style={[
                    styles.circle,
                    currentStep === step.id
                      ? styles.activeCircle
                      : styles.inactiveCircle,
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "white",
                    }}
                  >
                    {step.id}
                  </Text>
                </View>
                <Text
                  style={
                    currentStep === step.id
                      ? styles.activeStepText
                      : styles.inactiveStepText
                  }
                >
                  {step.label}
                </Text>
              </TouchableOpacity>
              {index < steps.length - 1 && <View style={styles.line} />}
            </View>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  stepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  step: {
    alignItems: "center",
    marginHorizontal: 7,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  inactiveCircle: {
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "#E8E8E8",
  },
  activeCircle: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
    borderWidth: 2,
  },
  stepNumber: {
    color: "red",
  },
  activeStepNumber: {
    color: "white",
  },
  activeStepText: {
    marginTop: 4,
    fontWeight: "300",
    color: "#4caf50",
  },
  inactiveStepText: {
    marginTop: 4,
    color: "gray",
  },
  line: {
    width: 30,
    height: 0,
    backgroundColor: "#E8E8E8",
    position: "absolute",
    top: 14, // half the height of the circle to start from the center
    left: 38, // position the line between the circles
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StepFormNavigation;
