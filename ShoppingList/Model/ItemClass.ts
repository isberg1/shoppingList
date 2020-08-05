export class Item {
  constructor(
    public ItemName: string,
    public ItemCount = 1,
    public isMarkedIndex: number | null = null,
  ) {}

  get isMarked() {
    return typeof this.isMarkedIndex === 'number';
  }

  set itemName(name: string) {
    this.ItemName = name;
  }
  set itemCounter(count: number) {
    this.ItemCount = count;
  }
}
