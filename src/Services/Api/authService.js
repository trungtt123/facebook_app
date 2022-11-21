import axios from "../../setups/custom_axios";
import { _getCache, _setCache } from "../Helper/common";
const login = async (phonenumber, password) => {
  console.log(password, phonenumber);
  return axios.post(`/auth/login?phonenumber=${phonenumber}&password=${password}`);
};
const verifyToken = async () => {
  return axios.get(`/auth/verifyToken`);
}
const logout = async () => {
  // remove token
  await _setCache("token", "");
  await _setCache("user", "")
  // call api remove token
};
const AuthService = { login, logout, verifyToken };
export default AuthService;
