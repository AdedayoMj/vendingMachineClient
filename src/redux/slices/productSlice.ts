import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct,ITransact } from '../api/types';

interface IProductState {
    product: IProduct | null;
    transaction: IProduct | null;
}

const initialState: IProductState = {
    product: null,
    transaction:null
};

export const productSlice = createSlice({
    initialState,
    name: 'productSlice',
    reducers: {
        setAllProduct: (state: any, action: PayloadAction<IProduct>) => {
            state.products = action.payload;
        },
        setBoughtProduct: (state: any, action: PayloadAction<IProduct>) => {
            state.products = action.payload;
        },
    },
});

export default productSlice.reducer;

export const { setAllProduct ,setBoughtProduct} = productSlice.actions;