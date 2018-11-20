import * as express from 'express';
import { helloWorldExHandler } from './hello-handler';
import { loginExHandler } from './login-handler';
import { PORT } from '../assets/config';

const app = express();

app.post('/login', loginExHandler);
app.all('/hello', helloWorldExHandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
