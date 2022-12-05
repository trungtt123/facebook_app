import axios from "../../setups/custom_axios";

const getListPosts = (lastId, index, count) => {
  return axios.post(`post/get_list_posts?last_id=${lastId}&index=${index}&count=${count}`);
};
const postService = {
  getListPosts
};
export default postService;
