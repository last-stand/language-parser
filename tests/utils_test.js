var utils = require('../utils').utils;
var expect = require('chai').expect;

var parser = utils.generateParser('./grammar.json', './rules.json');
var langStructureFile = './lang_structure.json';
var targetLanguageType = 'hi';

describe('| language translator |',function(){
  	beforeEach(function(){
  	});

  	describe("# English to Hindi translator",function(){
  		it("should return 'औगी मछली खाता है |'",function(done){
        var parsedData = parser.parse('Oggy eats fish.');
        expect(utils.langConvertor(targetLanguageType, parsedData, langStructureFile)).to.equal('औगी मछली खाता है |');
        done();
  		});
    })
});
