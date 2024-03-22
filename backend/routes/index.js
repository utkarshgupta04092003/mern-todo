const router = require('express').Router();
const authRoutes = require('./authRoutes');
const todoRouter = require('./todoRouter');
const categoryRouter = require('./categoryRoute');


// basic routes for testing purpose
router.get('/', async (req, res) => {
    return res.json({status: true, msg: 'Backend APIs working'});
});

router.post('/', (req, res, next)=>{
    return res.send('working apis posts')
})


// auth routes redirect
router.use('/api/auth', authRoutes);
router.use('/api/todos', todoRouter);
router.use('/api/category', categoryRouter);


module.exports = router;