import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';

import { validateTest } from './middleware/validationMiddleware.js';

//routers
import jobRouter from './routes/jobRouter.js';

//middlware
import errorHandlerMiddleware from './middleware/errorHandleMiddlware.js';

if (process.env.NODE_DEV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'data received', data: req.body });
});

app.post('/api/v1/test', validateTest, (req, res) => {
  const { name } = req.body;
  res.json({ msg: `hello ${name}` });
});

app.use('/api/v1/jobs', jobRouter);

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
