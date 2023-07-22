"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rename = exports.compile = void 0;
var ejs_1 = __importDefault(require("ejs"));
var fs_1 = __importDefault(require("fs"));
var compile = function (templateDirName, outputDirName, data) { return __awaiter(void 0, void 0, void 0, function () {
    var tempFileNames, _i, tempFileNames_1, tempFileName, tempFilePath, outFilePath, template, content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, makeDir(outputDirName)];
            case 1:
                _a.sent();
                tempFileNames = fs_1.default.readdirSync(templateDirName);
                _i = 0, tempFileNames_1 = tempFileNames;
                _a.label = 2;
            case 2:
                if (!(_i < tempFileNames_1.length)) return [3 /*break*/, 6];
                tempFileName = tempFileNames_1[_i];
                tempFilePath = templateDirName + "/".concat(tempFileName);
                outFilePath = outputDirName + "/".concat(tempFileName);
                if (!fs_1.default.statSync(tempFilePath).isDirectory()) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, exports.compile)(tempFilePath, outFilePath, data)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                template = fs_1.default.readFileSync(tempFilePath, "utf8");
                console.log("convert ".concat(tempFilePath, " => ").concat(outFilePath));
                content = ejs_1.default.render(template, data);
                fs_1.default.writeFileSync(outFilePath, content, "utf8");
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.compile = compile;
var makeDir = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                fs_1.default.mkdir(path, { recursive: true }, function (err) {
                    if (err) {
                        if (fs_1.default.statSync(path).isDirectory()) {
                            resolve(null);
                        }
                        else {
                            reject("error: ".concat(path, " is not directory"));
                        }
                    }
                    else {
                        resolve(null);
                    }
                });
            })];
    });
}); };
var rename = function (outputDirName, defFileName) {
    var defStr = fs_1.default.readFileSync("".concat(outputDirName, "/").concat(defFileName), "utf8");
    var def = JSON.parse(defStr);
    for (var beforePath in def) {
        if (fs_1.default.existsSync("".concat(outputDirName, "/").concat(beforePath))) {
            if (def[beforePath] === "remove") {
                fs_1.default.unlinkSync("".concat(outputDirName, "/").concat(beforePath));
                console.log("remove ".concat(outputDirName, "/").concat(beforePath));
            }
            else {
                fs_1.default.renameSync("".concat(outputDirName, "/").concat(beforePath), "".concat(outputDirName, "/").concat(def[beforePath]));
                console.log("rename ".concat(outputDirName, "/").concat(beforePath, " => ").concat(outputDirName, "/").concat(def[beforePath]));
            }
        }
        else {
            console.log("skip ".concat(outputDirName, "/").concat(beforePath));
        }
    }
};
exports.rename = rename;
