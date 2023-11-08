const Story = require('../models/story');
const cloudinary= require('cloudinary').v2


// get all stories
const getAllStories= async (req, res)=>{
    try{
        const stories= await Story.find().populate('writtenBy', 'username')
        res.status(200).json({success: true, stories})
         }catch(error){
             res.json(error)
         }
};

// get a stories
const getAStory= async (req, res)=>{
    const {storyId}= req.params
    try{
   const story= await Story.findById({ _id: storyId}).populate('writtenBy', 'username')
   res.status(200).json({success: true, story})
   }catch(error){
    res.json(error)
   }
};

// !!!!!!!!!!! user stories !!!!!!

// get user stories
const getUsersStories= async (req, res)=>{
    res.send('get user story')
}

// create a story
const createStory= async (req, res)=>{
    const {userId}= req.user
    // get access to to the image in req.file

    try{
 //    image upload
 const result= await cloudinary.uploader.upload(req.files.image.tempFilePath, {
    use_filename: true,
    folder: 'postFileImages'
 })
 req.body.image= result.secure_url;
 req.body.writtenBy= userId
 // send post request
 const story= await Story.create({...req.body})
 res.status(201).json({success: true, story})
    }catch(error){
     res.json(error)
    }
}

// update story
const editStory= async (req, res)=>{
    res.send('update story')
}

// delete story
const deleteStory= async (req, res)=>{
    res.send('delete a story')
}

module.exports = {
    getAllStories,
    getAStory,
    getUsersStories,
    createStory,
    editStory,
    deleteStory,
  };