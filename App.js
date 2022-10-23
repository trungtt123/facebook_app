import { StatusBar } from 'expo-status-bar';


import { store } from "./src/Redux/store";
import { Provider } from "react-redux";
import AppNavigator from './src/Screens/AppNavigator';
export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}