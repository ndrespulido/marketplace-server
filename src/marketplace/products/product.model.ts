export class Product {

    id: string;
    title: string;
    size: number;
    description: string;
    price: number;

    constructor(
        id: string,
    title: string,
    size: number,
    description: string,
    price: number   ) {
        this.id = id
        this.title=title;
        this.size=size;
        this.description=description;
        this.price=price;
    };
}

