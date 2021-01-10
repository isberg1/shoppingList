export class Item {
  constructor(
    readonly ItemName: string,
    readonly ItemCount = 1,
    readonly isMarkedIndex: number | null = null,
  ) {}

  get isMarked() {
    return typeof this.isMarkedIndex === 'number';
  }
}
