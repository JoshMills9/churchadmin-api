const User = require('../models/usersSchema')





const getUsers = async (req, res, next) => {
    const users = await User.find().exec()
    res.json(users)
}


const createUser = async (req, res, next) => {
    const { phoneNumber, churchName } = req.body;
      
    try{
        // Optional: store only unique users or update if they exist
        const existing = await User.findOne({ phone: phoneNumber });
        if (!existing) {
          const createdUser = new User({
             church: churchName, 
             phone: phoneNumber,
             posts: [],
             events: [],
             followers: [], 
            });
          await createdUser.save();
          res.json({user: createdUser})
        }else{
            res.json({error: 'You aleady have an account. Please login'})
        }

    }catch(err){
        console.log(err)
    }
}


exports.getUsers = getUsers;
exports.createUser = createUser;