import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import RewardForm from "./RewardForm";
import RewardCards from "./RewardCards";
import RewardSearch from "./RewardSearch";

const Rewards = () => {
  const [visible, setVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [rewards, setRewards] = useState([]);

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
      }}
    >
      <Appbar.Header>
        <Appbar.BackAction />
        <Appbar.Content title="Reward" />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setVisible(true);
          }}
        />
        <Appbar.Action
          icon="plus"
          onPress={() => {
            setFormVisible(true);
          }}
        />
      </Appbar.Header>
      <RewardForm formVisible={formVisible} setFormVisible={setFormVisible} />
      <RewardSearch
        visible={visible}
        setVisible={setVisible}
        setRewards={setRewards}
      />
      <RewardCards rewards={rewards} />
    </ScrollView>
  );
};

export default Rewards;
