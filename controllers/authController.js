const mongoose = require('mongoose');
const { exit } = require('process');
const User = require('../models/User');
const handleErrors = (err)=>{
    if(err.message.includes('user validation failed'))
    {
        console.log('Some error occured');
        
    }
    if(err.code===11000)
        {
            console.log('Email already registered');
            email.errors = 'Email already registered';
            exit();
        }
    
}


module.exports.signup_get = (req,res)=>{
    res.render('signup');
}

module.exports.signup_post = async (req,res)=>{
    const { email, password } = req.body;
    try{
    console.log('post method called');
    console.log(req.body);
    console.log(email,password);
       const user = await User.create({email,password});
        res.status(201).json(user);
        console.log('data sent successfully')
    }
    catch(err){
        handleErrors(err);
        console.log(err);
    }
}

module.exports.login_get = (req,res)=>{
    res.render('login.ejs');
}

module.exports.login_post = async (req,res)=>{
    const { email, password } = req.body;
    try{
    console.log('post method called');
    console.log(req.body);
    console.log(email,password);
       const user = await User.create({email,password});
        res.status(201).json(user);
        console.log('data sent successfully')
    }
    catch(err){
        handleErrors(err);
        console.log(err);
    }
}










