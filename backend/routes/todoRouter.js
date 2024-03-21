const router = require('express').Router();
const { add, getAll } = require('../controllers/todoControllers');

router.post('/add', add);
router.post('/getall', getAll);

module.exports = router;