const Data = require("../models/dataschema");

exports.create = async(req,res)=>{
    const {data_name}=req.body;
    const data=await  Data.create({
        data_name
    })
    if(data){
        res.json("data added")
    }
    else{
        res.json("wrong")
    }
}