const productMapping: object = {
    properties: {
        sku: { type: 'keyword' },
        name: { type: 'text' },
        description: { type: 'text' },
        categoryId: { type: 'keyword' } 
    }
};

export default productMapping;
