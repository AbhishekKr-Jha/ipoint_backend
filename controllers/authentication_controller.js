import nodemailer from 'nodemailer';
import { otp_data_validator_func, send_otp_validator_func } from "../utilities/Validating_func.js";
import otp_generator from '../utilities/otp_generator_func.js';
import { send_otp_template } from '../utilities/html_template.js';
import jwt from "jsonwebtoken";
// tagem12283@bamsrad.com

export const send_otp_func = async (req, res) => {
    console.log("the value is",process.env.SMTP_USER)
  const { userEmail } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587, 
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  // ------validations
  let validationStatus = send_otp_validator_func({ userEmail });
  if (!validationStatus.success) return res.status(400).json(validationStatus);

  const otp_func_response = otp_generator(userEmail, "5m");

  const mailOptions = {
        from: '"I.point Support " <noreply@ipoint.in>',  
    to: userEmail,
    subject: "One time verification OTP for ImagePoint.",
    text: `Your verification code is ${otp_func_response.otp}`,
    html: send_otp_template(otp_func_response.otp),
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      token: otp_func_response.token,
      otp: otp_func_response.otp,
      message: "OtpSent",
    });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ message: "Failed to send email! Try after some time." });
  }
};






export const verify_otp_func=async(req,res)=>{

const {otp,token,userEmail}=req.body
// console.log("the userEmail")

    // ------validations-------
    let validationStatus= await otp_data_validator_func({otp,token,userEmail})
    console.log(">>>>>",validationStatus)
    if(!validationStatus.success) return res.status(400).json(validationStatus)

      
      try {
        const isOtpCorrcet=jwt.verify(token, process.env.JWT_SECRET_KEY)
if(isOtpCorrcet.otp!==Number(otp)) return res.status(400).json({
  message:"Invalid OTP!"
})

const validaton_token=jwt.sign({userEmail},process.env.JWT_SECRET_KEY,{expiresIn:'50d'})

res.status(200).json({
    verification_token:validaton_token,
        message:"Otp verified successfully!"
    })
      } catch (error) {
        console.log("the error is",error)
        if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError" 
    ) {
      return res.status(401).json({
        message: "Invalid Token!",
      });
    }
        res.status(500).json({ message:"Server error!"})
      }
      

}