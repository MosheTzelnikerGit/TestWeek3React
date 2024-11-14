import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db';
import authRoutes from './src/routes/authRoutes';
import missileRoutes from './src/routes/ammoRoutes';
// import { createServer } from "http";
// import { initializeSocketServer } from "./src/socketServer";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

connectDB();

// const httpServer = createServer(app);
// const io = initializeSocketServer(httpServer);

app.use('/api', authRoutes);
app.use('/api',missileRoutes );




app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});