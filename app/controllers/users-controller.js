const User = require('../models/usersSchema')
const parsePhoneNumberFromString = require('libphonenumber-js')

//something here


const getUsers = async (req, res, next) => {
    const users = await User.find().exec()
    console.log(users)
    res.json(users)
}


const createUser = async (req, res, next) => {
        const { phoneNumber, churchName } = req.body;
        
        if (!phoneNumber) {
          return res.json({ error: 'Phone number is required' }, { status: 400 });
        }
    
        
        /*const isValidPhoneNumber = (phone: string) => {
          const phoneNumber = parsePhoneNumberFromString(phone, "GH");
          return phoneNumber?.isValid() ?? false;
        };*/
    
        const formatPhone = (raw) => {
          const phone = parsePhoneNumberFromString(raw, 'GH');
          return phone?.isValid() ? phone.format('E.164') : null;
        };
    
        if (!phoneNumber) {
          return res.json({ error: 'Phone number is required' }, { status: 400 });
        }
    
        if (formatPhone(phoneNumber)) {
             // Generate a 6-digit code
          const code = Math.floor(10000 + Math.random() * 90000);
          const number = (formatPhone(phoneNumber))
    try{
        // Optional: store only unique users or update if they exist
        const existing = await User.findOne({ phone: number });
        if (!existing) {
          const createdUser = new User({
             church: churchName, 
             phone: number,
             posts: [],
             events: [],
             followers: [], 
            });
          await createdUser.save();
        }else{
            res.json({error: 'You aleady have an account. Please login'})
        }
    
        const value = {
          code,
          number
        }
    
        return res.json(value);

    }catch(err){
        console.log(err)
    }
}}


exports.getUsers = getUsers;
exports.createUser = createUser;