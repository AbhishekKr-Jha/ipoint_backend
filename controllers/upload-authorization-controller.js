

export const verify_upload_authorization=async(req,res)=>{
const {access_code}=req.body
console.log("the user entered data is",access_code)
    
if(access_code=="commandcode00010"){
    res.status(200).json({
          success:true,
        message:"Code Verified Successfully!"
    })
}else{
    res.status(500).json({
        success:false,
      message:"Invalid access code!"
  })
}

}