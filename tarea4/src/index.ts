import express , {static as static_} from "express";
import path from 'path';
import dotenv from "dotenv"
dotenv.config()
import { engine } from 'express-handlebars';
import swaggerJsDoc from "swagger-jsdoc"
import { setup, serve} from "swagger-ui-express"

import {Server} from "http"


import routes from "./mailer/routes";


const port = process.env.PORT || 3001; 

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/assets',static_(path.join(__dirname,'..','public')))

app.use(routes);


  

const server: Server = app.listen(port, () => {
    console.log(`api running on port ${port}`);
}); 



