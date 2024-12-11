import mongoose from "mongoose";

const conversationSchema=mongoose.Schema({
    participants:[   //creating array of object
        { 
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"       //id of users stored
        }
    ],
    messages:[  //creating array
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",      //id of messages storing
            default:[]

        }
    ]
},{timestamp:true})

const Conversation = mongoose.model('Conversation',conversationSchema)

export default Conversation