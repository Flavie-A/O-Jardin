import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';
import { Product, ProductInVirtualGarden } from '../../@types/types';
import { RootState } from '../store';

interface UpdateProductPositionPayload {
  product_id: number;
  position: string;
}

export const fetchAllProductsInVirtualGarden = createAsyncThunk(
  'me/virtual-garden/fetchVirtualGarden',
  async () => {
    const response = await axiosInstance.get<ProductInVirtualGarden[]>(
      `/me/virtual-garden`,);

    return response.data;
  }
);

export const updateProductPosition = createAsyncThunk(
  'potagerVirtuel/updateProductPosition',
  async (payload: UpdateProductPositionPayload) => {
    const { position, product_id } = payload;
    const dataToSend = {
      position,
      product_id,
      quantity: 1,
    };

    const response = await axiosInstance.post(
      `/me/virtual-garden`,
      dataToSend,

    );

    return response.data;
  }
);

export const fetchMatchingProducts = createAsyncThunk(
  'potagerVirtuel/fetchMatchingProducts',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const products = state.products.allProducts;
    const virtualGardenProducts = state.virtualGarden.virtualGarden;

    function transformArrayToString(arr: string) {
      if (Array.isArray(arr) && arr.length === 2) {
        return `{${arr[0]}, ${arr[1]}}`;
      } else {
        return null;
      }
    }

    const matchingProducts = virtualGardenProducts
      .map((vgProduct) => {
        const fullProduct = products.find(
          (product) => product.id === vgProduct.product_id
        );
        const positionBadWrited = vgProduct.position;
        const positionWellWrited = transformArrayToString(positionBadWrited);

        return {
          ...fullProduct,
          position: positionWellWrited,
        };
      })
      .filter((product) => product !== undefined) as Product[];

    return matchingProducts;
  }
);

export const removeProductFromVirtualGarden = createAsyncThunk(
  'potagerVirtuel/removeProductFromVirtualGarden',
  async ({ product_id, position }: { product_id: number, position: string }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const userId = state.myGarden.userData.id;

    const response = await axiosInstance.delete(
      `/me/virtual-garden/${userId}`,
      {
        data: {
          product_id: product_id,
          position: position,
        },
      }
    );

    return response.data;
  }
);
