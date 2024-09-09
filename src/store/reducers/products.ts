import {
  createAction,
  createReducer,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import fetchAllProducts from '../thunks/productThunks';
import { Product } from '../../@types/types';
import {
  fetchAddProductToFav,
  fetchDeleteFav,
} from '../thunks/favoritesThunks';

interface ProductsState {
  allProducts: Product[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: ProductsState = {
  allProducts: [],
  loading: false,
  error: null,
};

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload;
      state.loading = false;
    })
    .addCase(fetchAllProducts.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(fetchAddProductToFav.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchAddProductToFav.fulfilled, (state, action) => {
      state.allProducts.push({
        id: action.payload,
        isFav: true,
        name: '',
        description: '',
        latin_name: '',
        category_id: 0,
        plantation_date: '',
        harvest_date: '',
        watering_frequency: '',
      });
      state.loading = false;
    })
    .addCase(fetchDeleteFav.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchDeleteFav.fulfilled, (state, action) => {
      state.allProducts = state.allProducts.filter(
        (product) => product.id !== action.payload
      );
      state.loading = false;
    });
});

export default productReducer;
