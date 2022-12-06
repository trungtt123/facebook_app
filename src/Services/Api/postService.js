import axios from "../../setups/custom_axios";

const getListPosts = (lastId, index, count) => {
  return axios.post(`post/get_list_posts?last_id=${lastId}&index=${index}&count=${count}`);
};
const likePost = (postId) => {
  return axios.post(`like/like?id=${postId}`);
}
const getPost = (postId) => {
  return axios.post(`post/get_post?id=${postId}`);
}
const postService = {
  getListPosts,
  likePost,
  getPost
};
export default postService;
