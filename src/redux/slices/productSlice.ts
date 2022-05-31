import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../api/types';

interface IProductState {
    product: IProduct | null;
}

const initialState: IProductState = {
    product: null,
};

export const productSlice = createSlice({
    initialState,
    name: 'productSlice',
    reducers: {
        getAllProduct: (state: any, action: PayloadAction<IProduct>) => {
            state.products = action.payload;
        },
    },
});

export default productSlice.reducer;

export const { getAllProduct } = productSlice.actions;