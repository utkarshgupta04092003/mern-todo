const authRoutes = require('./authRoutes');
const router = require('express').Router();


// basic routes for testing purpose
router.get('/', async (req, res) => {
    return res.json({status: true, msg: 'Backend APIs working'});
});

router.post('/', (req, res, next)=>{
    return res.send('working apis posts')
})


// auth routes redirect
router.use('/api/auth', authRoutes);



module.exports = router;