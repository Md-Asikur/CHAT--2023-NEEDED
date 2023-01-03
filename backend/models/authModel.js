const {model,Schema} = require('mongoose');
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const registerSchema = new Schema({
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    image : {
        type : String,
        required : true
    },isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
},{timestamps : true});
registerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

registerSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", registerSchema);

module.exports = User;
