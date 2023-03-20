"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringIsOfOptions = void 0;

var optionsIncludeString = function optionsIncludeString(string, options) {
  return options.includes(string);
};

var stringIsOfOptions = function stringIsOfOptions(stringLevel, options) {
  if (optionsIncludeString(stringLevel, options)) {
    return stringLevel;
  }

  throw Error("\uD83E\uDDE8 '".concat(stringLevel, "' needs to be one of: ").concat(options));
};

exports.stringIsOfOptions = stringIsOfOptions;