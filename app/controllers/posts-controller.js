const User = require('../models/usersSchema')

const posts = async(req, res, next) => {
    const userId = req.params.mid;    
    const user = await User.findById(userId);

    const posts = user.posts;

    res.status(200).json(posts)
}

const createPost = async(req, res, next) => {
    const {img, bg, text, vid, audio, title, tagged, comments, blessed, shared} = req.body;
    
    const userId = req.params.mid;  

    const post = {
            img,
            bg,
            text,
            vid,
            audio,
            title,
            tagged,
            comments,
            blessed,
            shared
        }
  

    try{
        const newPost =  await User.findByIdAndUpdate( userId, { $push: {posts: post } }, { new: true } )
        
        res.status(400).json(newPost);

    }catch(err){
        throw new Error('Failed to create post.')
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


exports.posts = posts;
exports.createPost = createPost;
exports.updateMember = updateMember;
exports.removeMember = removeMember;