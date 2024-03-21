const Todos = require('../models/todoModel');

const add = async (req, res)=>{
    

    try{
        const {title, description, user, dueDate, category} = req.body;

        console.log(title, description, user, dueDate, category);

        const todo = await Todos.create({
            title, description, dueDate, user, category
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
        const {user} = req.body;
        console.log('user id', user);
        const todos = await Todos.find({user});
        console.log(todos);
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