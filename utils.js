var _ = require('lodash');
var fs = require('fs');
var jison = require('jison');
var ERROR_TEMPLATE = 'error: _FILE_: No such file or directory';
var dictionaryFile = './en-hi-dictionary.json';
var utils = {};

utils.jsonParser = function(filename){
  if(fs.existsSync(filename))
      return JSON.parse(fs.readFileSync(filename,'utf-8'));
  console.log(ERROR_TEMPLATE.replace(/_FILE_/,filename));
}

var generateGrammar = function(grammarFile, rulesFile){
    var grammar = utils.jsonParser(grammarFile);
    var rulesObj = utils.jsonParser(rulesFile);
    if(rulesObj && rulesObj.rules)
      grammar.lex.rules = rulesObj.rules;
    return grammar;
}

var getBNF = function(grammarFile, rulesFile){
    return generateGrammar(grammarFile, rulesFile);
}

utils.generateParser = function(grammarFile, rulesFile) {
      return new jison.Parser(getBNF(grammarFile, rulesFile));
}

var languageRuleMapper = function(targetLangRules, sourceLangParsedData){
    return _.flatten(_.map(sourceLangParsedData.sentences, function(sentence){
        return _.filter(targetLangRules, function(rule){
          return isIncludesAll(Object.keys(sentence), rule);
        });
    }));
}
var languageWordMapper = function(targetLangRules, sourceLangParsedData){
    var mappedRules = languageRuleMapper(targetLangRules, sourceLangParsedData);
    _.map(sourceLangParsedData.sentences, function(sentence){
      var subject = getTargetWord(sentence.subject.noun || sentence.subject.pronoun);
      var verb = getTargetWord(sentence.verb);
      var object = getTargetWord(sentence.object.noun || sentence.object.pronoun);
      var fullstop  = getTargetWord(sentence.fullstop);
      ///
    });
}

var getTargetWord = function(sourceWord){
  var dictionary = utils.jsonParser(dictionaryFile);
  return _.reduce(dictionary.words, function(word, allWords){
      return _.isEqual(allWords['en'], sourceWord) ? allWord['hi']] : word;
  }, null);
}

var isIncludesAll = function(array1, array2){
  return !_.difference(array1, array2).length && !_.difference(array2, array1).length;
}

utils.langConvertor = function(targetLanguageType, sourceLangParsedData, langStructureFile){
    var langStructure = utils.jsonParser(langStructureFile);
    if(targetLanguageType)
      return languageWordMapper(langStructure[targetLanguageType], sourceLangParsedData);
    console.log('Please mention proper target language.');
}

exports.utils = utils;
