import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import cors from 'cors';

class App {
    constructor() {
        this.server = express();
        mongoose.connect('mongodb+srv://aoenning:685712@serverprodutosbomfilho.i0dbi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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
