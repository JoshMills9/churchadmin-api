const User = require('../models/usersSchema')





const getUsers = async (req, res, next) => {
    const users = await User.find().exec()
    res.json(users)
}

const getUserById = async(req, res, next) => {
  const userId = req.params.uid;
}


const createUser = async (req, res, next) => {
  const { phone, churchName } = req.body;

    try{
      const createdUser = new User({
          church: churchName,
          phone,
          user: `@${churchName.toLowerCase()}`,
          img: '',
          posts: [],
          events: [],
          followers: [],
          });

      await createdUser.save();
      res.json({user: createdUser})
      
    }catch(err){
        throw new Error(err)
    }
}


const logInUser = async(req, res, next) => {
  const {phoneNumber} = req.body;
  try{
    const foundUser = await User.findOne({phone: phoneNumber})
    if(!foundUser){
      throw new Error('Account not found. Please signup.')
    }
    res.status(201).json(foundUser)
  }catch(err){
    throw new Error(err)
  }
}

const removeUser = async(req, res, next) => {
  const userId = req.params.uid;
  const result = await User.findByIdAndDelete(userId)
  res.json(result)
} 


exports.getUsers = getUsers;
exports.createUser = createUser;
exports.logInUser = logInUser;
exports.removeUser = removeUser;