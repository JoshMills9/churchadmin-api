const User = require('../models/usersSchema')

const events = async(req, res, next) => {
    const userId = req.params.mid;    
    const user = await User.findById(userId);

    const events = user.events;

    res.status(200).json(events)
}

const createEvent = async(req, res, next) => {
    const {startDate, endDate, host, guest, about, title, media, interested, shared} = req.body;
    
    const userId = req.params.mid;  

    const event = {
            title,
            startDate,
            endDate,
            host,
            guest,
            about,
            media,
            interested,
            shared
        }
  

    try{
        const newEvent =  await User.findByIdAndUpdate( userId, { $push: {events: event } }, { new: true } )
        
        res.status(400).json(newEvent);

    }catch(err){
        throw new Error('Failed to create Event.')
    }
        
}


const updateEvent = async(req, res, next) => {
    const userId = req.params.mid;   
    const {id, startDate, endDate, host, guest, about, title, media, interested, shared} = req.body;
     
    const user = await User.findById(userId);

    const event = {
        title,
        startDate,
        endDate,
        host,
        guest,
        about,
        media,
        interested,
        shared
    }


    
    const foundEvent = user.events.id(id);

    if(foundEvent){
        try{
            foundEvent = event;
            const updatedEvent = await user.save();
            res.status(402).json(updatedEvent)
        }catch(err){
            throw new Error('Could not update event.')
        }
    }


}


const removeEvent = async(req, res, next) => {
    const userId = req.params.mid;   
    const {id} = req.body;
     
    const user = await User.findById(userId);

    if(user){
        try{
            user.events.id(id).remove();
            const removedEvent =  await user.save();
            res.status(200).json(removedEvent)
        }catch(err){
            throw new Error('Could not remove event.')
        }
    }

}


exports.events = events;
exports.createEvent = createEvent;
exports.updateEvent = updateEvent;
exports.removeEvent = removeEvent;