"use strict";
exports.__esModule = true;
exports.Item = void 0;
var Item = /** @class */ (function () {
    function Item(ItemName, ItemCount, isMarked, isMarkedIndex) {
        if (ItemCount === void 0) { ItemCount = 1; }
        if (isMarked === void 0) { isMarked = false; }
        if (isMarkedIndex === void 0) { isMarkedIndex = null; }
        this.ItemName = ItemName;
        this.ItemCount = ItemCount;
        this.isMarked = isMarked;
        this.isMarkedIndex = isMarkedIndex;
    }
    return Item;
}());
exports.Item = Item;
