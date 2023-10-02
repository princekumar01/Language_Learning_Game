const mongoose = require('mongoose');
//const { ObjectId } = require('mongodb');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  userId: { type: String, unique:true},
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: true,
  },
  password: { type: String, minLength: 6, required: true },
  token: String,
  totalScore:[ {
    languageName: String,
    maxScore: String} ],
  answeredId:[String],
});

exports.User = mongoose.model('User', userSchema);