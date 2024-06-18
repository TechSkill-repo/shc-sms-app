import React, { useState } from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import DisplayUser from "./DisplayUser";
import AddUserModal from "./AddUser";
import { Feather } from "@expo/vector-icons";

const User = () => {
  const [hide, setHide] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Appbar.Header>
        <Appbar.BackAction />
        <Appbar.Content title="Title" />

        <Appbar.Action icon="plus" onPress={toggleModal} />
        <Appbar.Action icon="magnify" onPress={() => setHide(!hide)} />
      </Appbar.Header>

      <DisplayUser hide={hide} setHide={setHide} refreshing={refreshing} />

      <AddUserModal visible={modalVisible} hideModal={toggleModal} />
    </View>
  );
};

export default User;
