const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please enter your email address'],
        uppercase:true,
        unique:true,
        validate: [isEmail,'Please enter valid email address']
    },
    password:{
        type:String,
        required:[true,'Please enter password'],
        minlength:[8,'Password should be atleast 8 characters long'],
    }
});
userSchema.pre('save',async function(next){
    console.log('user is going to save to database');
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});
const User =  mongoose.model('user',userSchema);

module.exports = User;