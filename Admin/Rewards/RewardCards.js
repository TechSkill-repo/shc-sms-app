import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import noData from "../../assets/icons/nodata.png";

const RewardCards = ({ rewards }) => {
  return (
    <View style={styles.rewardsContainer}>
      {rewards?.length === 0 ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={noData}
            style={{
              width: "100%",
              height: 400,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "gray",
            }}
          >
            Please Search the Data
          </Text>
        </View>
      ) : (
        rewards.map((reward, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardText}>Employee Name: {reward.empName}</Text>
            <Text style={styles.cardText}>Employee ID: {reward.empId}</Text>
            <Text style={styles.cardText}>Location: {reward.location}</Text>
            <Text style={styles.cardText}>
              Short Description: {reward.shortDiscription}
            </Text>
            <Text style={styles.cardText}>Reward: {reward.Reward}</Text>
            <Text style={styles.cardText}>Price: {reward.Price}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rewardsContainer: {
    marginTop: 20,
    padding: 20,
  },
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  noRewardsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default RewardCards;
