import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import { useCartContext } from "../context/CartContext";
import { useProductContext } from "../context/ProductContext";

const Carts: React.FC = () => {
  const { carts, customers, addProductToCart, updateCartQuantity, getTopSellingProducts } = useCartContext();
  const { products } = useProductContext();
  const [topSelling, setTopSelling] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    getTopSellingProducts().then(setTopSelling);
  }, [getTopSellingProducts]);

  const handleProductChange = (cartId: string, productId: string) => {
    setSelectedProducts((prev) => ({ ...prev, [cartId]: productId }));
  };

  return (
    <Container className="mt-4">
      <h2>🛒 Shopping Carts</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cart ID</th>
            <th>Customer Name</th> 
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {carts?.map((cart) => {
            // Get the list of products NOT already in the cart
            const availableProducts = products.filter(
              (p) => !cart.items.some((item) => item.productId === p.sku)
            );

            return (
              <tr key={cart.cartId}>
                <td>{cart.cartId}</td>
                <td>{customers.find((c) => c.customerId === cart.customerId)?.name || "Unknown Customer"}</td>
                <td>
                  {cart.items.map((item) => (
                    <div key={item.productId} className="mb-2">
                      {products.find((p) => p.sku === item.productId)?.name || "Unknown Product"}
                      <Form.Control
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartQuantity(cart.cartId, item.productId, parseInt(e.target.value))
                        }
                        className="mt-2"
                        min="1"
                      />
                    </div>
                  ))}
                </td>
                <td>
                  {availableProducts.length > 0 ? (
                    <>
                      <Form.Select
                        value={selectedProducts[cart.cartId] || ""}
                        onChange={(e) => handleProductChange(cart.cartId, e.target.value)}
                        className="mb-2"
                      >
                        <option value="" disabled>Select Product</option>
                        {availableProducts.map((product) => (
                          <option key={product.sku} value={product.sku}>
                            {product.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Button
                        variant="primary"
                        onClick={() =>
                          selectedProducts[cart.cartId] &&
                          addProductToCart(cart.cartId, cart.customerId, selectedProducts[cart.cartId], 1)
                        }
                        disabled={!selectedProducts[cart.cartId]}
                      >
                        ➕ Add Product
                      </Button>
                    </>
                  ) : (
                    <p>No more products available</p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <h3>🔥 Top Selling Products</h3>
      <ul>
        {topSelling.map((product, index) => (
          <li key={index}>
            {products.find((p) => p.sku === product.productId)?.name || "Unknown Product"} - Sold:{" "}
            {product.totalQuantitySold}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Carts;
