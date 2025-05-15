import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'



export const delete_upload_func = async (req,res) => {
  
    const { key } = req.body;
    console.log("the key is",key)


    const s3Client = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId:process.env.AWS_ACCESS_KEY ,
            secretAccessKey:process.env.AWS_SECRET_KEY
       
      }
    })

    if(!key)return res.status(500).json({
      success:false,message:"File Deletion Error!"
    })

  const command = new DeleteObjectCommand({
    Bucket: 'bucketquickdrop',
    Key: key,
  });

  try {
    const response = await s3Client.send(command);
    // console.log(response.status)
    return res.status(200).json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
   return res.status(500).json({success:false,message:"File Deletion Error!"})
   
  }
}
