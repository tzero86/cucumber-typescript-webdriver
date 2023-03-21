"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementText = exports.getElement = exports.elementDisplayed = void 0;

var _seleniumWebdriver = require("selenium-webdriver");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getElement = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(driver, elementIdentifier) {
    var element;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return driver.findElement(_seleniumWebdriver.By.css(elementIdentifier));

        case 2:
          element = _context.sent;
          return _context.abrupt("return", element);

        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));

  return function getElement(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getElement = getElement;

var elementDisplayed = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(driver, elementIdentifier) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return driver.findElement(_seleniumWebdriver.By.css(elementIdentifier));

        case 3:
          return _context2.abrupt("return", true);

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", false);

        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 6]]);
  }));

  return function elementDisplayed(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.elementDisplayed = elementDisplayed;

var getElementText = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(driver, elementIdentifier) {
    var element, elementText;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return getElement(driver, elementIdentifier);

        case 2:
          element = _context3.sent;
          _context3.next = 5;
          return element.getAttribute('innerText');

        case 5:
          elementText = _context3.sent;
          return _context3.abrupt("return", elementText);

        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));

  return function getElementText(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getElementText = getElementText;