import express from "express";
import { isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_API_KEY_TEST);

const router = express.Router();

const YOUR_DOMAIN = "http://localhost:4242";

router.post("/create-checkout-session", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.orderItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            // images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,

        // price_data: {
        //   currency: "usd",
        //   product_data: {
        //     name:"T-shirt",
        //   },
        //   unit_amount: 2000,
        // },
        // quantity: 1,


      })),
      mode: "payment",
      // success_url: `${process.env.CLIENT_URL}/success`,
      success_url: `${process.env.CLIENT_URL}/order/${req.body.orderID}`,

      // cancel_url: `${process.env.CLIENT_URL}/checkout`,
      // success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });

    res.json({ url: session.url });
    // res.status(200).json(session);
    // res.redirect(303, session.url);

    // res.status(200).send(session);
  } catch (error) {
    next(error);
  }
});

export default { router };

export { router };
