const router = require('express').Router();
const {login, signup, getUserDetails} = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');



router.post('/signup',signup)

router.post('/login',login)
router.post('/getuserdetails',verifyToken, getUserDetails)


module.exports = router;