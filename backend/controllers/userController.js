import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";

//@desc Authenticate user
//@route  POST /api/users/login
//@access Private
const authUser = asyncHandler(async (req, res) => {
    res.send('Auth User')
});

//@desc   Register user
//@route  POST /api/users
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
//@route  GET /api/users
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