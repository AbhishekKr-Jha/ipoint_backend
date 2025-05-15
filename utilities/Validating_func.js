

const isValidEmail = (email,emailMsg) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return { success: false, message: emailMsg };
    }
    return {success:true}
  };

  
 export const validateOtp = (otp) => {
    if (!otp) {
      return { success: false, message: "OTP is required." };
    }
    if (!/^\d{6}$/.test(otp)) {
      return { success: false, message: "OTP must be a 6-digit number." };
    }
    return {success:true}

  };
  
  const validateToken = (token) => {
    if (!token) {
      return { success: false, message: "Token is required." };
    }
    return {success:true}

   };
  
 export const validateUserEmail = (email) => {
    if (!email) {
      return { success: false, message: "User email is required." };
    }
    return isValidEmail(email,"User email is invalid!");
  };
  
  const validateReceiverEmail = (email) => {
    if (!email) {
      return { success: false, message: "Receiver email is required." };
    }
    return isValidEmail(email,"Receiver email is invalid!");
  };
  
  const validateTitle = (title) => {
    if (!title) {
      return { success: false, message: "Title is required." };
    }
    return {success:true}

   };
  
  
  const validateFiles = (files) => {
    if (!files || files.length === 0) {
      return { success: false, message: "At least one file must be uploaded." };  
    }
    return {success:true}

   };
  
  const validateEmailsDifference = (userEmail, receiverEmail) => {
    if (userEmail === receiverEmail) {
      return { success: false, message: "Sender and receiver emails must be different." };
    }
    return {success:true}

   };
  



   export const send_otp_validator_func =  (data) => {

  
    const userEmailValidator = validateUserEmail(data.userEmail);
    if (!userEmailValidator.success) return userEmailValidator;
  
  
    return { success: true };
  };
  


  
  export const otp_data_validator_func =  (data) => {
    const otpValidator = validateOtp(data.otp);
    if (!otpValidator.success) return otpValidator;
  
    const tokenValidator = validateToken(data.token);
    if (!tokenValidator.success) return tokenValidator;
  
     const userEmailValidator = validateUserEmail(data.userEmail);
    if (!userEmailValidator.success) return userEmailValidator;
  
    return { success: true };
  };




  export const file_share_validator_func=(data)=>{

    const userEmailValidator = validateReceiverEmail(data.userEmail);
    if (!userEmailValidator.success) return userEmailValidator;

  const receiverEmailValidator = validateReceiverEmail(data.receiverEmail);
    if (!receiverEmailValidator.success) return receiverEmailValidator;

  
    const titleValidator = validateTitle(data.title);
    if (!titleValidator.success) return titleValidator;
  
    const fileValidator = validateFiles(data.files);
    if (!fileValidator.success) return fileValidator;
  
    const emailDiffValidator = validateEmailsDifference(data.userEmail, data.receiverEmail);
    if (!emailDiffValidator.success) return emailDiffValidator;

        return { success: true };

  }