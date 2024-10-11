import mongoose from "mongoose";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import colors from "colors";
import Order from "./models/orderModel.js";
import Product from "./models/productmodel.js";
import User from "./models/userModel.js";
import users from "./data/users.js";
import products from "./data/products.js";
dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const importedUsers = await User.insertMany(users);

        const adminUser = importedUsers[0]._id;

        const sampleProducts = products.map((product) => (
            {...product, user:adminUser}
        ))

        await Product.insertMany(sampleProducts);

        console.log('Data imported!'.green.inverse);
        process.exit();

    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!'.red.inverse);
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1)
    }
};

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}