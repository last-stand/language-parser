var fs = require("fs");
var utils = require("./utils").utils;
var input = process.argv[2];
var inputText = fs.existsSync(input) ? fs.readFileSync(input).toString() : input;

var grammarFile = './grammar.json';
var rulesFile = './rules.json';

var parser = utils.generateParser('./grammar.json', './rules.json');
var langStructureFile = './lang_structure.json';
var targetLanguageType = 'hi';

var parser = utils.generateParser(grammarFile, rulesFile);
var parsedData = parser.parse(inputText);
var translatedData = utils.langConvertor(targetLanguageType, parsedData, langStructureFile);
console.log(translatedData);
