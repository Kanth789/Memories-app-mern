import mongoose from "mongoose";

const postSchemma = mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    name:String,
    tags:[String],
    selectedFile:String,
    likes:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    }

})
export default  mongoose.model('PostMessage',postSchemma)
