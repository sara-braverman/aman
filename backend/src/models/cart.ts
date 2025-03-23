export interface Cart {
    cartId: string;
    customerId: string; 
    items: CartItem[];
}

export interface CartItem {
    productId: string; 
    quantity: number;
}
