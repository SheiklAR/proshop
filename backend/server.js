import path from 'path';
import express, { json } from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();
const app = express();
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import { createPaymentIntent } from "./controllers/orderController.js";

const __dirname = path.resolve(); // set _dirname to current directory
console.log("dirname", __dirname);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


app.get('/', (req, res) => {
    res.send("Api is running...")
});

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.post('/api/config/stripe', createPaymentIntent);


app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
