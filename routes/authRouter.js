const router= require('express').Router()
const{registerUser,logInUser, getUser}= require('../controllers/authController');

const auth = require('../middleware/auth')

router.post('/register', registerUser);
router.post('/login', logInUser);
router.get('/user', auth, getUser);

module.exports= router