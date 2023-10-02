const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    _id: String,
    question:String,
    optionA:String,
    optionB:String,
    optionC:String,
    optionD:String,
    answer:String,
    score:Number,
});
const LanguageSchema = new Schema({
    _id: String,
    languageName: String,
    listOfQuestion: [questionSchema],
});

exports.Language = mongoose.model("Language", LanguageSchema); 