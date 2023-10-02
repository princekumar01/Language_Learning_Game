const model = require('../models/language')
const mongoose = require('mongoose');
const Language = model.Language;
const modeluser = require('../models/user');
const User = modeluser.User;


exports.getQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    
    let { option, questionId, userId, currentScore, flag } = req.body;
    console.log(id,flag);
    const user = await User.findOne({ userId });
      
    const language = await Language.findOne({ languageName: id });
    const list = language.listOfQuestion;

    let obj = {};

    for (let i = 0; i < list.length; i++) {
      if (list[i]._id == questionId) {
        if (list[i].answer == option) {
          currentScore = parseInt(currentScore) + parseInt(list[i].score);
          break;
        }
      }
    }

    const scoreObj = user.totalScore.find((score) => score.languageName === id);

    if (!scoreObj || scoreObj.maxScore < currentScore) {
      if (!scoreObj) {
        user.totalScore.push({ languageName: id, maxScore: currentScore });
      } else {
        scoreObj.maxScore = currentScore;
      }
    }
    console.log(flag);
    if (flag==false) {
      obj = { currentScore };
      await user.save();
      console.log(obj);
      res.json(obj);
      return;
    }

    for (let i = 0; i < list.length; i++) {
      if (!user.answeredId.includes(list[i]._id)) {
        user.answeredId.push(list[i]._id);
        obj = {...list[i].toObject(), currentScore };
        delete obj.answer;
        //console.log('->',obj);
        break;
      }
    }
     user.save();
    //console.log(obj);
    res.json(obj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

  

  exports.addQuestion = async(req, res) => {
      const {languageName,questionBody} = req.body;
      const id = req.params.id;
      let language = await Language.findOne({ languageName: languageName }).select('-_id');
      language.listOfQuestion.push(questionBody);
      
      console.log(language);
      try {
        const doc = await Language.findOneAndUpdate({ languageName: id }, language, { new: true });
        if (!doc) {
          return res.status(404).json({ message: 'Language not found' });
        }
        console.log(doc);
        res.status(200).json(doc);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      } 
  };
  

exports.getLeaderBoard = async (req, res) => {
  const user = await User.find();
  const id = req.params.id;
  console.log(id)
  try {
    let arr = [];
    
    const modifiedUser=user.forEach(item => {
      const englishScore = item.totalScore.find(score => score.languageName === id);
      if (englishScore) {
        const obj = {name:item.firstName,score:englishScore.maxScore};
        console.log(obj);
        arr.push(obj);
      } 
    });
    res.status(201).json(arr);
  } catch (err) {
    console.log("catch error-");
    console.log(err);
    res.status(400).json(err);
  }
};



