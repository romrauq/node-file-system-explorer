const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.redirect("/expore?path" + __dirname);
});

const { getDirectoryContents } = require("./explorer");

app.get("/explore", (req, res) => {
	const dirPath = req.query.path;
	try {
		const contents = getDirectoryContents(dirPath);
		res.render("index", { contents, currentPath: dirPath });
	} catch (err) {
		res.status(500).send("Error reading directory: " + err.message);
	}
});
