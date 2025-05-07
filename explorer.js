const fs = require("fs");
const path = require("path");

function getDirectoryContents(dirPath) {
	if (!dirPath) throw new Error("Path is undefined");

	const contents = fs.readdirSync(dirPath).map((name) => {
		const fullPath = path.join(dirPath, name);
		const isDirectory = fs.lstatSync(fullPath).isDirectory();
		return { name, fullPath, isDirectory };
	});

	return contents;
}

module.exports = { getDirectoryContents };
