"use strict";

var _cucumber = require("@cucumber/cucumber");

var _webElementHelper = require("../../support/web-element-helper");

var _waitForBehavior = require("../setup/wait-for-behavior");

var _htmlBehavior = require("../../support/html-behavior");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _cucumber.Then)(/^the "([^"]*)" should contain the text "(.*)"$/, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(elementKey, expectedElementText) {
    var driver, globalVariables, globalConfig, elementIdentifier;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          driver = this.screen.driver, globalVariables = this.globalVariables, globalConfig = this.globalConfig;
          console.log("the ".concat(elementKey, " header should contain the text ").concat(expectedElementText));
          _context2.next = 4;
          return (0, _webElementHelper.getElementLocator)(driver, elementKey, globalVariables, globalConfig);

        case 4:
          elementIdentifier = _context2.sent;
          _context2.next = 7;
          return (0, _waitForBehavior.waitFor)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var elementText;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _htmlBehavior.getElementText)(driver, elementIdentifier);

                case 2:
                  elementText = _context.sent;
                  return _context.abrupt("return", elementText === null || elementText === void 0 ? void 0 : elementText.includes(expectedElementText));

                case 4:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })));

        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());