const categoryMapping: object = {
    properties: {
        categoryId: { type: 'keyword' },
        name: { type: 'text' },
        description: { type: 'text' }
    }
};

export default categoryMapping;
