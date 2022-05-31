import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAllProduct } from '../slices/productSlice';
import { IProduct } from './types';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const productApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/user/`,
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getMe: builder.query<IProduct, null>({
            query() {
                return {
                    url: 'getAllProducts',
                    credentials: 'include',
                };
            },
            transformResponse: (result: { products: IProduct }) =>
                result.products,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(getAllProduct(data));
                } catch (error) { }
            },
        }),
    }),
});