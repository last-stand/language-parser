var _ = require('lodash');
var fs = require('fs');
var utils = {};

utils.jsonParser = function(filename){
  return JSON.parse(fs.readFileSync(filename,'utf-8'));
}

exports.utils = utils;
