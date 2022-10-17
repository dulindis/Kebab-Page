// import data from "../data/data.js";
// import Product from "../models/productModel.js";
// import User from "../models/userModel.js";

// //seeds shop data and user data to database
// export const seedData = async (req, res, next) => {
//   try {
//     await Product.deleteMany({});
//     const createdProducts = await Product.insertMany(data.products);

//     await User.deleteMany({});
//     const createdUsers = await User.insertMany(data.users);

//     res.send({ createdProducts, createdUsers });
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };


