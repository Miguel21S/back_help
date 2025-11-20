import express, { Application } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { AppDataSource } from './core/database/db';
import { errorMiddleware } from './core/middleware/errorMiddleware';
import path from 'path';
import './controllers/passport';
import mainRouter from './routes';
import passport from 'passport';

const app: Application = express();
const PORT = process.env.PORT || 3025;

process.stdout.write = process.stdout.write.bind(process.stdout);
app.use(express.json());
app.use(cors(
   /*  {
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type,Authorization"
    } */
));


app.use(express.urlencoded({ extended: true }));

console.log("Server is starting...");

app.use(passport.initialize());

// app.use("/img", express.static(path.join(__dirname, "img")));
// app.use("/postImage", express.static(path.join(__dirname, "postImage")));


//////////////////  ROUTER 
app.use('/api', mainRouter);

AppDataSource.initialize()
    .then(() => console.log('Database connected'))
    .catch(error => {
        console.error("Database connection error: ", error)
        setTimeout(() => AppDataSource.initialize(), 5000);
    })

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/////////////////    ERROR NOT MANAGED
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});

