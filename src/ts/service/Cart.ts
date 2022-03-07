import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        this._items.push(item);
    }

    get items(): Buyable[] {
        return [...this._items];
    }

    get totalPrice(): number {
      return this._items.reduce((sum: number, item: Buyable) => {
        return sum + item.price;
      }, 0);
    }

    getDiscountedPrice(discount: number): number {
      return this.totalPrice * ((100 - discount) / 100);
    }

    removeItem(id: number): void {
      this._items = this._items.filter((item: Buyable) => item.id !== id);
    }
}
