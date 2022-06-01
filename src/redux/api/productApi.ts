import { createApi } from '@reduxjs/toolkit/query/react';
import { ProductInput } from '../../components/formModal';
import { setAllProduct } from '../slices/productSlice';
import { IProduct } from './types';
import customFetchBase from './customeFetchBase';
import { BuyProductInput } from '../../components/productContent';
import { userApi } from './userApi';



export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: customFetchBase,
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct, void>({
            query() {
                return {
                    url: 'product',
                    credentials: 'include',
                };
            },
            transformResponse: (result: { data: { products: IProduct } }) =>
                result.data.products,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    await dispatch(setAllProduct(data));
                } catch (error) { }
            },

        }),
        createProduct: builder.mutation<IProduct, { product: Partial<ProductInput>, sellerId: string }>({

            query(data) {

                const newProductData = {
                    productName: data.product.productName,
                    amountAvailable: Number(data.product.amountAvailable),
                    cost: Number(data.product.cost),
                    sellerId: data.sellerId
                }
                return {
                    url: 'product',
                    method: 'POST',
                    body: newProductData,
                    credentials: 'include',
                };
            },
            transformResponse: (result: { data: { product: IProduct } }) => result.data.product,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    await dispatch(productApi.endpoints.getProducts.initiate());
                } catch (error) { }
            },
        }),
        buyProduct: builder.mutation<IProduct, { product: IProduct, values: {} }>({

            query(data) {

                return {
                    url: `product/buy/${data.product._id}`,
                    method: 'POST',
                    body: data.values,
                    credentials: 'include',
                };
            },
            transformResponse: (result: { data: { product: IProduct } }) => result.data.product,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                    await dispatch(productApi.endpoints.getProducts.initiate());
                } catch (error) { }
            },
        }),
    }),
})

export const { useGetProductsQuery, useCreateProductMutation, useBuyProductMutation } = productApi

