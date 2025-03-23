import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { fetchData } from "../services/api";

export interface Category {
    categoryId: string;
    name: string;
    description: string
}

interface CategoryContextType {
    categories: Category[];
    addCategory: (category: Category) => void;
    updateCategory: (updatedCategory: Category) => void;
    deleteCategory: (id: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchData("categories").then(setCategories);
    }, []);

    const addCategory = (category: Category) => setCategories([...categories, category]);

    const updateCategory = (updatedCategory: Category) => {
        setCategories(categories.map((c) => (c.categoryId === updatedCategory.categoryId ? updatedCategory : c)));
    };

    const deleteCategory = async (categoryId: string) => {
        await fetchData(`categories/${categoryId}`, "DELETE");
        setCategories(categories.filter((c) => c.categoryId !== categoryId));
    };

    return (
        <CategoryContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategoryContext = () => {
    const context = useContext(CategoryContext);
    if (!context) throw new Error("useCategoryContext must be used within a CategoryProvider");
    return context;
};
