const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const { getDirectoryContents } = require("./explorer");

const PORT = process.env.PORT || 3500;

app.set("view engine", "ejs");
app.use(express.static("public"));

// Default route redirects to current directory:
app.get("/", (req, res) => {
	res.redirect("/explore?path=" + encodeURIComponent(__dirname));
});

// Route for exploring directories
app.get("/explore", (req, res) => {
	const dirPath = req.query.path;
	try {
		const contents = getDirectoryContents(dirPath);
		const displayPath = dirPath + "/file_system"; // append it here
		res.render("index", { contents, currentPath: displayPath });
	} catch (err) {
		res.status(500).send("Error reading directory: " + err.message);
	}
});

// Start the server that listens on the defined port:
app.listen(PORT, () => {
	console.log(`File explorer running at http://localhost:${PORT}`);
});
