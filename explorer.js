const fs = require("fs");
const path = require("path");

function getDirectoryContents(dirPath) {
	const contents = fs.readdirSync(dirPath).map((name) => {
		const fullPath = path.join(dirPath, name);
		const isDirectory = fs.lstatSync(fullPath).isDirectory();
		return { name, fullPath, isDirectory };
	});
	return contents;
}

module.exports = { getDirectoryContents };
