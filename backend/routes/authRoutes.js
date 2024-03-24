const router = require('express').Router();
const { uploadProfileImage } = require('../controllers/uploadImageController');
const {login, signup, getUserDetails} = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');


router.post('/signup',signup)

router.post('/login',login)
router.post('/getuserdetails',verifyToken, getUserDetails);

router.post('/uploadprofileimage', verifyToken, uploadProfileImage);

module.exports = router;