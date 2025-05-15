
import { Router } from "express";
import { send_otp_func, verify_otp_func } from "../controllers/authentication_controller.js";
import { upload_url_generator } from "../controllers/file-upload-controller.js";
import { send_file_input_func } from "../controllers/send_file_input_controller.js";
import upload from "../utilities/file_handler_func.js";
import { upload_list_generator } from "../controllers/view-file-controller.js";

 
const router=Router() 



router.post('/request_otp',send_otp_func)
router.post('/verify_otp',verify_otp_func)

router.post('/upload_url',upload_url_generator)
router.post('/send_file_input',upload.array('sharedFile'),send_file_input_func)

router.post('/upload_list',upload_list_generator)  

// router.post('/get_upload_list',upload_list_generator)
// router.post('/share_file_links',send_file_links_func)



export default router
