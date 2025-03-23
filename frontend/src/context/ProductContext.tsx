import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { fetchData } from "../services/api";

export interface Product {
    sku: string;
    name: string;
    description: string;
    categoryId: string;
}

interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (updatedProduct: Product) => void;
    deleteProduct: (sku: string) => void;
    searchProducts: (query: string) => Promise<void>; // ✅ Search Function
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchData("products").then(setProducts);
    }, []);

    const addProduct = (product: Product) => setProducts([...products, product]);

    const updateProduct = (updatedProduct: Product) => {
        setProducts(products.map((p) => (p.sku === updatedProduct.sku ? updatedProduct : p)));
    };

    const searchProducts = async (query: string): Promise<void> => {
        if (!query.trim()) {
            fetchData("products").then(setProducts)
        }
        else {
            const result = await fetchData(`products/search?q=${query}`);
            if (result?.[0]?._source)
                setProducts([result[0]._source]);
        }
    };

    const deleteProduct = async (sku: string) => {
        await fetchData(`products/${sku}`, "DELETE");
        setProducts(products.filter((p) => p.sku !== sku));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, searchProducts, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("useProductContext must be used within a ProductProvider");
    return context;
};
