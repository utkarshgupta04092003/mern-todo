const router = require('express').Router();
const { add, getAll, toggleCompleted, addToImportant, getImportant, addDescription, getParticularTodo, deleteTodo } = require('../controllers/todoControllers');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/add',verifyToken, add);
router.post('/getall', verifyToken, getAll);
router.post('/togglecompleted', verifyToken, toggleCompleted);

router.post('/addtoimportant', verifyToken, addToImportant);
router.post('/getimportant', verifyToken, getImportant);
router.post('/adddescription', verifyToken, addDescription);
router.post('/getparticulartodo', verifyToken, getParticularTodo);
router.post('/deletetodo', verifyToken, deleteTodo);

module.exports = router;