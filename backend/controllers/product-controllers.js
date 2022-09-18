import data from "../data/data.js";

export const getShopData = async (req, res, next) => {
  try {
    res.send(data);
  } catch (error) {
    res.staus(400).send(error.message);
  }
};


