// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppRouter from "./routes/mainRouter/AppRouter";
import AuthRouter from "./routes/authRouter/AuthRoute";

import useAuthStore from "./store/userAuthStore";

// import CodePush from "react-native-code-push";

// const CODE_PUSH_OPTION = {
//   checkFrequency: CodePush.CheckFrequency.ON_APP_START,
// }

const Stack = createNativeStackNavigator();
// const navigation = useNavigation();

function App() {

  const { token } = useAuthStore();

  // useEffect(() => {
  //   const syncWithCodePush = (status) => {
  //     console.log(status);
  //   };

  //   CodePush.sync(
  //     { installMode: CodePush.InstallMode.IMMEDIATE },
  //     syncWithCodePush,
  //     null
  //   );
  // }, []);

  return (
    <NavigationContainer>
      {token ? <AppRouter /> : <AuthRouter />}
    </NavigationContainer>
  );
}

export default App;
// export default CodePush(CODE_PUSH_OPTION)(App);
