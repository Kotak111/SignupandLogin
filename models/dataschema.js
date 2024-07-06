const { Schema, model } = require("mongoose")

const DataSchema = new Schema({
        data_name:{
            type:String,
            required:true
        }
},{timestamps:true})

const Data= model("data",DataSchema)
module.exports=Data;