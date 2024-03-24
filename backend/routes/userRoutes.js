const router = require('express').Router();
const { getUserDetails} = require('../controllers/userController');
const {verifyToken} = require('../middlewares/authMiddleware');


router.post('/getuserdetails',verifyToken, getUserDetails)




module.exports = router;