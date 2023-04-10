import axios from "axios";
export const configs = {
  // development: "http://localhost:5000",
  // production:  'https://dulin-dis.herokuapp.com'
};

export const axiosInstance = axios.create({
  // baseURL: configs[process.env.NODE_ENV],
  baseURL: "http://localhost:5000",
});

// export default axiosInstance;
