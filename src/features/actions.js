export const setCart = (cart) => ({
    type: 'SET_CART',
    payload: cart
  });
  
  export const addToCart = (movie) => ({
    type: 'ADD_TO_CART',
    payload: movie
  });
  
  export const removeFromCart = (index) => ({
    type: 'REMOVE_FROM_CART',
    payload: index
  });
  