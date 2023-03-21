"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smoke = exports.regression = exports.dev = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _parseEnv = require("./env/parseEnv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config({
  path: (0, _parseEnv.env)('COMMON_CONFIG_FILE')
});

var hostsConfig = (0, _parseEnv.getJsonFromFile)((0, _parseEnv.env)('HOSTS_URLS_PATH'));
console.log('HostsConfig: ', hostsConfig);
var pagesConfig = (0, _parseEnv.getJsonFromFile)((0, _parseEnv.env)('PAGES_URLS_PATH'));
console.log('PagesConfig: ', pagesConfig);
var worldParameters = {
  hostsConfig: hostsConfig,
  pagesConfig: pagesConfig
};
var common = "./src/features/**/*.feature   --require-module ts-node/register   --require ./src/step-definitions/**/*.ts   -f json:./reports/report.json   --world-parameters ".concat(JSON.stringify(worldParameters), "   --format progress-bar");
var dev = "".concat(common, " --tags '@dev'");
exports.dev = dev;
var smoke = "".concat(common, " --tags '@smoke'");
exports.smoke = smoke;
var regression = "".concat(common, " --tags '@regression'");
exports.regression = regression;
console.log("\u2728\u2728\u2728MAGIC IS STARTING\u2728\u2728\u2728");