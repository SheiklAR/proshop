import { name } from "ejs";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { admin } from "../middleware/authMiddleware.js";

//@desc   Authenticate user
//@route  POST /api/users/login
//@access Private
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {

        generateToken(res, user._id);

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
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User Already exists");
    }
    
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error("Invalid User Data");
    }

});

//@desc   Logout user
//@route  POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ messgae: 'LoggedOut Successfully' });
});

//@desc   Get User Profile
//@route  GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400)
        throw new Error('User Not Found');
    }
});

//@desc   Update User Profile
//@route  PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        };

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });

    } else {
        res.status(400)
        throw new Error("User Not Found");
    }
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