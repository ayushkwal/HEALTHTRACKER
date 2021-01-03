const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const handleErrors = (err) => {
  if (err.message.includes('user validation failed')) {
    console.log('Some error occured');
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(val);
      console.log(properties);
      errors[properties.path] = properties.message;
    });

  }
  if (err.code === 11000) {
    console.log('Email already registered');
    email.errors = 'Email already registered';
    exit();
  }
  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'ayush secret', {
    expiresIn: maxAge
  });
};

module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('post method called');
    console.log(req.body);
    console.log(email, password);
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(201).json({ user: user._id });
    console.log('data sent successfully')
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.login_get = (req, res) => {
  res.render('login.ejs');
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.logout_get = (req,res) =>{
  res.cookie('jwt','',{maxage:1});
  res.redirect('/homepage.ejs');
}