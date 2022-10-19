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
    const product = await Product.findOne({ slug: req.params.slug });
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
      product.name = req.body.name || product.name;
      product.slug = req.body.slug || product.slug;
      product.countInStock = req.body.countInStock || product.countInStock;
      (product.price = req.body.price || product.price),
        (product.currency = req.body.currency || product.currency);

      const updatedProduct = await product.save();
      res.send({
        name: updatedProduct.name,
        slug: updatedProduct.slug,
        category: updatedProduct.category,
        image: updatedProduct.image,
        price: updatedProduct.price,
        currency: updatedProduct.currency,
        countInStock: updatedProduct.countInStock,
        flavour: updatedProduct.flavour,
        rating: updatedProduct.rating,
        numReviews: updatedProduct.numReviews,
        description: updatedProduct.description,
      });
      // res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateShopItem = async (req, res, next) => {
  try {

    const product = await Product.findById(req.params.id);
    if (product) {
      
      product.name = req.body.name || product.name;
      product.slug = req.body.slug || product.slug;
      product.countInStock = req.body.countInStock || product.countInStock;
      (product.price = req.body.price || product.price),
        (product.currency = req.body.currency || product.currency);

      const updatedProduct = await product.save();
      res.send({
        name: updatedProduct.name,
        slug: updatedProduct.slug,
        category: updatedProduct.category,
        image: updatedProduct.image,
        price: updatedProduct.price,
        currency: updatedProduct.currency,
        countInStock: updatedProduct.countInStock,
        flavour: updatedProduct.flavour,
        rating: updatedProduct.rating,
        numReviews: updatedProduct.numReviews,
        description: updatedProduct.description,
      });
      // res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
