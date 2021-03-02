import { Address } from '../model/address';

export class CustomerSimple {
    id: number = 0;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    address: Address = new Address();
    active: boolean = false;
}

export interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: Address;
    active: boolean;

    [others: string]: any;
}

export class Customer implements ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: Address;
    active: boolean;
    constructor(customer: Partial<ICustomer>) {
        this.id = typeof customer.id === 'number' ? customer.id : 0;
        this.firstName = typeof customer.firstName === 'string' ? customer.firstName : '';
        this.lastName = typeof customer.lastName === 'string' ? customer.lastName : '';
        this.email = typeof customer.email === 'string' ? customer.email : '';
        this.address = typeof customer.address === 'undefined' ? new Address() : customer.address;
        this.active = typeof customer.active === 'boolean' ? customer.active : false;
    }
}
