export class Item {
  constructor(ItemName, ItemCount = 1) {
    this.ItemName = ItemName;
    this.ItemCount = ItemCount;
    this.isMarked = false;
  }
}
