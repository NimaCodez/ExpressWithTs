import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';
import helmet from 'helmet';
const { log } = console;

class App {
    public express: Application;
    public port: number;
    public db_url: string;
    constructor(controllers: Controller[], port: number, DB_URL: string) {
        this.express = express();
        this.port = port;
        this.db_url = DB_URL;

        this.initialiseDatabaseConnection(DB_URL);
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan("dev"));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false}));
        this.express.use(compression());
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
           this.express.use('/api', controller.router) 
        })
    }

    private initialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private initialiseDatabaseConnection(url: string): void {
        mongoose.connect(url, (err) => {
            if (err) return log(err);
            log('Connected To Database')
        })
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            log("App is running on port " + this.port)
        })
    }
}

export default App;
