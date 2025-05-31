const User = require('../models/usersSchema')





const getUsers = async (req, res, next) => {
    const users = await User.find().exec()
    res.json(users)
}


const createUser = async (req, res, next) => {
  const { phoneNumber, churchName } = req.body;

    try{
      const createdUser = new User({
          church: churchName, 
          phone: phoneNumber,
          posts: [],
          events: [],
          followers: [], 
            });
            
      await createdUser.save();
      res.json({user: createdUser})
      
    }catch(err){
        console.log(err)
    }
}


exports.getUsers = getUsers;
exports.createUser = createUser;