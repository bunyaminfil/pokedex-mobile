import React, { createContext, useState, ReactNode } from "react";

// Define the context type
interface FavoritesContextType {
    ids: string[]; // Array of favorite IDs as strings
    addFavorite: (id: string) => void; // Function to add a favorite
    removeFavorite: (id: string) => void; // Function to remove a favorite
}

// Create the context with an initial value
export const FavoritesContext = createContext<FavoritesContextType>({
    ids: [],
    addFavorite: () => {},
    removeFavorite: () => {},
});

// Define the props for the provider component
interface FavoritesContextProviderProps {
    children: ReactNode; // React children components
}

const FavoritesContextProvider: React.FC<FavoritesContextProviderProps> = ({ children }) => {
    const [favoriteMealIds, setFavoriteMealIds] = useState<string[]>([]);

    // Add a favorite ID to the list
    function addFavorite(id: string) {
        setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
    }

    // Remove a favorite ID from the list
    function removeFavorite(id: string) {
        setFavoriteMealIds((currentFavIds) => currentFavIds.filter((mealId) => mealId !== id));
    }

    // Define the context value
    const value: FavoritesContextType = {
        ids: favoriteMealIds,
        addFavorite,
        removeFavorite,
    };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export default FavoritesContextProvider;
