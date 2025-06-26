const User = require('../models/usersSchema')

const posts = async(req, res, next) => {
    const userId = req.params.mid;    
    const user = await User.findById(userId);

    const posts = user.posts;

    res.status(200).json(posts)
}

const createPost = async(req, res, next) => {
    const {img, bg, text, vid, audio, title, } = req.body;
    
    const userId = req.params.mid;  

    const post = {
            img,
            bg,
            text,
            vid,
            audio,
            title,
            tagged: [],
            comments: [],
            isBlessed: false,
            blessed: [],
            shared: []
        }
  

    try{
        const newPost =  await User.findByIdAndUpdate( userId, { $push: {posts: post } }, { new: true } )
        
        res.status(400).json(newPost);

    }catch(err){
        throw new Error('Failed to create post.')
    }
        
}


const updatePost = async(req, res, next) => {
    const userId = req.params.mid;   
    const {id, img, bg, text, vid, audio, title, tagged, comments, blessed, shared, isBlessed} = req.body;
     
    const user = await User.findById(userId);

    const post = {
        img,
        bg,
        text,
        vid,
        audio,
        title,
        tagged,
        comments,
        isBlessed,
        blessed,
        shared
    }

    
    const foundPost = user.posts.id(id);

    if(foundPost){
        try{
            foundPost = post;
            const updatedPost = await user.save();
            res.status(402).json(updatedPost)
        }catch(err){
            throw new Error('Could not update member data.')
        }
    }


}


const removePost = async(req, res, next) => {
    const userId = req.params.mid;   
    const {id} = req.body;
     
    const user = await User.findById(userId);

    if(user){
        try{
            user.posts.id(id).remove();
            const removedPost =  await user.save();
            res.status(200).json(removedPost)
        }catch(err){
            throw new Error('Could not remove post.')
        }
    }

}


exports.posts = posts;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.removePost = removePost;