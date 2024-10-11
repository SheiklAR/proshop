import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();
import router from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.get('/', (req, res) => {
    res.send("Api is running...")
});

app.use('/api/products', router);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on ${PORT} port`));