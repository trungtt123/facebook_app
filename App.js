import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { store } from "./src/Redux/store";
import { Provider } from "react-redux";
import AppNavigator from './src/Screens/AppNavigator';
import { CHAT_SERVER_URL } from './src/Services/Helper/constant';
import { io } from 'socket.io-client'
const socket = io(`${CHAT_SERVER_URL}`);
///*
// trungtt123 disable log box
console.disableYellowBox = true;
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
//*/
export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}