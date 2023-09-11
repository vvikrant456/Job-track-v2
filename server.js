import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import { validateTest } from './middleware/validationMiddleware.js';

//routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

import errorHandlerMiddleware from './middleware/errorHandleMiddlware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

if (process.env.NODE_DEV === 'development') {
  app.use(morgan('dev'));
}
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'data received', data: req.body });
});

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

app.post('/api/v1/test', validateTest, (req, res) => {
  const { name } = req.body;
  res.json({ msg: `hello ${name}` });
});

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

//PAGE NOT FOUND
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Page not found' });
});

//HANDLING ERRORS
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server is running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
