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


export const updateShopItemById = async (req, res, next) => {
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

// export const updateShopCart = async (req, res, next) => {
//   try {
//     req.params.cartItems.forEach(cartItem=>{
//       // db.collection.updateMany()
//       const product = await Product.findById(req.params.id);
//       if (product) {

//         product.name = req.body.name || product.name;
//         product.slug = req.body.slug || product.slug;
//         product.countInStock = req.body.countInStock || product.countInStock;
//         (product.price = req.body.price || product.price),
//           (product.currency = req.body.currency || product.currency);

//         const updatedProduct = await product.save();
//         res.send({
//           name: updatedProduct.name,
//           slug: updatedProduct.slug,
//           category: updatedProduct.category,
//           image: updatedProduct.image,
//           price: updatedProduct.price,
//           currency: updatedProduct.currency,
//           countInStock: updatedProduct.countInStock,
//           flavour: updatedProduct.flavour,
//           rating: updatedProduct.rating,
//           numReviews: updatedProduct.numReviews,
//           description: updatedProduct.description,
//         });
//         // res.send(product);
//       } else {
//         res.status(404).send({ message: "Product Not Found" });
//       }

//     })
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

// export const updateProductsQuantityAfterPurchase = async (req, res, next) => {
//   try {
//    // creating arguments
//    let conditions = req.body.orderItems;
//    let update = {
//        $set : {
//      name : req.body.name,
//      description : req.body.description,
//      markdown : req.body.markdown
//      }
//    };
//    let options = { multi: true, upsert: true };

//    // update_many :)
//    YourCollection.updateMany(

//      conditions, update, options,(err, doc) => {
//        console.log(req.body);
//        if(!err) {
//          res.redirect('/articles');
//        }
//        else {
//          if(err.name == "ValidationError"){
//            handleValidationError(err , req.body);
//            res.redirect('/new-post');
//          }else {
//            res.redirect('/');
//          }
//        }
//      });

//        // creating arguments
//       //  let conditions = {};
//       //  let update = {
//       //      $set : {
//       //    title : req.body.title,
//       //    description : req.body.description,
//       //    markdown : req.body.markdown
//       //    }
//       //  };
//       //  let options = { multi: true, upsert: true };
   
//       //  // update_many :)
//       //  YourCollection.updateMany(
   
//       //    conditions, update, options,(err, doc) => {
//       //      console.log(req.body);
//       //      if(!err) {
//       //        res.redirect('/articles');
//       //      }
//       //      else {
//       //        if(err.name == "ValidationError"){
//       //          handleValidationError(err , req.body);
//       //          res.redirect('/new-post');
//       //        }else {
//       //          res.redirect('/');
//       //        }
//       //      }
//       //    });


//     // const createdProducts = await Product.insertMany(req.data.orderItems, );



//     // req.params.orderItems.forEach(orderItem=>{
//     //   const product = await Product.findById(req.params.id);
//     //   if (product) {
        
//     //     product.name = req.body.name || product.name;
//     //     product.slug = req.body.slug || product.slug;
//     //     product.countInStock = req.body.countInStock || product.countInStock;
//     //     (product.price = req.body.price || product.price),
//     //       (product.currency = req.body.currency || product.currency);
  
//     //     const updatedProduct = await product.save();
//     //     res.send({
//     //       name: updatedProduct.name,
//     //       slug: updatedProduct.slug,
//     //       category: updatedProduct.category,
//     //       image: updatedProduct.image,
//     //       price: updatedProduct.price,
//     //       currency: updatedProduct.currency,
//     //       countInStock: updatedProduct.countInStock,
//     //       flavour: updatedProduct.flavour,
//     //       rating: updatedProduct.rating,
//     //       numReviews: updatedProduct.numReviews,
//     //       description: updatedProduct.description,
//     //     });
//     //   } else {
//     //     res.status(404).send({ message: "Product Not Found" });
//     //   }
//     // })
//     // res.send({ createdProducts, createdUsers });

//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };
