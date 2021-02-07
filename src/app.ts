import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import auth from './api/twitch.auth';

const app = express();
app.use('/public', express.static('public'));
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());

app.use('/auth', auth);

app.get('/', (_, res) => {
  res.redirect('/public/index.html');
});

export default app;
