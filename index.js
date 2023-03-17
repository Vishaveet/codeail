const express =require('express');
const port=8000;
const app=express();

const expresslayouts=require('express-ejs-layouts');

app.use(express.static('./assets'));

app.use(expresslayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./routes'))

app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`Error is runing the server: ${err}`);
        return;
    }
    console.log(`Server is runing on :${port}`);
})