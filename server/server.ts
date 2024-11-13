import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/data/db';
import authRoutes from './src/routes/authRoutes';
import missileRoutes from './src/routes/missileRoutes';



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();


app.use('/api/', authRoutes);
app.use('/api/missile',missileRoutes );




app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});