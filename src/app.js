import express from "express";
import path from "path"
import handlebars from "express-handlebars"
import cookieParser from "cookie-parser";
import { __dirname } from "./services/utils.js";

import vistasRouter from "./routers/views/index.router.js"
import viewMounths from "./routers/views/calendary.router.js"
import viewSessions from "./routers/views/session.router.js"

const app = express()

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..' , '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'handlebars');

app.use('/', vistasRouter, viewMounths, viewSessions)

export default app;