import { createApi } from '@reduxjs/toolkit/query/react';
import { ProductInput } from '../../components/formModal';
import { setAllProduct, setBoughtProduct } from '../slices/productSlice';
import { IProduct, IQauntity } from './types';
import customFetchBase from './customeFetchBase';
import { BuyProductInput } from '../../components/productContent';




export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: customFetchBase,
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct, null>({
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
            transformResponse: (result: { data: { products: IProduct } }) => result.data.products,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    await dispatch(setAllProduct(data));
                } catch (error) { }
            },
        }),
        buyProduct: builder.mutation<Partial<IQauntity>, { product: IProduct, quantity: BuyProductInput }>({

            query(data) {
                const newData = {
                    quantity: Number(data.quantity.quantity)
                }

                return {
                    url: `product/buy/${data.product._id}`,
                    method: 'POST',
                    body: newData,
                    credentials: 'include',
                };
            },
            transformResponse: (result: { data: { products: Partial<IQauntity> } }) => result.data.products,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    await dispatch(setBoughtProduct(data))
                } catch (error) { }
            },
        }),
        deleteProduct: builder.mutation<IProduct, { id: string }>({
            query(data) {
                return {
                    url: `product/${data.id}`,
                    method: 'DELETE',
                    credentials: 'include',
                };
            },
            transformResponse: (result: { data: { products: IProduct } }) => result.data.products,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    await dispatch(setAllProduct(data));
                } catch (error) { }
            },
        }),
    }),
})

export const { useGetProductsQuery, useCreateProductMutation, useBuyProductMutation, useDeleteProductMutation } = productApi

