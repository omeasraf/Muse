const chalk = require('chalk');

class logger {
    error(text) {
        text = typeof (text) == "object" ? JSON.stringify(text) : text;
        console.log(chalk.bold.red(text))
    }
    success(text) {
        text = typeof (text) == "object" ? JSON.stringify(text) : text;
        console.log(chalk.bold.greenBright(text))
    }
    warning(text) {
        text = typeof (text) == "object" ? JSON.stringify(text) : text;
        console.log(chalk.bold.yellow(text))
    }
    critical(text) {
        text = typeof (text) == "object" ? JSON.stringify(text) : text;
        console.log(chalk.blue.bgRed.bold(chalk.bold.white(text)))
    }
}

module.exports = logger;