const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware'); 

app.set('view engine','ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.set('views',)
app.get('/',requireAuth,(req,res)=>{res.render('homepage')});
app.get('/bmi.ejs',(req,res)=>{res.render('bmi.ejs')});
app.get('/about.ejs',(req,res)=>{res.render('about.ejs')});
app.get('/underweight.ejs',(req,res)=>{res.render('underweight.ejs')});
app.get('/normal.ejs',(req,res)=>{res.render('normal.ejs')});
app.get('/overweight.ejs',(req,res)=>{res.render('overweight.ejs')});
app.get('/obese.ejs',(req,res)=>{res.render('obese.ejs')});
app.get('/homepage.ejs',requireAuth,(req,res)=>{res.render('homepage')});
app.use(routes);
//Database Connection
const dbURI = "mongodb+srv://ayush:ayush1002@cluster0.jawu5.mongodb.net/healthtracker";
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
  
app.listen(80);
console.log('listening at port 80')
