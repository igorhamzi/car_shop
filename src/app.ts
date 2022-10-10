import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import CarRoute from './routes/CarRoute';
import MotorcycleRoute from './routes/MotorcycleRoute';

const app = express();
app.use(express.json());
app.use('/cars', CarRoute);
app.use('/motorcycle', MotorcycleRoute);
app.use(errorHandler);

export default app;

// ErrorHandler inspirado na aula ao vivo 12.2(antiga 30.2)