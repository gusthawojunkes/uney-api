import 'reflect-metadata';
import { createConnection } from 'typeorm'; 
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import * as cors from 'cors';

const options: cors.CorsOptions = {
    methods: 'GET,POST,PUT,DELETE',
    origin: 'http://localhost:3000'
};

const app = express()
createConnection()

app.use(cors(options));
app.use(bodyParser.json())
app.use(routes)

app.listen(5000)