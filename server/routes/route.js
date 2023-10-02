const express = require('express');
const languageController = require('../controller/language');

const router = express.Router();

router
  .post('/language/:id', languageController.getQuestion)
  .post('/add/:id', languageController.addQuestion)
  .get('/leaderboard/:id', languageController.getLeaderBoard);
  
exports.router = router;  