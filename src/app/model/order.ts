import { Product } from "./product";

enum OrderStatus {
    new,
    shipped,
    paid
}

export interface IOrderedItem {
    product: Product;
    quantity: number;
}

export interface IOrder {
    id:number;
    customerID: number;
    items: Array<IOrderedItem>; 
    amount: number;
    status: OrderStatus;
}

export class orderedItem implements IOrderedItem {
    product: Product;
    quantity: number = 0;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}

export class Order implements IOrder {
    id:number = 0;
    customerID: number = 0;
    items: Array<IOrderedItem> = []; 
    amount: number = 0;
    status: OrderStatus = OrderStatus.new;

    constructor(orderedItems: Array<IOrderedItem> = []) {
        this.items = orderedItems;
        this.calculateAmount(orderedItems);
    }

    calculateAmount(orderedItems: Array<IOrderedItem> = []): void {
        let amount = 0;
        orderedItems.forEach(function (orderedItem) {
            amount += orderedItem.product.price * orderedItem.quantity;
          })
        this.amount = amount;
    }
}
