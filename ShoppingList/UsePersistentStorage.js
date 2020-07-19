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
        while (_) try {
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.usePersistentStorage = void 0;
var react_1 = require("react");
var async_storage_1 = require("@react-native-community/async-storage");
var ItemClass_js_1 = require("../ShoppingList/ItemClass.js");
var LIST_KEY = 'LIST';
var emptyItemArray = [];
exports.usePersistentStorage = function () {
    var _a = react_1.useState(emptyItemArray), list = _a[0], setList = _a[1];
    // get DB data at startup
    react_1.useEffect(function () {
        var _retrieveData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var value, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, async_storage_1["default"].getItem(LIST_KEY)];
                    case 1:
                        value = _a.sent();
                        value !== null && setList(JSON.parse(value));
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _retrieveData();
    }, []);
    react_1.useEffect(function () {
        if (list && list.length > 0 && async_storage_1["default"]) {
            var _storeData = function () { return __awaiter(void 0, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, async_storage_1["default"].setItem(LIST_KEY, JSON.stringify(list))];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            console.log('store data error', error_2);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            _storeData();
        }
    }, [list]);
    var _deleteData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!async_storage_1["default"])
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, async_storage_1["default"].removeItem(LIST_KEY)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.log('delete data error', error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    /*
     -------- public API ---------
    */
    var addToList = function (item) {
        setList(function (val) { return __spreadArrays(val, [item]); });
    };
    var deleteList = function () {
        setList([]);
        _deleteData();
    };
    var removeItem = function (keys) {
        var dummyValue = 'dummyValue';
        var deleteObjet = new ItemClass_js_1.Item(dummyValue);
        var deleteCount = 1;
        var replaceDeleteIndexWithDummy = __spreadArrays(list);
        keys.forEach(function (indexKey) {
            replaceDeleteIndexWithDummy.splice(indexKey, deleteCount, deleteObjet);
        });
        var newList = __spreadArrays(replaceDeleteIndexWithDummy.filter(function (item) { return item.ItemName !== dummyValue; }));
        newList.length !== 0 ? setList(newList) : deleteList();
    };
    var editList = function (indexToEdit, newValue) {
        setList(function (currentList) {
            return currentList.map(function (oldValue, index) {
                return indexToEdit === index ? newValue : oldValue;
            });
        });
    };
    return { list: list, addToList: addToList, deleteList: deleteList, removeItem: removeItem, editList: editList };
};
