import axios from "../../setups/custom_axios";

const getAllUsers = () => {
  return axios.get("/get-all-users");
};

const getUserInfor = async (user_id) => {
  console.log(user_id);
  return await axios.post(`/user/get_user_info?&user_id=${user_id}`);
}

const setUserDescription = (descrtiption, userId) => {
  return axios.post(`/user/set_user_info?user_id=${userId}&description=${descrtiption}`);
}

const setAvatar = async (data) => {
  const {formData, userId} = data;
  return axios.post(`/user/set_user_info?user_id=${userId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
}

const setCoverImage = async (data) => {
  const {formData, userId} = data;
  return axios.post(`/user/set_user_info?user_id=${userId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
}

const setUserCity = async (data) => {
  const {city, userId} = data;
  return axios.post(`/user/set_user_info?user_id=${userId}&city=${city}`);
}

const setUserCountry = async (data) => {
  const {country, userId} = data;
  return axios.post(`/user/set_user_info?user_id=${userId}&country=${country}`);
}

const userService = {
  getAllUsers,
  getUserInfor,
  setUserDescription,
  setAvatar,
  setCoverImage,
  setUserCity,
  setUserCountry
};


export default userService;
