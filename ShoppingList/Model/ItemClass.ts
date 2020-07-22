export class Item {
  constructor(
    public ItemName: string,
    public ItemCount = 1,
    public isMarkedIndex: number | null = null,
  ) {}

  get isMarked() {
    return typeof this.isMarkedIndex === 'number';
  }
}
