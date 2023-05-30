const express = require('express');
const router = express.Router();
const verifyToken=require('../utils/verifyToken');
const ToDo = require('../models/todo');
require('express-async-errors');

// get todos
// router.get('/',async (req,res)=>{
// 	const todos=await ToDo.find().populate('userId');
// 	res.send(todos);
// })

// get todos for one user
router.get('/',verifyToken,async (req,res)=>{
	const todos=await ToDo.find({userId:req.user._id}).populate('userId');
	res.send(todos);
})

router.post('/',verifyToken,async (req,res)=>{
	const {title}=req.body;
	const createdTodo=new ToDo({title,userId:req.user._id})
	await createdTodo.save();
	res.send(createdTodo);
})


module.exports = router;