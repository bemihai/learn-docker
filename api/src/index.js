const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const { port, db, authApiUrl } = require("./configuration");
const { connectDb } = require("./helper/db")

const app = express(); 

const userSchema = new mongoose.Schema({
	name: String
}); 
const User = mongoose.model("User", userSchema);

app.get("/testapidata", (req, res) => {
	res.json({
		testApiData: true
	});
})

app.get("/testCurrentUser", (req, res) => {
	axios.get(authApiUrl + "/currentUser").then(response => {
		res.json({
			testCurrentUser: true,
			currentUserData: response.data
		});
	});
});

app.get("/test", (req, res) => {
	res.send("Our api server is working fine");
}); 

const startServer = () => {
	app.listen(port, () => {
	console.log(`Started api server on port ${port}`);
	console.log(`Database URL ${db}`);

	const mb = new User({name: "Mihai Berbec"});
	mb.save()

	console.log(`Auth api url ${authApiUrl}`);
	});
};

connectDb()
	.on("error", console.log)
	.on("disconnected", connectDb)
	.once("open", startServer);
