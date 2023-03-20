"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _cucumber = require("@cucumber/cucumber");

var fs = _interopRequireWildcard(require("fs"));

var _parseEnv = require("../../env/parseEnv");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("chromedriver");

require("geckodriver");

(0, _cucumber.Before)( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(scenario) {
    var ready;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log("\uD83E\uDD52 Running Cucumber Scenario: ".concat(scenario.pickle.name));
          _context.next = 3;
          return this.init();

        case 3:
          ready = _context.sent;
          return _context.abrupt("return", ready);

        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
(0, _cucumber.After)( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(scenario) {
    var _scenario$result,
        _this = this;

    var driver, scenarioStatus;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          driver = this.screen.driver;
          scenarioStatus = (_scenario$result = scenario.result) === null || _scenario$result === void 0 ? void 0 : _scenario$result.status;
          console.log("Scenario Status: ".concat(scenarioStatus));

          if (scenarioStatus === "FAILED") {
            driver.takeScreenshot().then(function (image) {
              _this.attach(image, "image/png");

              fs.mkdirSync((0, _parseEnv.env)("SCREENSHOT_PATH"));
              fs.writeFileSync("".concat((0, _parseEnv.env)("SCREENSHOT_PATH")).concat(scenario.pickle.name, ".png"), image, "base64");
            });
          }

          _context2.next = 6;
          return driver.quit();

        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}());