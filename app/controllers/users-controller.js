const User = require('../models/usersSchema')


//something here


const getUsers = async (req, res, next) => {
    const users = await User.find().exec()
    res.json(users)
}


const createUser = async (req, res, next) => {
        const { phoneNumber, churchName } = req.body;
    
        if (!phoneNumber) {
          return res.json({ error: 'Phone number is required' }, { status: 400 });
        }
    
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
          return res.json(createdUser);
        }else{
            res.json({error: 'You aleady have an account. Please login'})
        }
    }catch(err){
        res.json(err)
    }
}


exports.getUsers = getUsers;
exports.createUser = createUser;