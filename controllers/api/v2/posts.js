module.exports.index=function(req,res){
    return res.json(200,{
        message:"List of api in v2",
        posts:[]
    })
}