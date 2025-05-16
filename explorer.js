const fs = require("fs");
const path = require("path");

function getDirectoryContents(dirPath) {
	if (!dirPath) throw new Error("Path is undefined");
	const displayPath = dirPath + "/file_system"; // append it here
	const contents = fs.readdirSync(displayPath).map((name) => {
		const fullPath = path.join(displayPath, name);
		const isDirectory = fs.lstatSync(fullPath).isDirectory();
		return { name, fullPath, isDirectory };
	});

	return contents;
}

module.exports = { getDirectoryContents };
