module.exports = function(command, others) {
	return require("child_process").execSync(command, Object.assign({stdio:[process.stdin, process.stdout, process.stderr]}, others));
};
