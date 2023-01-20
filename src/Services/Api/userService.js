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

// const userService = {
//   getAllUsers,
//   getUserInfor,
//   setUserDescription,
//   setAvatar,
//   setCoverImage,
//   setUserCity,
//   setUserCountry
const getListFriendRequest = (index, count) => {
  return axios.post(`/friend/get_requested_friends?index=${index}&count=${count}`);
}
const setAcceptFriend = (userId, isAccept) => {
  return axios.post(`/friend/set_accept_friend?user_id=${userId}&is_accept=${isAccept}`);
}
const setRequestFriend = (userId) => {
  return axios.post(`/friend/set_request_friend?user_id=${userId}`);
}
const getUserFriends = (userId, index, count) => {
  return axios.post(`/friend/get_user_friends?user_id=${userId}&index=${index}&count=${count}`);
}
const getSuggestFriends = (index, count) => {
  return axios.post(`/friend/get_list_suggested_friends?index=${index}&count=${count}`);
}
const setBlock = (userId, type) => {
  return axios.post(`/friend/set_block?user_id=${userId}&type=${type}`);
}
const unFriend = (userId) => {
  return axios.post(`/friend/unfriend?user_id=${userId}`);
}
const userService = {
  getAllUsers,
  getListFriendRequest,
  setAcceptFriend,
  getUserFriends,
  setBlock,
  unFriend,
  setRequestFriend,
  getSuggestFriends,
  getUserInfor,
  setUserDescription,
  setAvatar,
  setCoverImage,
  setUserCity,
  setUserCountry
};


export default userService;
