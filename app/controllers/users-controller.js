const User = require('../models/usersSchema')




const getUsers = async (req, res, next) => {
    const users = await User.find().exec()
    res.json(users)
}

const getUserById = async(req, res, next) => {
  const userId = req.params.uid;
  const foundUser = await User.findOne({phone: userId});
  res.status(200).json(foundUser);
}


const createUser = async (req, res, next) => {
  const { phone, churchName } = req.body;

    try{
      const createdUser = new User({
          church: churchName,
          phone,
          user: `@${churchName.split(' ').join('').toLowerCase()}`,
          img: null,
          members: [],
          attendace: [],
          pledges: [],
          cells: [],
          isSubscribed: false,
          notificaitons: [],
          posts: [],
          events: [],
          followers: [],
          following: [],
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
    res.json(foundUser)
  }catch(err){
    throw new Error(err)
  }
}

const updateUser = async (req, res, next) => {
  const userId = req.params.uid;
  const { church, phone, img } = req.body;

  console.log('Received img:', img); // Debug

  try {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    foundUser.church = church;
    foundUser.phone = phone;
    foundUser.img = img;

    const updatedUser = await foundUser.save();
    res.status(200).json(updatedUser);

  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Error updating user info.' });
  }
};


const removeUser = async(req, res, next) => {
  const userId = req.params.uid;
  const result = await User.findByIdAndDelete(userId)
  res.json(result)
} 


exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.logInUser = logInUser;
exports.updateUser = updateUser;
exports.removeUser = removeUser;