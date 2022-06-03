import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct,IQauntity,ITransact } from '../api/types';

interface IProductState {
    product: IProduct | null;
    transaction: Partial<IQauntity>|null;
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
        setBoughtProduct: (state: any, action: PayloadAction<Partial<IQauntity>>) => {
            state.transaction = action.payload;
        },
    },
});

export default productSlice.reducer;

export const { setAllProduct ,setBoughtProduct} = productSlice.actions;