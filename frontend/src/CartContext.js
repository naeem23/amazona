import { createContext, useReducer } from 'react'

// create context 
export const cartContext = createContext() 

// initialState 
const initialState = {
    cart: {
        cartItems: [],
    },
}

const reducer = (state, action) => {
    switch (action.type) {
        case "CART_ADD_ITEM":
            return {
                ...state, 
                cart: {
                    ...state.cart, 
                    cartItems: [...state.cart.cartItems, action.payload],
                }
            }
        default:
            return state
    }
}

// create provider component 
export const CartProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = {state, dispatch}
    return <cartContext.Provider value={value}>{props.children}</cartContext.Provider>
}