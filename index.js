const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const path = require('path');
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.urlencoded({limit:"10mb", extended:false}));

mongoose.connect(process.env.DATABASE_CONNECTION_URL);

const authRouter = require('./controllers/authentication.controller.js');
const dashboardRouter = require('./controllers/dashboard.contoller');


app.get('/', (req,res)=>{
    res.render('Home', {title:'Home'});
});

app.use('/', authRouter);
app.use('/dashboard', dashboardRouter);

app.listen(PORT, (req,res)=>{
    console.log("Your website is listening on port", PORT);
});