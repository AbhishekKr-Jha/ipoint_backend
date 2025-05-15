import nodemailer from 'nodemailer';
import { share_file_links_template } from '../utilities/html_template.js';





export const send_file_links_func=async(req,res)=>{
    const {userEmail,receiverEmail,title,message='',imageFiles=[],videoFiles=[],otherFiles=[],applicationFiles=[]}=req.body
// console.log("the image files are",applicationFiles)
  

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", 
  port: 587,
  secure: false, 
  auth: {
    user:process.env.SMTP_USER ,
    pass:process.env.SMTP_PASSWORD
   
  },
});

const mailOptions = {
        from: '"QuickDrop Support " <noreply@quickdrop.in>', 
        to: receiverEmail,
        replyTo:userEmail,
        subject: title,   
        // text: message,
        html:share_file_links_template(title,message,imageFiles,applicationFiles,videoFiles,otherFiles)
      };

      try {

await  transporter.sendMail(mailOptions);

res.status(200).json({
    success:true,
        message:"File sent successfully!"
    })
      } catch (error) {
        console.log("the error is",error)
        res.status(500).json({success:false, message:"Something went wrong"})
      }



}