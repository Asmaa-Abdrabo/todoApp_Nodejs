const user = require("../models/user");
const AppError = require("../utils/appError");
const jwt = require('jsonwebtoken');

const getAllUsers=async (req, res,next) => {
    const users= await user.find();
    if(users.length==0) return next(new AppError('there is no user',404))
    res.send(users);
}
const getSingleUser= async (req, res,next) => {
    const { id } = req.params;
    const userF = await user.findById(id);
    if(!userF) return next(new AppError('user not found',404));
    res.send(userF);
   
  }
const signup = async (req, res,next) => {
    const {email,password}=req.body;
    const userCreated= await user.create({email,password});
    await userCreated.save();
    res.send(userCreated);
}


const login = async (req, res,next) => {
    const {email,password}=req.body;
    const userF= await user.findOne({email}).select('+password');
    if(!userF) return next(new AppError('Invalid credentials',404));
    const isMatch = userF.checkPassword(password);
    if(!isMatch) return next(new AppError('Invalid credentials',404));
    userF.password=undefined;
    const token = jwt.sign({ id:userF._id }, process.env.JWT_SECRET);
    res.send({userF,token});
}
const updateUser=async (req, res,next) => {
    const { id } = req.params;
    const {email,password}=req.body;
    const userUpdated = await user.findByIdAndUpdate(id,{email,password});
    res.send(userUpdated);
}
const patch=async (req, res) => {
    const { id } = req.params;
    const {email,password}=req.body;
    const userUpdated = await user.findByIdAndUpdate(id,{email,password});
    res.send(userUpdated);
}
const deleteUser=async (req, res) => {
    const { id } = req.params;
    const userDeleted = await user.findByIdAndDelete(id);
    if(!userDeleted) return next(new AppError('user not found',404));
    res.send(userDeleted);
}

module.exports={signup,getAllUsers,getSingleUser,updateUser,patch,deleteUser,login}