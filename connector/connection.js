const mongoose = require("mongoose");
require("dotenv").config();

async function connectMongoose() {
	await mongoose.connect("mongodb+srv://gasBali:D8BpxTAeDhnkAQwr@cluster0.uho4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology:true }).then(() =>{
		console.log("mongoose connected..")
	})
}

module.exports = {connectMongoose};