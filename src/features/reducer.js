const initialState = {
    cart: JSON.parse(localStorage.getItem('cart')) || [], // Initialize from localStorage
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CART':
        return { ...state, cart: action.payload };
      case 'ADD_TO_CART':
        const updatedCart = [...state.cart, action.payload];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return { ...state, cart: updatedCart };
      case 'REMOVE_FROM_CART':
        const newCart = state.cart.filter((_, index) => index !== action.payload);
        localStorage.setItem('cart', JSON.stringify(newCart));
        return { ...state, cart: newCart };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  