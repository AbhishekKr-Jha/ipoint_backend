import jwt from 'jsonwebtoken';

const otp_generator = (email,expiry) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    // return otp.toString();

    const token = jwt.sign(
        { email, otp },  
       'my_super_secret_key_123',
        { expiresIn: expiry }
      );

      return {
        token,otp
      }

  };
  
  export default otp_generator;
  