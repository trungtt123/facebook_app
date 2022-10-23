import axios from "../../setups/custom_axios";

const getAllUsers = () => {
  return axios.get("/get-all-users");
};
const userService = { getAllUsers };
export default userService;
