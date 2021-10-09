import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';
import cors from 'cors';

dotenv.config();

class App {
    constructor() {
        const url = 'mongodb+srv://aoenning:685712@serverprodutosbomfilho.i0dbi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
        this.server = express();
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });


        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
