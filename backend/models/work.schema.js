import mongoose from "mongoose"

const workSchema = new mongoose.Schema({
    name:String,
    jobType:String, 
    jobDescription:String, 
    phone:Number, 
    localidad:{ type: String, required: true },
    mail: { type: String, required: true },
    codigoConfirmacion: { type: String, default: null },
    codigoExpira: { type: Date, default: null },
    urgente:{
        type:Boolean,
        default:false
    }
},{ timestamps:true})


export default mongoose.model('works',workSchema)