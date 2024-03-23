const router = require('express').Router();
const { addCategory, getAllCategory, getAllCategoryData, deleteCategory } = require('../controllers/listController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/addcategory',verifyToken, addCategory);
router.post('/getallcategory',verifyToken, getAllCategory);
router.post('/getcategorydata',verifyToken, getAllCategoryData);
router.post('/deletecategory', verifyToken, deleteCategory);

module.exports = router;