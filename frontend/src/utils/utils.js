import axios from "axios";

export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

//   const fetchData = async () => {
//       try {
//         const result = await axios.get(`${url}`);
//         // return result.data.products;
//         setData(result.data);
//         setLoading(false)

//       } catch (error) {
//         setLoading(false)

//         return error.message;
//       }
//     };
