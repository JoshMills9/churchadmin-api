const parsePhoneNumberFromString = require('libphonenumber-js')
const User = require('../models/usersSchema')


const generateOtp = async(req, res, next) => {
    const {phoneNumber, churchName, isSignup} = req.body
 

    if (!phoneNumber) {
        return res.json({ error: 'Phone number is required' }, { status: 400 });
      }

    const formatPhone = (raw) => {
        const phone = parsePhoneNumberFromString(raw, 'GH');
        return phone?.isValid() ? phone.format('E.164') : null;
      };

    if (formatPhone(phoneNumber)) {
        // Generate a 5-digit code
     const code = Math.floor(10000 + Math.random() * 90000);
     const phone = (formatPhone(phoneNumber))

    try{
        const existing = await User.findOne({ phone: phone });

        if(isSignup && existing){
            throw new Error('You aleady have an account. Please login')
        }else{
            const value = { code, phone, churchName }
            res.status(200).json(value)
        }
            
    }catch(err){
        throw new Error(err)
    }
    }
} 


exports.generateOtp = generateOtp;