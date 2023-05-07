import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_products: [],
  filtered_products: [],
  filter: {
    search: "",
    price: Number.MAX_VALUE,
    category: "all",
    company: "all",
    availability: {
      inStock: false,
      outOfStock: false,
    },
    freeShipping: false,
  },
  isLoading: false,
  error: null,
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    LOADING_PRODUCTS: (state, action) => {
      return { ...state, isLoading: action.payload };
    },
    SET_ALL_PRODUCTS: (state, action) => {
      const { products } = action.payload;
      return { ...state, all_products: products };
    },
    APPLY_FILTERS: (state, action) => {
      let { filter } = action.payload;
      let filteredProducts = state.all_products;
      // Search
      if (filter.search.length > 1) {
        const { search } = filter;
        filteredProducts = filteredProducts.filter(
          (product) => product.name.search(search) !== -1
        );
      }
      // Category
      if (filter.category !== "all") {
        const { category } = filter;
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category
        );
      }
      // Company
      if (filter.company !== "all") {
        const { company } = filter;
        filteredProducts = filteredProducts.filter(
          (product) => product.company === company
        );
      }
      // Price
      if (filter.price > 0) {
        const { price } = filter;
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= price
        );
      }
      // Free Shipping
      if (filter.freeShipping) {
        filteredProducts = filteredProducts.filter(
          (product) => product.shipping === filter.freeShipping
        );
      }
      // Availability
      if (filter.availability.inStock) {
        filteredProducts = filteredProducts.filter(
          (product) => product.stock > 0
        );
      }
      return { ...state, filter, filtered_products: filteredProducts };
    },
  },
});

export const { actions: productActions, reducer: productReducers } =
  ProductSlice;
