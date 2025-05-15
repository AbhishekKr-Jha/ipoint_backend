
import jwt from 'jsonwebtoken';
import { validateOtp } from '../utilities/Validating_func.js';

export const verify_profile_otp_func=async(req,res)=>{
    const {otp,token}=req.body   

  // ------validations
    let validationStatus=  validateOtp(otp)
    if(!validationStatus.success) return res.status(500).json(validationStatus)


        try {
          const isOtpCorrcet=jwt.verify(token, process.env.JWT_SECRET_KEY)
  if(isOtpCorrcet.otp!==Number(otp)) return res.status(500).json({
    success:false,
    message:"Invalid OTP!"
  })
   
  
 return  res.status(200).json({
      success:true,
          message:"Otp Verified Successfully!"
      })
        } catch (error) {
          console.log("the error is",error)
        return  res.status(500).json({success:false, message:"Something went wrong"})
        }


}

