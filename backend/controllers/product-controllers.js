import data from "../data/data.js";

export const getShopData = async (req, res, next) => {
  try {
    res.send(data.products);
  } catch (error) {
    res.staus(400).send(error.message);
  }
};

export const getShopItem = async (req, res, next) => {
  try {
    const product = data.products.find((x) => x.slug === req.params.slug);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } catch (error) {
    res.staus(400).send(error.message);
  }
};
