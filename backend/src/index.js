import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './db/db.js';
import userRoute from './routers/user.router.js';
import accountRoute from './routers/account.router.js';

dotenv.config({
  path: '.env',
});

const port = process.env.PORT || 3002;
const app = express();

app.use(cors());
app.use(express.json());

dbConnection();

app.use('/api/v1/users', userRoute);
app.use('/api/v1/account', accountRoute);

app.listen(port, () => console.log(`listening http://localhost:${port}`));
