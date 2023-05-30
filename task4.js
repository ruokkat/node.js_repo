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
Object.defineProperty(exports, "__esModule", { value: true });
//1 таск
//1 таск
function runSequentially(items, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var results, i, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    results = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < items.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, callback(items[i], i)];
                case 2:
                    result = _a.sent();
                    results.push(result);
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, results];
            }
        });
    });
}
// Приклад використання:
// @ts-ignore
var inputItems = ["one", "two", "three"];
// @ts-ignore
var processedResults = await runSequentially(inputItems, function (item, index) { return __awaiter(void 0, void 0, void 0, function () {
    var processedItem, processedIndex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, processItem(item)];
            case 1:
                processedItem = _a.sent();
                return [4 /*yield*/, processIndex(index)];
            case 2:
                processedIndex = _a.sent();
                return [2 /*return*/, {
                        item: processedItem,
                        index: processedIndex,
                    }];
        }
    });
}); });
console.log(processedResults);
//2 таск
function modifyArray(array, rule) {
    var modifiedElements = [];
    for (var i = array.length - 1; i >= 0; i--) {
        if (rule(array[i])) {
            // Змінені елементи додаються до масиву `modifiedElements`
            modifiedElements.unshift.apply(modifiedElements, array.splice(i, 1));
        }
    }
    return modifiedElements;
}
// Приклад використання:
// @ts-ignore
var inputArray = [1, 2, 3, 6, 7, 9];
// @ts-ignore
var modifiedElements = modifyArray(inputArray, function (item) { return item % 2 === 0; });
console.log("Масив після змін:", inputArray);
console.log("Змінені елементи:", modifiedElements);
//3 таск
var fs = require("fs");
var path = require("path");
var axios = require("axios");
function processJSONFile(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var jsonContent, links, folderName, _i, links_1, link, htmlContent, fileName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jsonContent = fs.readFileSync(filePath, "utf-8");
                    links = JSON.parse(jsonContent);
                    folderName = path.basename(filePath, ".json") + "_pages";
                    fs.mkdirSync(folderName);
                    _i = 0, links_1 = links;
                    _a.label = 1;
                case 1:
                    if (!(_i < links_1.length)) return [3 /*break*/, 4];
                    link = links_1[_i];
                    return [4 /*yield*/, axios.get(link)];
                case 2:
                    htmlContent = _a.sent();
                    fileName = path.basename(link, ".html") + ".html";
                    fs.writeFileSync(path.join(folderName, fileName), htmlContent.data);
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("Операція завершена. HTML-вміст збережено у папці:", folderName);
                    return [2 /*return*/];
            }
        });
    });
}
// Приклад виклику:
var jsonFilePath = "links.json";
processJSONFile(jsonFilePath);
//4 таск
var os = require("os");
var si = require("systeminformation");
function printSystemInfo(frequencyInSeconds) {
    var systemInfo = {
        operatingSystem: os.type(),
        architecture: os.arch(),
        currentUser: os.userInfo().username,
    };
    console.log("System Info:", systemInfo);
    si.cpu().then(function (cpuData) {
        // @ts-ignore
        console.log("CPU Cores Models:", cpuData.cores.map(function (core) { return core.model; }));
        si.cpuTemperature().then(function (temperatureData) {
            console.log("CPU Temperature:", temperatureData.main);
        });
    });
    si.graphics().then(function (graphicsData) {
        console.log("Graphic Controllers:", graphicsData.controllers.map(function (controller) { return "".concat(controller.vendor, " ").concat(controller.model); }));
    });
    si.mem().then(function (memoryData) {
        var totalMemory = (memoryData.total / (1024 * 1024 * 1024)).toFixed(2);
        var usedMemory = (memoryData.used / (1024 * 1024 * 1024)).toFixed(2);
        var freeMemory = (memoryData.free / (1024 * 1024 * 1024)).toFixed(2);
        console.log("Memory:", "".concat(totalMemory, " GB total, ").concat(usedMemory, " GB used, ").concat(freeMemory, " GB free"));
    });
    si.battery().then(function (batteryData) {
        console.log("Battery Info:", batteryData);
    });
}
// Приклад виклику:
var frequencyInSeconds = 5;
setInterval(function () { return printSystemInfo(frequencyInSeconds); }, frequencyInSeconds * 1000);
var MyEventEmitter = /** @class */ (function () {
    function MyEventEmitter() {
        this.eventHandlers = {};
    }
    MyEventEmitter.prototype.registerHandler = function (eventName, callback) {
        // Додаємо обробник події до відповідного масиву обробників
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(callback);
    };
    MyEventEmitter.prototype.emitEvent = function (eventName) {
        // Викликаємо всі обробники події для заданої події
        var handlers = this.eventHandlers[eventName];
        if (handlers) {
            handlers.forEach(function (handler) { return handler(); });
        }
    };
    return MyEventEmitter;
}());
// Приклад використання:
var emitter = new MyEventEmitter();
emitter.registerHandler("userUpdated", function () {
    return console.log("Обліковий запис користувача оновлено");
});
emitter.emitEvent("userUpdated");
