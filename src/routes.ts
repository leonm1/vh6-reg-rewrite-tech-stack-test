import * as express from 'express';
import helloHandler from './helloHandler';
import loginHandler from './loginHandler';
import { PORT } from '../assets/config';

const app = express();

app.post('/login', loginHandler);
app.all('/hello', helloHandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
