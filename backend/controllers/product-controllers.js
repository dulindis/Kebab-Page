import data from "../data/data.js";
import Product from "../models/productModel.js";


export const getShopData = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getShopItem = async (req, res, next) => {
  try {
    const product = await Product.findOne({slug:req.params.slug});
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};


export const getShopItemById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
