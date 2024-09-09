import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductInVirtualGarden } from '../../@types/types';
import {
  fetchAllProductsInVirtualGarden,
  fetchMatchingProducts,
  updateProductPosition as updateProductPositionThunk,
  removeProductFromVirtualGarden as removeProductFromVirtualGardenThunk,
} from '../thunks/virtualGardenThunks';

interface PotagerVirtuelState {
  products: Product[];
  garden: Product[];
  favoriteProducts: Product[];
  virtualGarden: ProductInVirtualGarden[];
  matchingProducts: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: PotagerVirtuelState = {
  products: [],
  garden: [],
  favoriteProducts: [],
  virtualGarden: [],
  matchingProducts: [],
  loading: false,
  error: null,
};

const potagerVirtuelSlice = createSlice({
  name: 'potagerVirtuel',
  initialState,
  reducers: {
    addToGarden(state, action: PayloadAction<Product>) {
      state.garden.push(action.payload);
    },
    updateProductPosition: (
      state,
      action: PayloadAction<{ product_id: number; position: string }>
    ) => {
      const { product_id, position } = action.payload;
      const product = state.garden.find((p) => p.id === product_id);
      if (product) {
        product.position = position;
      }
    },
    addToVirtualGarden(state, action: PayloadAction<ProductInVirtualGarden>) {
      if (!Array.isArray(state.virtualGarden)) {
        state.virtualGarden = [];
      }
      state.virtualGarden.push(action.payload);
    },
    removeFromVirtualGarden(state, action: PayloadAction<number>) {
      if (Array.isArray(state.virtualGarden)) {
        state.virtualGarden = state.virtualGarden.filter(
          (vg) => vg.product_id !== action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsInVirtualGarden.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProductsInVirtualGarden.fulfilled, (state, action) => {
        state.loading = false;
        state.virtualGarden = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchAllProductsInVirtualGarden.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Failed to fetch virtual garden products';
      })
      .addCase(fetchMatchingProducts.fulfilled, (state, action) => {
        state.matchingProducts = action.payload;
      })
      .addCase(updateProductPositionThunk.fulfilled, (state, action) => {
        const { product_id, position } = action.payload;
        const product = state.garden.find((p) => p.id === product_id);
        if (product) {
          product.position = position;
        }
      })
      .addCase(
        removeProductFromVirtualGardenThunk.fulfilled,
        (state, action) => {
          state.virtualGarden = state.virtualGarden.filter(
            (vg) => vg.product_id !== action.payload
          );
        }
      );
  },
});

export const {
  addToGarden,
  updateProductPosition,
  addToVirtualGarden,
  removeFromVirtualGarden,
} = potagerVirtuelSlice.actions;

export default potagerVirtuelSlice.reducer;
