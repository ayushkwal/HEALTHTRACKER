const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.set('views',)
app.get('/',(req,res)=>{res.render('homepage')});
app.get('/bmi.ejs',(req,res)=>{res.render('bmi.ejs')});
app.get('/underweight.ejs',(req,res)=>{res.render('underweight.ejs')});
app.get('/homepage.ejs',(req,res)=>{res.render('homepage')});
app.use(routes);
//Database Connection
const dbURI = "mongodb+srv://ayush:ayush1002@cluster0.jawu5.mongodb.net/healthtracker";
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
  
app.listen(80);
console.log('listening at port 80')
