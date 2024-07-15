const cartMapping: object = {
    properties: {
        cartId: { type: 'keyword' },
        customerId: { type: 'keyword' },
        items: {
            type: 'nested',
            properties: {
                productId: { type: 'keyword' },
                quantity: { type: 'integer' }
            }
        }
    }
};

export default cartMapping;
