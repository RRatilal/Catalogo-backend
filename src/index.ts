require('dotenv').config

import express, { json } from 'express';
import cors from 'cors';
import path from 'path'

import './database/connections';
import 'reflect-metadata';

import routes from './routes';

const app = express();

app.use(cors());
app.use(json());
app.use('/uploads', express.static(path.resolve(__dirname, "..", "uploads")))
app.use(routes);

app.listen(process.env.PORT || 3333)