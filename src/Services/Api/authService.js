import axios from "../../setups/custom_axios";
import { _setCache } from "../Helper/common";
const login = async (phonenumber, password) => {
  return axios.post("/users/login", { phonenumber, password });
};
const checkToken = async () => {
  return await axios.get("/verify-token");
};
const logout = () => {
  _setCache("token", "");
};
const AuthService = { checkToken, login, logout };
export default AuthService;
