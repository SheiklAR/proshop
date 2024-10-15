import jwt from 'jsonwebtoken';
import asyncHandler from "./asyncHandler.js"
import User from "../models/userModel.js";


// Protect Middleware
const protect = asyncHandler(async (req, res, next) => {
    const token  = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error(`Not authorized, token failed`)
        }
    } else {
        res.status(401);
        throw new Error("Not Authorized. No token");
    }

});

//Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not Authorized to access. Admin Route");
    }
};

export {protect, admin} 