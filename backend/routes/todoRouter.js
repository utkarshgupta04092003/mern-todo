const router = require('express').Router();
const { add, getAll } = require('../controllers/todoControllers');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/add',verifyToken, add);
router.post('/getall', verifyToken, getAll);

module.exports = router;