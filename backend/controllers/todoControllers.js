const Todos = require('../models/todoModel');

const add = async (req, res)=>{
    

    try{
        const {title, description, user, dueDate, category} = req.body;
        const userId = user._id;
        console.log('user', user);
        console.log(title, description, userId, dueDate, category);

        const todo = await Todos.create({
            title, description, dueDate, user: userId, category
        })
        if(todo){
            return res.json({msg: "Todo Added Successfully", status: true, todo});
        }
        return res.json({msg: "Something went wrong", status: false});
    }
    catch(err){
        return res.json({msg: "Internal Server error", status: false});
    }
    

}

const getAll = async(req, res)=>{

    try{
        console.log('req body', req.body);
        const {user} = req.body;
        console.log('user id', user);
        const todos = await Todos.find({user: user._id});
        console.log('all todos', todos);
        if(!todos){
            return res.json({msg: 'No items found', status: false})
        }
        
        return res.json({msg: "Items fetched successfully", status: true, todos});
    }
    catch(err){
        console.log(err);
        return res.json({msg: "Internal Server error", status: false});
    }
}

module.exports = {add, getAll};