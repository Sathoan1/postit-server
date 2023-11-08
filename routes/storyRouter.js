const router= require('express').Router()
const {
    getAllStories,
    getAStory,
    getUsersStories,
    createStory,
    editStory,
    deleteStory,
} = require('../controllers/storyController')

// all
router.get('/all/story', getAllStories)

// users
router.route('/user/story').get( getUsersStories).post(createStory)
router.route('/user/story/:storyId').get(getAStory).patch(editStory).delete(deleteStory)


module.exports=router