var fs = require("fs");
var ERROR_TEMPLATE = 'error: _FILE_: No such file or directory';
var main = require('./grammar.js').main;
var inputFile = process.argv.slice(1);

var getParsedData = function() {
  if(fs.existsSync(inputFile[1]))
      return main(inputFile);
    console.log(ERROR_TEMPLATE.replace(/_FILE_/,inputFile[1]));
}

var parsedData = getParsedData();
console.log(parsedData);
