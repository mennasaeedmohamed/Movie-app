import axios from "axios";

const axiosCreate = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});
export default axiosCreate;
