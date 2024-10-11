import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB is connected. host: ${conn.connection.host} `);
    } catch (err) {
        console.log('DB is not connected', err);
        process.exit(1);
    }
}

export default connectDB;