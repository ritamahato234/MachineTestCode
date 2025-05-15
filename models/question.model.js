const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    text: { type: String,default:"" },            
    marks: { type: Number},           
    options: [{ type: String,default:""}],      
    correctAnswerIndex: { type: Number }, 
  },
{ timestamps:true,versionKey: false }
);
module.exports = mongoose.model("Question", questionSchema);
