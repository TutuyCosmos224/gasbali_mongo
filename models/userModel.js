const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: 3,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: 3,
    maxlength: 12,
    unique: true,
  },
  // password: {
  //   type: String,
  //   required: [true, 'Password is required'],
  // },
  gender: {
    type: String,
    enum : ['male','female'],
    required: [false],
  },
  age: {
    type: Number,
    min: 0,
    max: 100,
    required: [false],
  },
  money: {
    type: Number,
    min: 0,
    required: [false],
    default: 0,
  }
},
{
    timestamps: { createdAt: 'createdDate: ', updatedAt: 'modifyDate: ' },
    collection: 'users',
},
)



module.exports={ userSchema } ;