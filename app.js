require('dotenv').config();
const express = require('express');
const connection = require('./database');
const cors = require('cors');
const morgan = require('morgan');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const passport = require('passport');
const { localStrategy, jwtStrategy } = require('./middlewares/passport');
const userRoutes = require('./api/user/user.routes');
const dynamicFormRoutes = require('./api/dynamicForm/dynamicForm.routes');
const port = process.env.PORT;

const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
  credentials: true,
};

const app = express();

app.use(express.json());

app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(passport.initialize());
passport.use('local', localStrategy);
passport.use('jwt', jwtStrategy);

app.use('/api', userRoutes);
app.use('/api', dynamicFormRoutes);

app.use(errorHandler);
app.use(notFound);
connection();
app.listen(port, () => {
  console.log(`The app is running on port: ${port}`);
});
