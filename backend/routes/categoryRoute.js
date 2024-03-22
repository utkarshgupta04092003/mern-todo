const router = require('express').Router();
const { addCategory, getAllCategory } = require('../controllers/listController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/addcategory',verifyToken, addCategory);
router.post('/getallcategory',verifyToken, getAllCategory);


module.exports = router;