import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//@desc Authenticate user
//@route  POST /api/users/login
//@access Private
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        // set JWT as http-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin:user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error(`Invalid username  or password`)
    }
    
});

//@desc   Register user
//@route  POST /api/users/
//@access Private
const registerUser = asyncHandler(async (req, res) => {
    res.send('Register User')
});

//@desc   Logout user
//@route  POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('Logout User')
});

//@desc   Get User Profile
//@route  GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('Get User Profile')
});

//@desc   Update User Profile
//@route  PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('Update User Profile')
});

//@desc   Get all users
//@route  GET /api/users/
//@access Private/admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('all users')
});

//@desc   Delete user
//@route  delete /api/users/:id
//@access Private/admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('Deleted the user')
});

//@desc   Get User By Id
//@route  GET /api/users/:id
//@access Private/admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('User with the id')
});

//@desc   Update User
//@route  put /api/users/:id
//@access Private/admin
const updateUser= asyncHandler(async (req, res) => {
    res.send('User with the id')
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}