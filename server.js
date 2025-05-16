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

// Route for creating a new file:
app.post("/create-file", express.urlencoded({ extended: true }), (req, res) => {
	const dirPath = req.body.path;
	const fileName = req.body.filename;
	const filePath = path.join(dirPath, fileName);

	try {
		fs.writeFileSync(filePath, ""); // Create empty file
		res.redirect("/explore?path=" + encodeURIComponent(dirPath));
	} catch (err) {
		res.status(500).send("Error creating file: " + err.message);
	}
});

// Route for renaming a file:
app.post("/rename-file", express.urlencoded({ extended: true }), (req, res) => {
	const oldPath = req.body.path;
	const newName = req.body.newName;
	const dirPath = path.dirname(oldPath);
	const newPath = path.join(dirPath, newName);

	try {
		fs.renameSync(oldPath, newPath);
		res.redirect("/explore?path=" + encodeURIComponent(dirPath));
	} catch (err) {
		res.status(500).send("Error renaming file: " + err.message);
	}
});

// Route for deleting a file:
app.post("/delete-file", express.urlencoded({ extended: true }), (req, res) => {
	const filePath = req.body.path;
	const dirPath = path.dirname(filePath);

	try {
		fs.unlinkSync(filePath);
		res.redirect("/explore?path=" + encodeURIComponent(dirPath));
	} catch (err) {
		res.status(500).send("Error deleting file: " + err.message);
	}
});

// Start the server that listens on the defined port:
app.listen(PORT, () => {
	console.log(`File explorer running at http://localhost:${PORT}`);
});
