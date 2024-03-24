const router = require('express').Router();
const { uploadProfileImage } = require('../controllers/uploadImageController');
const {login, signup, getUserDetails} = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
// setup multer
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });



router.post('/signup',signup)

router.post('/login',login)
router.post('/getuserdetails',verifyToken, getUserDetails);

router.post('/uploadprofileimage', verifyToken, upload.single('image'), uploadProfileImage);

module.exports = router;