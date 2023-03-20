"use strict";

var _cucumber = require("@cucumber/cucumber");

var _chai = require("chai");

var _seleniumWebdriver = require("selenium-webdriver");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _cucumber.Then)(/^the "([^"]*)" should contain the text "(.*)"$/, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(elementKey, expectedElementText) {
    var driver, element, elementText;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          driver = this.screen.driver;
          console.log("the ".concat(elementKey, " header should contain the text ").concat(expectedElementText));
          _context.next = 4;
          return driver.findElement(_seleniumWebdriver.By.css('[data-id="contacts"]'));

        case 4:
          element = _context.sent;
          _context.next = 7;
          return element.getAttribute("innerText");

        case 7:
          elementText = _context.sent;
          (0, _chai.expect)(elementText).to.contain(expectedElementText);

        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
(0, _cucumber.Then)(/^the "([^"]*)" should be displayed$/, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(elementKey) {
    var driver, element;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          driver = this.screen.driver;
          console.log("the ".concat(elementKey, " should be displayed"));
          _context2.next = 4;
          return driver.findElement(_seleniumWebdriver.By.css('[data-id="header-logo"]'));

        case 4:
          element = _context2.sent;
          _context2.t0 = _chai.expect;
          _context2.next = 8;
          return element.isDisplayed();

        case 8:
          _context2.t1 = _context2.sent;
          (0, _context2.t0)(_context2.t1).to.be.true;

        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}()); // who's there! s