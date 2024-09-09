export interface TransactionDto {
    id: number;
    datetime: string;
    status: string;
    total: number;
    buyer_uid: number;
    Item: TransactionDtoItem[];
}

export interface TransactionDtoItem {
    tpid: number;
    product: TransactionProductDto;
    quantity: number;
    subtotal: number;
}

export interface TransactionProductDto {
    product_id: number;
    name: string;
    image_url: string;
    price: number;
    has_stock: boolean;
}
