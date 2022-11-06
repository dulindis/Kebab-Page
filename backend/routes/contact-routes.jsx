import express from "express";
import nodemailer from 'nodemailer';
// import dotenv from "dotenv";

// dotenv.config();

const mailingController = express.Router();

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass:process.env.NODEMAILER_PASS,
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  

  mailingController.post('/send',  async (req, res) => {
    try {
     const {email, name, message } = req.body;
     const mailOptions = {
       from:email,
       to: config.nodemailerConfig.user,
       subject: 'you received a new message from: ' + name,
       text:`Email: ${email},  Message: ${message}`
     };
   
   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
       res.json({status:'error',sent:false, data:'something went wrong', error:error})
     } else {
      res.json({status:'ok',sent:true,  data:info, body:req.body});
     }
     transporter.close();
   });
   
    } catch (error) {
      res.send(500).json('something went wrong', error)
    }
   })
   
   
export {mailingController}