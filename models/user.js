const mongoose = require("mongoose");
const bcrypt= require('bcrypt');

const schema = new mongoose.Schema({
  email: { type: String,required:true,unique:true  },
  password:{type: String,required:true,select:false}
});
schema.pre('save', async function(){
  const currentDocument=this;
  if (currentDocument.isModified('password')){
    const hashedPass= await bcrypt.hash(currentDocument.password,10);
    currentDocument.password=hashedPass;
  }
})
schema.methods.checkPassword=async function(password){
  const currentDocument=this;
  const isMatch = await bcrypt.compare(password,currentDocument.password);
  return isMatch;
}
const User =mongoose.model('user',schema);
module.exports=User;