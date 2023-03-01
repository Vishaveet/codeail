const express =require('express');
const port=8000;
const app=express();

app.use('/',require('./routes'))

app.set('views engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`Error is runing the server: ${err}`);
        return;
    }
    console.log(`Server is runing on :${port}`);
})