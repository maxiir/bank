const express= require('express');
const path= require('path');
const morgan = require('morgan');
const mysql = require ('mysql');
const myconnection = require ('express-myconnection');


const app=express();

app.set('port',process.env.PORT||3000)
app.listen(app.get('port'), ()=>{
    console.log('escuchando en puerto:',app.get('port'))
});

//middleware - connection mysql

app.use(morgan('dev'));
app.use(myconnection(mysql, {
    host:'localhost',
    user:'root',
    password:'',
    port:'3306',
    database:'bank'
}, 'single')) //single modulo de myconnect

app.use(express.urlencoded({extended:false})); //entender los datos mandados del formulario


//motor de plantilla
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

//statics files
app.use(express.static(path.join(__dirname, 'public')));

//import routes
const misRoutes = require('./routes/index.routes');

//routes
app.use('/',misRoutes)