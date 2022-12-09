import axios from "../../setups/custom_axios";
import { _getCache, _setCache } from "../Helper/common";
const login = async (phonenumber, password) => {
  console.log(password, phonenumber);
  return axios.post(`/auth/login?phonenumber=${phonenumber}&password=${password}`);
};
const signup = async (phonenumber, password, name, birthday, ) => {
  console.log(password, phonenumber);
  return axios.post(`/auth/signup?phonenumber=${phonenumber}&password=${password}&name=${name}&birthday=${birthday}`);
};
const checkExistPhoneNumber = async(phonenumber) => {
  console.log(phonenumber);
  return axios.post(`/auth/checkexistphonenumber?phonenumber=${phonenumber}`);
}
const checkVerifyCode = async (phonenumber, code) => {
  console.log(phonenumber, code);
  return axios.post(`/auth/check_verify_code?phonenumber=${phonenumber}&code_verify=${code}`);
}
const verifyToken = async () => {
  return axios.get(`/auth/verifyToken`);
}
const logout = async () => {
  // remove token
  await _setCache("token", "");
  await _setCache("user", "")
  // call api remove token
};
const setToken = async (token) => {
  await _setCache("token", token);
};
const getToken = async () => {
  return await _getCache("token");
};
const AuthService = { login, logout, verifyToken, setToken, getToken, signup, checkExistPhoneNumber, checkVerifyCode };
export default AuthService;
