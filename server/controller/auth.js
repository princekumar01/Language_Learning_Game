const jwt = require('jsonwebtoken');
const model = require('../models/user');
const User = model.User;
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const privateKey = fs.readFileSync(
  path.resolve(__dirname, '../private.key'),
  'utf-8'
);

exports.signUp = (req, res) => {
  const user = new User(req.body);
  var token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: 'RS256',
  });
  const hash = bcrypt.hashSync(req.body.password, 10);
  
  user.userId=user.email.split('@')[0];
  user.token = token;
  user.password = hash;
  user.totalScore=[];
  user.answeredId=[];

  let obj={userId:user.email.split('@')[0],token:token};
  console.log(obj);
  user.save()
  .then(savedDocument => {
    // Handle the saved document
    
    res.status(201).json({obj});
  })
  .catch(error => {
    res.status(400).json(error);
    // Handle any errors
  });



 };

exports.login = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    if (isAuth) {
      var token = jwt.sign({ email: req.body.email }, privateKey, {
        algorithm: 'RS256',
      });
      doc.token = token;

      let obj={userId:req.body.email.split('@')[0],token:token};
      console.log(obj);
      
       doc.save();
       res.json({obj});

    }
    else{
        res.sendStatus(400);
    }
  } catch (err) {
    res.status(400).json(err);
  }

};

