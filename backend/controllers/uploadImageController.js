const cloudinary = require('cloudinary').v2;
const Users = require('../models/userModel');

const jwt = require('jsonwebtoken');
const config = require('../config');

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        // console.log('res', result);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


//////////////////
//
// Main function
//
//////////////////



const uploadProfileImage = async (req, res) => {
    try {
        const imagePath = req.body.formData.image;
        // console.log('img backend', req.file);
        // console.log('path', req.body)

        
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };

        // Upload the image
        const { url } = await uploadImage(imagePath, options);

        // set this to user database
        const userId = req.body?.user._id;

        // update the profile url
        const user = await Users.findByIdAndUpdate(userId, { isAvatarImageSet: true, avatarImage: url});
        if(!user){
            return res.json({msg: 'User not found', status: false});
        }

        var token = jwt.sign({ user: user }, config.secret, {
            expiresIn: 86400, // expires in 24 hours
        });
        return res.json({msg: "Image successfully", status: true, token});
    }
    catch (err) {
        // console.log(err);
        return res.json({msg: 'Internal Server error', status: false})
    }

};

module.exports = {uploadProfileImage};