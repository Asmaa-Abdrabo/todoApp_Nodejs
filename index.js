const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const userRouter = require("./routes/userRouter");
const todoRouter = require("./routes/todoRouter");
const morgan = require('morgan');
const cors = require('cors');
require('express-async-errors');
require('dotenv').config()
require("./db");


app.use(express.json());
app.use(express.urlencoded());
app.use("/users", userRouter);
app.use("/todo", todoRouter);

app.use(morgan('dev'))
app.use(cors())

app.use((err,req,res,next)=>{
	const statusCode = err.statusCode || 500;
	res.status(statusCode).send({
		status:statusCode,
		message: err?.message || 'internal server error',
		errors: err?.errors || []
	})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})