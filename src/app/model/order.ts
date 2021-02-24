import { Product } from "./product";

enum OrderStatus {
    new,
    shipped,
    paid
}

export interface IOrderedItem {
    productID: number;
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
    productID: number = 0;
    quantity: number = 0;
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
            // @todo: get product by ID from ProductService
            let price = 1000;
            amount += price * orderedItem.quantity;
          })
        this.amount = amount;
    }
}
