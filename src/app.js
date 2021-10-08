import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import cors from 'cors';
import env from 'en'


class App {
    constructor() {
        this.server = express();
        mongoose.connect(process.env.MONGO_URL, {
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
