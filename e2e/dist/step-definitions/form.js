"use strict";

var _cucumber = require("@cucumber/cucumber");

var _waitForBehavior = require("./setup/wait-for-behavior");

var _webElementHelper = require("../support/web-element-helper");

var _htmlBehavior = require("../support/html-behavior");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _cucumber.Then)(/^I fill in the "([^"]*)" input with "([^"]*)"$/i, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(elementKey, inputValue) {
    var driver, globalConfig, elementIdentifier;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          driver = this.screen.driver, globalConfig = this.globalConfig;
          console.log("I fill in the ".concat(elementKey, " input with ").concat(inputValue));
          _context2.next = 4;
          return (0, _webElementHelper.getElementLocator)(driver, elementKey, globalConfig);

        case 4:
          elementIdentifier = _context2.sent;
          _context2.next = 7;
          return (0, _waitForBehavior.waitFor)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var elementStable;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _waitForBehavior.waitForSelector)(driver, elementIdentifier);

                case 2:
                  elementStable = _context.sent;

                  if (!elementStable) {
                    _context.next = 6;
                    break;
                  }

                  _context.next = 6;
                  return (0, _htmlBehavior.inputElementValue)(driver, elementIdentifier, inputValue);

                case 6:
                  return _context.abrupt("return", elementStable);

                case 7:
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
(0, _cucumber.Then)(/^I select the "([^"]*)" option from the "([^"]*)"$/, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(option, elementKey) {
    var driver, globalConfig, elementIdentifier;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          driver = this.screen.driver, globalConfig = this.globalConfig;
          console.log("I select the ".concat(option, " option from the ").concat(elementKey, " dropdown"));
          _context4.next = 4;
          return (0, _webElementHelper.getElementLocator)(driver, elementKey, globalConfig);

        case 4:
          elementIdentifier = _context4.sent;
          _context4.next = 7;
          return (0, _waitForBehavior.waitFor)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var elementStable;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return (0, _waitForBehavior.waitForSelector)(driver, elementIdentifier);

                case 2:
                  elementStable = _context3.sent;

                  if (!elementStable) {
                    _context3.next = 6;
                    break;
                  }

                  _context3.next = 6;
                  return (0, _htmlBehavior.selectElementValue)(driver, elementIdentifier, option);

                case 6:
                  return _context3.abrupt("return", elementStable);

                case 7:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          })));

        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4, this);
  }));

  return function (_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());