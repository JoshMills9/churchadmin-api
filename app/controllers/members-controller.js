const User = require('../models/usersSchema')

const members = async(req, res, next) => {
    const userId = req.params.mid;    
    const user = await User.findOne({phone: userId });

    const members = user.members;

    res.status(200).json(members)
}

const createMember = async(req, res, next) => {
    const {Firstname, Lastname, DoB ,RegDate, Phone1, Phone2, Email, Residential, Marital, 
        NoChildren, Department, Occupation, isVisitor, isBaptised, Photo} = req.body;
    
    const userId = req.params.mid;  

    const member = {
            Firstname,
            Lastname,
            DoB,
            RegDate,
            Phone1,
            Phone2,
            Email,
            Residential,
            Marital,
            NoChildren,
            Department,
            Occupation,
            isVisitor,
            isBaptised,
            Photo
        }
  

    try{
        const newMember =  await User.findByIdAndUpdate( userId, { $push: { members: member } }, { new: true } )
        
        res.status(400).json(newMember);

    }catch(err){
        throw new Error('Failed to register member.')
    }
        
}


const updateMember = async(req, res, next) => {
    const userId = req.params.mid;   
    const {Firstname, Lastname, DoB ,RegDate, Phone1, Phone2, Email, Residential, Marital, 
        NoChildren, Department, Occupation, isVisitor, isBaptised, Photo} = req.body;
     
    const user = await User.findById(userId);

    const member = {
            Firstname,
            Lastname,
            DoB,
            RegDate,
            Phone1,
            Phone2,
            Email,
            Residential,
            Marital,
            NoChildren,
            Department,
            Occupation,
            isVisitor,
            isBaptised,
            Photo
    }
    
    const foundMember = user.members.Firstname(Firstname);

    if(foundMember){
        try{
            foundMember = member;
            const updatedMember = await user.save();
            res.status(402).json(updatedMember)
        }catch(err){
            throw new Error('Could not update member data.')
        }
    }


}


const removeMember = async(req, res, next) => {
    const userId = req.params.mid;   
    const {Firstname} = req.body;
     
    const user = await User.findById(userId);

    if(user){
        try{
            user.members.Firstname(Firstname).remove();
            const removedMember =  await user.save();
            res.status(200).json(removedMember)
        }catch(err){
            throw new Error('Could not remove member.')
        }
    }

}


exports.members = members;
exports.createMember = createMember;
exports.updateMember = updateMember;
exports.removeMember = removeMember;