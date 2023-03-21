"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectElementValue = exports.inputElementValue = exports.getElementWithOption = exports.getElementText = exports.getElement = exports.elementDisplayed = exports.clickElement = void 0;

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

var getElementWithOption = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(driver, elementIdentifier, option) {
    var element;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return driver.findElement(_seleniumWebdriver.By.css("".concat(elementIdentifier, " > option[value=\"").concat(option, "\"]")));

        case 2:
          element = _context2.sent;
          return _context2.abrupt("return", element);

        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));

  return function getElementWithOption(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getElementWithOption = getElementWithOption;

var elementDisplayed = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(driver, elementIdentifier) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return driver.findElement(_seleniumWebdriver.By.css(elementIdentifier));

        case 3:
          return _context3.abrupt("return", true);

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", false);

        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 6]]);
  }));

  return function elementDisplayed(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.elementDisplayed = elementDisplayed;

var getElementText = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(driver, elementIdentifier) {
    var element, elementText;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return getElement(driver, elementIdentifier);

        case 2:
          element = _context4.sent;
          _context4.next = 5;
          return element.getAttribute('innerText');

        case 5:
          elementText = _context4.sent;
          return _context4.abrupt("return", elementText);

        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));

  return function getElementText(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getElementText = getElementText;

var clickElement = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(driver, elementIdentifier) {
    var element;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return getElement(driver, elementIdentifier);

        case 2:
          element = _context5.sent;
          _context5.next = 5;
          return element.click();

        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));

  return function clickElement(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

exports.clickElement = clickElement;

var inputElementValue = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(driver, elementIdentifier, inputValue) {
    var element;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return getElement(driver, elementIdentifier);

        case 2:
          element = _context6.sent;
          _context6.next = 5;
          return element.clear();

        case 5:
          _context6.next = 7;
          return element.sendKeys(inputValue);

        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));

  return function inputElementValue(_x12, _x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}();

exports.inputElementValue = inputElementValue;

var selectElementValue = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(driver, elementIdentifier, option) {
    var element;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return getElementWithOption(driver, elementIdentifier, option);

        case 2:
          element = _context7.sent;
          _context7.next = 5;
          return element.click();

        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));

  return function selectElementValue(_x15, _x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}();

exports.selectElementValue = selectElementValue;