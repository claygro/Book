import axios from "axios";
const Api = axios.create({
  baseURL: "https://book-backend-by75.onrender.com",
});
export default Api;
