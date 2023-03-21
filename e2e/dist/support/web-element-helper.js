"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementLocator = void 0;

var _navigationBehavior = require("./navigation-behavior");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getElementLocator = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(driver, elementKey, globalConfig) {
    var _pageElementMappings$, _pageElementMappings$2;

    var pageElementMappings, currentPage, elementIdentifier;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          pageElementMappings = globalConfig.pageElementMappings;
          _context.next = 3;
          return (0, _navigationBehavior.getCurrentPageId)(driver, globalConfig);

        case 3:
          currentPage = _context.sent;
          elementIdentifier = ((_pageElementMappings$ = pageElementMappings[currentPage]) === null || _pageElementMappings$ === void 0 ? void 0 : _pageElementMappings$[elementKey]) || ((_pageElementMappings$2 = pageElementMappings.common) === null || _pageElementMappings$2 === void 0 ? void 0 : _pageElementMappings$2[elementKey]);

          if (elementIdentifier) {
            _context.next = 7;
            break;
          }

          throw Error("\uD83E\uDDE8 Unable to find the ".concat(elementKey, " mapping."));

        case 7:
          return _context.abrupt("return", elementIdentifier);

        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));

  return function getElementLocator(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getElementLocator = getElementLocator;