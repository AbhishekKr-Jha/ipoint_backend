
import { GetObjectCommand, ListObjectsV2Command, S3Client} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import jwt from 'jsonwebtoken';







export const upload_list_generator=async (req,res)=>{
    const {userEmail,token}=req.body
    const view_url_array=[]

    const s3Client=new S3Client({
        region:process.env.AWS_REGION,
        credentials:{
            accessKeyId:process.env.AWS_ACCESS_KEY ,
            secretAccessKey:process.env.AWS_SECRET_KEY
       
        }
    })

    try { 

    if(!token)  return res.status(400).json({message:"Invalid User!"}) 
 const tokenVerification=jwt.verify(token,process.env.JWT_SECRET_KEY)
if(!tokenVerification || tokenVerification.userEmail!==userEmail) return res.status(400).json({message:"Invalid User!"})

    const command=new ListObjectsV2Command({
        Bucket:'imagepoint-v1',
        // Key:`/${userEmail}`,
Prefix: `${userEmail}/`
        
    })

    const get_presigned_view_url=async(key)=>{


        const command=new GetObjectCommand({
        Bucket:'imagepoint-v1',
            Key:key
        })
        try {    
            const view_url=await getSignedUrl(s3Client,command)
            console.log("thye list value is",view_url)
    return view_url
            
        } catch (error) {
           return "something went wrong"
        }
    
    } 

      
        const upload_list=await s3Client.send(command)

       if(upload_list?.KeyCount==0)  return res.status(500).json({
        success:false,
            userValidation:false,
            message:"No data available"
       })

        console.log("the upload lost is",upload_list)
        // let url= await get_presigned_view_url(upload_list.Contents[0].Key)

    for(let element of upload_list?.Contents){
    let url= await get_presigned_view_url(element?.Key)

    view_url_array.push({
        key:element?.Key,  
        view_url:url
    })
    }


res.status(200).json({
    success:true,
    // list:upload_list,
    url_list:view_url_array,
    userValidation:true,
    message:" List generated Successfully!"
})
        
    } catch (error) {
        console.log("error occured",error.name)
        console.log(error)
        res.status(500).json({
            success:false,
            userValidation:false,
            message:"Invalid User!"
        }) 
    }

}   



