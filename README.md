# API Service with Node.js and Elasticsearch

This project is an API service built using Node.js, typescript and Elasticsearch. It provides a robust system for managing customers, categories, products, and shopping carts.

## Setup Instructions

1. **Clone the Project**

   git clone git@github.com:sara-braverman/aman.git

2. **Install Dependencies**

   Navigate to the root of the cloned project and run:

   docker-compose up --build

   The API will be accessible at `http://localhost:3000`.

   Elastic service will be run at `http://localhost:9200`.

## Elasticsearch Indexes

The project includes four indexes in Elasticsearch:

1. **Customers**
2. **Categories of Products**
3. **Products** (with SKU, name, description, and category affiliation)
4. **Shopping Cart** (holding a list of products and quantities for each customer)

## CRUD Operations

### Categories

#### Get All Categories

```bash
curl -X GET http://localhost:3000/categories
```

#### Get Category By ID

```bash
curl -X GET http://localhost:3000/categories/{categoryID}
```

#### Create Category

```bash
curl -X POST http://localhost:3000/categories \
     -H "Content-Type: application/json" \
     -d '{
           "categoryId": "123",
           "name": "Electronics",
           "description": "Category for electronic items"
         }'
```

#### Update Category

```bash
curl -X PUT http://localhost:3000/categories/123 \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Updated Electronics",
           "description": "Updated description for electronic items"
         }'
```

#### Delete Category

```bash
curl -X DELETE http://localhost:3000/categories/123
```

---

### Customers

#### Get All Customers

```bash
curl -X GET http://localhost:3000/customers
```

#### Create Customer

```bash
curl -X POST http://localhost:3000/customers \
     -H "Content-Type: application/json" \
     -d '{
           "customerId": "123",
           "name": "John Doe",
           "email": "john@example.com"
         }'
```

#### Get Customer By ID

```bash
curl -X GET http://localhost:3000/customers/123
```

#### Update Customer

```bash
curl -X PUT http://localhost:3000/customers/123 \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Jane Doe",
           "email": "jane@example.com"
         }'
```

#### Delete Customer

```bash
curl -X DELETE http://localhost:3000/customers/123
```

---

### Products

#### Get All Products

```bash
curl -X GET http://localhost:3000/products
```

#### Create Product

```bash
curl -X POST http://localhost:3000/products \
     -H "Content-Type: application/json" \
     -d '{
           "sku": "12345",
           "name": "Smartphone",
           "description": "Latest model smartphone",
           "categoryId": "123"
         }'
```

#### Get Product By ID

```bash
curl -X GET http://localhost:3000/products/12345
```

#### Update Product

```bash
curl -X PUT http://localhost:3000/products/12345 \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Updated Smartphone",
           "description": "Updated description",
           "categoryId": "123"
         }'
```

#### Delete Product

```bash
curl -X DELETE http://localhost:3000/products/12345
```

---

### Shopping Cart Functions

#### Fill the Customer's Shopping Cart with Products

Make sure to use existing `customerId` and `productId`.

```bash
curl -X POST http://localhost:3000/carts/cart123/items \
     -H "Content-Type: application/json" \
     -d '{
           "customerId": "123",
           "productId": "12345",
           "quantity": 2
         }'
```

#### Change the Quantity of a Product in the Cart

Ensure you use existing `customerId` and `productId`.

```bash
curl -X PUT http://localhost:3000/carts/cart123/items/12345 \
     -H "Content-Type: application/json" \
     -d '{
           "newQuantity": 3
         }'
```

#### Get Top Selling Products

```bash
curl -X GET http://localhost:3000/carts/top-selling
```

#### Search for Products

Search by name or description using a query string.

```bash
curl -X GET http://localhost:3000/products/search?q=Smartphone
```

---

## Conclusion

This API provides a comprehensive solution for managing an e-commerce backend, utilizing Elasticsearch for efficient data storage and retrieval. 