const path = require('path');

const express = require('express');

const router = express.Router();
const users = [];

router.get('/', (req, res, next) => {
  res
    .status(200)
    .render('home', {
      pageTitle: 'Home',
      path: '/home'
    });
});

router.post('/', (req, res, next) => {
  const {
    body: {
      user
    }
  } = req;

  users.push(user);

  res.redirect('/users');
});

exports.route = router;
exports.users = users;