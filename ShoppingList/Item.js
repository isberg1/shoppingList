export class Item {
  constructor(ItemName, ItemCount = 1, isMarked = false, isMarkedIndex = null) {
    this.ItemName = ItemName;
    this.ItemCount = ItemCount;
    this.isMarked = isMarked;
    this.isMarkedIndex = isMarkedIndex;
  }
}
