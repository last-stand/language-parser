var _ = require('lodash');
var fs = require('fs');
var jison = require('jison');
var ERROR_TEMPLATE = 'error: _FILE_: No such file or directory';
var dictionaryFile = './en-hi-dictionary.json';
var redColor = '\x1b[31m%s\x1b[0m';
var utils = {};

utils.jsonParser = function(filename){
  if(fs.existsSync(filename))
      return JSON.parse(fs.readFileSync(filename,'utf-8'));
  console.log(redColor, ERROR_TEMPLATE.replace(/_FILE_/,filename));
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
    var translatedSentences = _.map(sourceLangParsedData.sentences, function(sentence, index){
      var newSentence = {};
      newSentence.subject = getTargetWord(sentence.subject && (sentence.subject.noun || sentence.subject.pronoun));
      newSentence.verb = getTargetWord(sentence.verb);
      newSentence.object = getTargetWord(sentence.object && (sentence.object.noun || sentence.object.pronoun));
      newSentence.fullstop  = getTargetWord(sentence.fullstop);
      return applyLanguageRules(newSentence, mappedRules, index).join(' ');
    });
    return translatedSentences.join(' ');
}

var applyLanguageRules = function(newSentence, mappedRules, index){
    return _.reduce(mappedRules[index], function(sentence, partsOfSpeech){
        return sentence.concat(newSentence[partsOfSpeech]);
    }, []);
}

var getTargetWord = function(sourceWord){
  var dictionary = utils.jsonParser(dictionaryFile);
  return _.reduce(dictionary.words, function(word, allWords){
      return _.isEqual(allWords['en'], sourceWord) ? allWords['hi'] : word;
  }, null);
}

var isIncludesAll = function(array1, array2){
  return !_.difference(array1, array2).length && !_.difference(array2, array1).length;
}

utils.langConvertor = function(targetLanguageType, sourceLangParsedData, langStructureFile){
    var langStructure = utils.jsonParser(langStructureFile);
    if(targetLanguageType)
      return languageWordMapper(langStructure[targetLanguageType], sourceLangParsedData);
    console.log(redColor, 'Please mention proper target language.');
}

exports.utils = utils;
