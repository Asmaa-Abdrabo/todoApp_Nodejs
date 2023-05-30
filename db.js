const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected sucessfuly"))
  .catch((err) => {
    console.log(err);
  });