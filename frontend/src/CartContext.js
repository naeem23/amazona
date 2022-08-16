import { createContext, useReducer } from 'react';

// create context
export const cartContext = createContext();

// initialState
const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'CART_ADD_ITEM': {
            // newItem with updated quantity
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            );
            // if the item exist in cart then it will update the exect cart item with new item as the quantity vary and other item in the cart will remain unchanged
            // on the other hand if the item doesn't exist in cart then it will simply add the new item add the end of the cart items array
            const cartItems = existItem
                ? state.cart.cartItems.map((item) =>
                      item._id === existItem._id ? newItem : item
                  )
                : [...state.cart.cartItems, newItem];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(
                (item) => item._id !== action.payload._id
            );
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case 'USER_INFO':
            return { ...state, userInfo: action.payload };
        case 'USER_SIGNOUT':
            return {
                ...state,
                cart: { cartItems: [], shippingAddress: {} },
                userInfo: null,
            };
        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                cart: { ...state.cart, shippingAddress: action.payload },
            };
        default:
            return state;
    }
};

// create provider component
export const CartProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return (
        <cartContext.Provider value={value}>
            {props.children}
        </cartContext.Provider>
    );
};
