const express = require('express');
require('express-async-errors');
const blogsController = require('./controllers/blogs');
const usersController = require('./controllers/users');
const loginController = require('./controllers/login');
const authorsController = require('./controllers/authors');
const readingListController = require('./controllers/readinglists');

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.use('/api/blogs', blogsController);
app.use('/api/users', usersController);
app.use('/api/authors', authorsController);
app.use('/api/readinglists', readingListController);
app.use('/api/login', loginController);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();