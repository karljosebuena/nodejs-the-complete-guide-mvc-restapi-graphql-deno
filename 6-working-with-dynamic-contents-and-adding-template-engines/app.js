const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./util/path');
const HomeRouter = require('./routes/home');
const UsersRouter = require('./routes/users');

const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/home', HomeRouter.route);
app.use('/users', UsersRouter);

app.use('/', (req, res, next) => {
  res
    .status(404)
    .render('404', {
      pageTitle: 'Error 404',
    });
});

app.listen(PORT);
