import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchData } from "../services/api";

interface User {
    customerId: string;
    name: string;
    email: string;
}

interface UserContextType {
    users: User[];
    addUser: (user: User) => void;
    deleteUser: (customerId: string) => void;
    updateUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchData("customers").then(setUsers);
    }, []);

    const addUser = (user: User) => {
        setUsers((prevUsers) => [...prevUsers, user]);
    };

    const deleteUser = async (customerId: string) => {
        await fetchData(`customers/${customerId}`, "DELETE");
        setUsers((prevUsers) => prevUsers.filter(user => user.customerId !== customerId));
    };

    const updateUser = (updatedUser: User) => {
        setUsers(users.map((user) => (user.customerId === updatedUser.customerId ? updatedUser : user)));
    };

    return (
        <UserContext.Provider value={{ users, addUser, deleteUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
