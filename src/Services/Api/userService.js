import axios from "../../setups/custom_axios";

const getAllUsers = () => {
  return axios.get("/get-all-users");
};

const getListFriendRequest = (index, count) => {
  return axios.post(`/friend/get_requested_friends?index=${index}&count=${count}`);
}
const setAcceptFriend = (userId, isAccept) => { 
  return axios.post(`/friend/set_accept_friend?user_id=${userId}&is_accept=${isAccept}`);
}
const userService = {
  getAllUsers,
  getListFriendRequest,
  setAcceptFriend
};
export default userService;
