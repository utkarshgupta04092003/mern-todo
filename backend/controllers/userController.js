const Users = require('../models/userModel');
const bcrypt = require('bcrypt');

const login = async (req, res, next) =>{
    
    try{
        const {username_email, password} = req.body;
        const user = await Users.findOne({
            $or: [
                { email: username_email},
                { username: username_email }
            ]}
        );

        if(!user){
            return res.json({msg: "Invalid email/password", status: false});
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if(checkPassword){
            return res.json({msg: `Successfully logged in ${user.username}`, status: true, user});
        }
        return res.json({msg: "Invalid password", status: false});
    }
    catch(err){
        return res.json({msg: "Internal Server error", status: false});
    }
}

const signup = async (req, res, next) =>{

    try{

        const {username, email, password} = req.body;
        console.log(username, email, password);
        const emailCheck = await Users.findOne({email});
        if(emailCheck){
            return res.json({msg: 'user already exist', status: false});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({username, email, password: hashedPassword});
        if(!user){
            return res.json({msg: 'Error in creating user', status: false})
        }
        return res.json({msg: `Successfully register ${username}`, status: true, user: user});


    }
    catch(err){
        return res.json({msg: "Internal Server error", status: false});
    }

}

module.exports = {login, signup};