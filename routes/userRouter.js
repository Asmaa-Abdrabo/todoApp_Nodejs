const express = require("express");
const router = express.Router();
const {signup,getAllUsers,getSingleUser,updateUser,patch,deleteUser,login}=require('../controllers/userController');
const {loginValidation,signupValidation}=require("../utils/authenticationSchema")

router.get('/', getAllUsers)


router.post('/',signupValidation,signup );


router.post('/login',loginValidation,login);

router.get("/:id",getSingleUser);

router.put('/:id', updateUser)

router.patch('/:id', patch)

router.delete('/:id', deleteUser)

module.exports = router;