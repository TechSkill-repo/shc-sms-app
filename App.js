import Starter from "./screens/starter/starter";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Starter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
