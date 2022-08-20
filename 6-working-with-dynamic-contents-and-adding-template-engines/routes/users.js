const path = require('path');

const express = require('express');

const router = express.Router();
const HomeRouter = require('../routes/home');

router.get('/', (req, res, next) => {
  res
    .status(200)
  .render('users', {
    pageTitle: 'Users',
    path: '/users',
    users: HomeRouter.users
  });
});

module.exports = router;