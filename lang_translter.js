var fs = require("fs");
var utils = require("./utils").utils;
var inputText = fs.readFileSync(process.argv[2]).toString();
// var grammarFile = process.argv[3];
// var rulesFile = process.argv[4];
var grammarFile = './grammar.json';
var rulesFile = './rules.json';

var parser = utils.generateParser(grammarFile, rulesFile);
var parsedData = parser.parse(inputText);
console.log(JSON.stringify(parsedData));
