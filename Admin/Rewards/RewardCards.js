import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import noData from "../../assets/icons/nodata.png";

const RewardCards = ({ rewards }) => {
  return (
    <View style={styles.rewardsContainer}>
      {rewards?.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Image source={noData} style={styles.noDataImage} />
          <Text style={styles.noDataText}>Please Search the Data</Text>
        </View>
      ) : (
        rewards.map((reward, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardRow}>
              <View style={styles.cardColumn}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#21005d",
                  }}
                >
                  {reward.empName}
                </Text>
                <Text
                  style={{
                    marginVertical: 4,
                    fontSize: 14,
                    fontWeight: "300",
                    color: "#21005d",
                  }}
                >
                  {reward.shortDiscription}
                </Text>
                <Text
                  style={{
                    marginVertical: 4,
                    fontSize: 14,
                    fontWeight: "300",
                    color: "#21005d",
                  }}
                >
                  {reward.Reward}
                </Text>
                <Text
                  style={{
                    marginVertical: 4,
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#21005d",
                  }}
                >
                  Price: {reward.Price}
                </Text>
              </View>
              <View style={styles.cardColumn}>
                <Text
                  style={{
                    marginVertical: 4,
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#21005d",
                  }}
                >
                  {reward.location}
                </Text>
                <Text
                  style={{
                    marginVertical: 4,
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#21005d",
                  }}
                >
                  {reward.createdAt.slice(0, 10)}
                </Text>
              </View>
            </View>
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
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  noDataImage: {
    width: "100%",
    height: 400,
  },
  noDataText: {
    fontSize: 16,
    fontWeight: "600",
    color: "gray",
  },
  card: {
    padding: 15,
    backgroundColor: "#fffbfe",
    elevation: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardColumn: {
    marginRight: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#505050",
  },
  noRewardsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default RewardCards;
