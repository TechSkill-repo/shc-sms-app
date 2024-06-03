import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const StepFormNavigation = ({ activeColor = "#4caf50", stepNo }) => {
  const [currentStep, setCurrentStep] = useState(stepNo);

  useEffect(() => {
    setCurrentStep(stepNo);
  }, [stepNo]);

  const steps = [
    { id: 1, label: "Investigation" },
    { id: 2, label: "Planning" },
    { id: 3, label: "SSI Close" },
    { id: 4, label: "Close" },
  ];

  const handleStepPress = (stepId) => {
    setCurrentStep(stepId);
  };

  const isStepActive = (stepId) => {
    return stepId === currentStep;
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
                    isStepActive(step.id)
                      ? {
                          ...styles.activeCircle,
                          backgroundColor: activeColor,
                          borderColor: activeColor,
                        }
                      : styles.inactiveCircle,
                  ]}
                >
                  <Text style={{ fontSize: 12, color: "white" }}>
                    {step.id}
                  </Text>
                </View>
                <Text
                  style={
                    isStepActive(step.id)
                      ? { ...styles.activeStepText, color: activeColor }
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
      <View style={styles.contentContainer}>
        {steps.find((step) => step.id === currentStep)?.content}
      </View>
    </View>
  );
};

const Step1 = () => (
  <View>
    <Text>Content for Step 1</Text>
    {/* Add your form elements for Step 1 here */}
  </View>
);

const Step2 = () => (
  <View>
    <Text>Content for Step 2</Text>
    {/* Add your form elements for Step 2 here */}
  </View>
);

const Step3 = () => (
  <View>
    <Text>Content for Step 3</Text>
    {/* Add your form elements for Step 3 here */}
  </View>
);

const Step4 = () => (
  <View>
    <Text>Content for Step 4</Text>
    {/* Add your form elements for Step 4 here */}
  </View>
);

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
