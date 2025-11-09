import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

// context for global state management
const AppContext = createContext();

export const mockRestaurants = [
    {
        id: 1,
        name: "Pizza Palace",
        cuisine: "Italian",
        rating: 4.5,
        deliveryTime: "30-40 min",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Burger House",
        cuisine: "American",
        rating: 4.3,
        deliveryTime: "25-35 min",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Sushi Express",
        cuisine: "Japanese",
        rating: 4.7,
        deliveryTime: "40-50 min",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop"
    }
];

export const mockMenuItems = [
    { id: 1, name: "Margherita Pizza", price: 12.99, category: "Pizza", restaurant: "Pizza Palace", image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=200&fit=crop", rating: 4.6 },
    { id: 2, name: "Pepperoni Pizza", price: 14.99, category: "Pizza", restaurant: "Pizza Palace", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop", rating: 4.7 },
    { id: 3, name: "Classic Burger", price: 9.99, category: "Burgers", restaurant: "Burger House", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop", rating: 4.4 },
    { id: 4, name: "Cheese Burger", price: 10.99, category: "Burgers", restaurant: "Burger House", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=200&fit=crop", rating: 4.5 },
    { id: 5, name: "California Roll", price: 8.99, category: "Sushi", restaurant: "Sushi Express", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop", rating: 4.8 },
    { id: 6, name: "Salmon Nigiri", price: 11.99, category: "Sushi", restaurant: "Sushi Express", image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300&h=200&fit=crop", rating: 4.9 },
    { id: 7, name: "Veggie Pizza", price: 11.99, category: "Pizza", restaurant: "Pizza Palace", image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=300&h=200&fit=crop", rating: 4.3 },
    { id: 8, name: "BBQ Burger", price: 12.99, category: "Burgers", restaurant: "Burger House", image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300&h=200&fit=crop", rating: 4.6 }
];


const AppProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedCart = localStorage.getItem('cart');
        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    };

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            setCart(prev => prev.filter(i => i.id !== id));
        } else {
            setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
        }
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(i => i.id !== id));
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppContext.Provider
            value={{
                user, login, logout,
                cart, addToCart, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount,
                searchQuery, setSearchQuery,
                selectedCategory, setSelectedCategory
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };