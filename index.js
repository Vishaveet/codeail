const express =require('express');
const port=8000;
const app=express();




app.listen(port,function(err){
    if(err){
        console.log(`Error is runing the server: ${err}`);
        return;
    }
    console.log(`Server is runing on :${port}`);
})