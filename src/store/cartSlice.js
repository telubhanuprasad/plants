import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: {} },
  reducers: {
    addToCart: (state, action) => {
      const plant = action.payload;
      if (!state.items[plant.id]) {
        state.items[plant.id] = { ...plant, quantity: 1 };
      }
    },
    increase: (state, action) => {
      const id = action.payload;
      if (state.items[id]) state.items[id].quantity += 1;
    },
    decrease: (state, action) => {
      const id = action.payload;
      if (state.items[id] && state.items[id].quantity > 1) {
        state.items[id].quantity -= 1;
      }
    },
    remove: (state, action) => {
      delete state.items[action.payload];
    },
  },
});

export const { addToCart, increase, decrease, remove } = cartSlice.actions;
export default cartSlice.reducer;
