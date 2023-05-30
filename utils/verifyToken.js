const User = require("../models/user");
const AppError = require("./appError");
const jwt = require('jsonwebtoken');

module.exports = async (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token) return next(new AppError('please provide atoken',404))
    const {id}= jwt.verify(token,process.env.JWT_SECRET);
    const userF = await User.findOne({_id:id});
    if(!userF) return next(new AppError('invalid token',404))
    req.user=userF;
    next();
   }