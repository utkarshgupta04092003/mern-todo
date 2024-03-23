
const Categories = require('../models/categoryModel');
const Todos = require('../models/todoModel');

// requrie token(user details), category name and 
const addCategory = async (req, res) =>{
    try{
        
        console.log('add category', req.body);
        const {category} = req.body;
        const user = req.body.user._id;

        const checkCategory = await Categories.find({ user, category})

        console.log('cehck categgory', checkCategory.length)
        if(checkCategory.length != 0){
            return res.json({msg: `${category} already exist`, status: false});
        }
        const createdCategory = await Categories.create({
            category, user
        })

        
        return res.json({msg: 'Category Added Successfully', category: createdCategory, status: true});
    }
    catch(err){
        return res.json({msg: 'Internal Server error', status: false, err});
    }
}

const getAllCategory = async (req, res) =>{
    try{
        const user = req.body.user._id;

        const categoryList = await Categories.find({user});

        delete req.body.user.password;
        
        return res.json({msg: 'Fetched all category of this user', categories: categoryList, user: req.body.user, status: true});
    }
    catch(err){
        return res.json({msg: 'Internal Server error', status: false, err});
    }
}

const getAllCategoryData = async (req, res) =>{
    try{

        const {category, user} = req.body;
        return res.json({msg: 'fetched successfully', status: true, category, user});

    }
    catch(err){
        return res.json({msg: 'Internal Server error', err, status: false});
    }
}

const deleteCategory = async (req, res)=>{
    try{
        const {selected} = req.body;
        console.log('selected', selected);
        const deletedTodos = await Todos.deleteMany({category: selected?._id});
        if(!deletedTodos){
            return res.json({msg: `${selected.category}'s todos not deleted`, status: false});
        }
        console.log('delted todos\n', deletedTodos);
        const updated = await Categories.findByIdAndDelete(selected?._id);
        if(updated){
            console.log('delted',updated);
            return res.json({msg: `${selected.category} deleted successfully`, status: true});
        }
        return res.json({msg: `${selected.category} not deleted`, status: false});
 

    }
    catch(err){
        return res.json({msg: 'Internal Server error', status: false});
    }
}
module.exports = {addCategory, getAllCategory, getAllCategoryData, deleteCategory}