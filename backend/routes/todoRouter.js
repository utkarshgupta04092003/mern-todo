const router = require('express').Router();
const { add, getAll, toggleCompleted, addToImportant } = require('../controllers/todoControllers');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/add',verifyToken, add);
router.post('/getall', verifyToken, getAll);
router.post('/togglecompleted', verifyToken, toggleCompleted);

router.post('/addtoimportant', verifyToken, addToImportant);

module.exports = router;