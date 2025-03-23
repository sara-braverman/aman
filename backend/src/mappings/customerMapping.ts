const customerMapping : object= {
    properties: {
        customerId: { type: 'keyword' },
        name: { type: 'text' },
        email: { type: 'keyword' }
    }
};

export default customerMapping;
