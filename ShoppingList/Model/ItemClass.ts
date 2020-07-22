export class Item {
  constructor(
    public ItemName: string,
    public ItemCount = 1,
    public isMarked = false,
    public isMarkedIndex: number | null = null,
  ) {}
}
