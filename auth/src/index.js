const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const { port, db, apiUrl } = require("./configuration");
const { connectDb } = require("./helper/db")

const app = express(); 

const userSchema = new mongoose.Schema({
	name: String
}); 
const User = mongoose.model("User", userSchema);

app.get("/test", (req, res) => {
	res.send("Our authentication server is working fine");
}); 

app.get("/testapidata", (req, res) => {
	axios.get(apiUrl + "/testapidata").then(response => {
		res.json({
			testApiData: response.data.testApiData
		});
	});
});

app.get("/api/currentUser", (req, res) => {
	res.json({
		id: "1234",
		email: "john.doe@gmail.com"
	})
}); 

const startServer = () => {
	app.listen(port, () => {
	console.log(`Started authentication server on port ${port}`);
	console.log(`Database URL ${db}`);
	});
};

connectDb()
	.on("error", console.log)
	.on("disconnected", connectDb)
	.once("open", startServer);
