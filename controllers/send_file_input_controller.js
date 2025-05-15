
import nodemailer from 'nodemailer'
import { file_share_validator_func } from "../utilities/Validating_func.js";
import { sending_input_type_file_template } from '../utilities/html_template.js';
import jwt from 'jsonwebtoken'



export const send_file_input_func=async(req,res)=>{
console.log(process.env.JWT_SECRET_KEY)
      try {

    const {token,userEmail,receiverEmail,title,message}=req.body
    console.log("th request is",req.body)
    const files = req.files; 

    if(!token)  return res.status(400).json({message:"Invalid User!"}) 
 const tokenVerification=jwt.verify(token,process.env.JWT_SECRET_KEY)
// console.log("the user verificatio si",)
if(!tokenVerification || tokenVerification.userEmail!==userEmail) return res.status(400).json({message:"Invalid User!"})

 
    // console.log("the file value is",files)

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", 
  port: 587,
  secure: false, 
  auth: {
    user:process.env.SMTP_USER ,
    pass:process.env.SMTP_PASSWORD
    
  },
}); 

    // ------validations-------
    let validationStatus=  file_share_validator_func({userEmail,receiverEmail,title,files})
    console.log(">>>>>",validationStatus)
    if(!validationStatus.success) return res.status(400).json(validationStatus)

       

    const mailOptions = {
        from: '"I.point Support " <noreply@ipoint.in>',  
        to: receiverEmail,
        replyTo:userEmail,
        subject: title,
        text: message || '...',
        attachments:files.map((item,index)=>{
            return {
                filename: item.originalname,
                content: item.buffer,
                contentType: item.mimetype
            }      
        }),
        html:sending_input_type_file_template(title,message)
      };
      
    


await  transporter.sendMail(mailOptions);

res.status(200).json({
        message:"File sent successfully!"
    })
      } catch (error) {
        console.log("the error is",error)
        res.status(500).json({ message:"Invalid User!"})
      }
      

}