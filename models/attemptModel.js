const mongoose = require('mongoose')

const attemptSchema = new mongoose.Schema({
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
  game: {
    type: String,
    required: [true, 'Game is required'],
  },
  time: {
    type: Number,
    required: [true, 'Gender is required'],
  },
},
{
    timestamps: { createdAt: 'createdDate: ', updatedAt: 'modifyDate: ' },
    collection: 'attemps',
},
)



module.exports={ attemptSchema } ;