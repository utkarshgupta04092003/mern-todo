const Todos = require('../models/todoModel');

const add = async (req, res) => {
    
    try {
        const { title, description, user, dueDate, category } = req.body;
        const userId = user._id;
        // console.log('user', user);
        // console.log(title, description, userId, dueDate, category);

        const todo = await Todos.create({
            title, description, dueDate, user: userId, category
        })
        if (todo) {
            return res.json({ msg: "Todo Added Successfully", status: true, todo });
        }
        return res.json({ msg: "Something went wrong", status: false });
    }
    catch (err) {
        return res.json({ msg: "Internal Server error", status: false });
    }


}

const getAll = async (req, res) => {

    try {
        const { user, category } = req.body;
        const todos = await Todos.find({ user: user._id, category });
        if (!todos) {
            return res.json({ msg: 'No items found', status: false })
        }

        return res.json({ msg: "Items fetched successfully", status: true, todos });
    }
    catch (err) {
        return res.json({ msg: "Internal Server error", status: false });
    }
}

const toggleCompleted = async (req, res) => {
    try {
        const { todo } = req.body;

        const updatedTodo = await Todos.findOneAndUpdate(
            { _id: todo?._id }, // Filter to find the todo by its ID
            { $set: { isCompleted: !todo.isCompleted } }, // Update operation to set isCompleted to false
            { new: true } // Return the updated document
        );

        if (updatedTodo) {
            return res.json({ msg: 'Todo Updated', status: true, updatedTodo })
        } else {
            return res.json({ msg: 'Todo not found or not updated.', status: false })
        }
    } catch (error) {
        return res.json({ msg: 'Internal Server error.', status: false })
    }
}

const addToImportant = async (req, res) => {

    try {
        const { todo } = req.body;
        const updatedTodo = await Todos.findOneAndUpdate(
            { _id: todo?._id }, // Filter to find the todo by its ID
            { $set: { important: !todo.important } }, // Update operation to set isCompleted to false
            { new: true } // Return the updated document
        );

        if (updatedTodo) {
            return res.json({ msg: 'Added to important', status: true, updatedTodo })
        } else {
            return res.json({ msg: 'Error in adding to important.', status: false })
        }

    }
    catch (err) {
        return res.json({ msg: "Internal Server Error", status: false });
    }
}

const getImportant = async (req, res)=>{
    try{
        const {user} = req.body;
        const todos = await Todos.find({user: user._id, important: true});
        if(!todos){
            return res.json({msg: 'Something went wrong', status: false});
        }
        return res.json({msg: "Get all important todos", status: true, todos});
    }   
    catch(err){
        return res.json({msg: 'Internal Server Error', status: false});
    }
}

const addDescription = async (req, res)=>{
    try{
        const {description, todo, dueDate} = req.body;
        const isUpdate = await Todos.findOneAndUpdate(
            { _id: todo?._id }, // Filter to find the todo by its ID
            { $set: { description, dueDate } }, // Update operation to set isCompleted to false
            { new: true } // Return the updated document
        );
        if(!isUpdate){
            return res.json({msg: "Something went wrong", status: false});
        }
        return res.json({msg: "Data updated successfully", status: true, updated: isUpdate});
    }
    catch(err){
        return res.json({msg: "Internal Server error", status: false});
    }
}
const getParticularTodo = async (req, res)=>{

    try{
        const {todo} = req.body;
        
        const updated = await Todos.findById(todo?._id);
        if(!updated){
            return res.json({msg: "Something went wrong", status: false});
        }
        return res.json({msg: "Get particular todo successfully", status: true, updated});
    }
    catch(err){
        return res.json({msg: "Internal Server error", status: false});
    }
}

const deleteTodo = async (req, res)=>{

    try{
        const {todo} = req.body;
        const updated = await Todos.findByIdAndDelete(todo?._id);
        if(!updated){
            return res.json({msg: "Something went wrong", status: false});
        }
        return res.json({msg: "Deleted successfully", status: true});

    }
    catch(err){
        return res.json({msg: "Internal Server error", status: false});
    }
}

module.exports = { add, getAll, toggleCompleted, addToImportant , getImportant, addDescription, getParticularTodo, deleteTodo};