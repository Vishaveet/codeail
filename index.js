const express =require('express');
const cookieParser=require('cookie-parser');
const port=8000;
const path=require('path');
const app=express();

app.use(express.urlencoded({extended:false}));

app.use(cookieParser());

const expresslayouts=require('express-ejs-layouts');

const db=require('./config/mongoose');


// use for session cookies
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportjwt=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore=require('connect-mongo')(session);
const flash=require('connect-flash');
const customMware=require('./config/middleware');
// const sassMiddleware=require('node-sass-middleware');

// app.use(sassMiddleware({
//     src:'/assets/scss',
//     dest:'/assets/css',
//     dubug:true

// }));

app.use(express.static('./assets'));

app.use(expresslayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views','./views');

// mango store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    // TODO change
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000* 60*100)
    },
    store:new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// make the uploads path is availble to the browser

// app.use('/uploads',express.static(__dirname+'/uploads'));
// app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(`Error is runing the server: ${err}`);
        return;
    }
    console.log(`Server is runing on :${port}`);
})
