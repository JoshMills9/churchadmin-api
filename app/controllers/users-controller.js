const User = require('../models/usersSchema')





const getUsers = async (req, res, next) => {
    const users = await User.find().exec()
    res.json(users)
}


const createUser = async (req, res, next) => {
  const { phone, churchName } = req.body;
console.log(phone)
    try{
      const createdUser = new User({
          church: churchName, 
          phone: phone,
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

const removeUser = async(req, res, next) => {
  const userId = req.params.uid;
  const result = await User.findByIdAndDelete(userId)
  res.json(result)
} 


exports.getUsers = getUsers;
exports.createUser = createUser;
exports.removeUser = removeUser;