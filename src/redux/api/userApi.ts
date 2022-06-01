import { createApi } from '@reduxjs/toolkit/query/react';

import { setUser } from '../slices/userSlice';
import { IUser } from './types';
import customFetchBase from './customeFetchBase';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customFetchBase,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getMe: builder.query<IUser, null>({
            query() {
                return {
                    url: 'user/me',
                    method: 'GET',
                    credentials: 'include',
                };
            },
            transformResponse: (result: { data: { user: IUser } }) =>
                result.data.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(setUser(data));
                } catch (error) { }
            },
        }),

        depositUserAccount: builder.mutation<IUser, Partial<IUser>>({

            query(data) {
                return {
                    url: 'user/deposit',
                    method: 'PATCH',
                    body: data,
                    credentials: 'include',
                };
            },
            transformResponse: (result: { data: { user: IUser } }) =>
                result.data.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) { }
            },
        }),
        resetAccount: builder.mutation<IUser, Partial<IUser>>({
            query(data) {
                return {
                    url: 'user/reset',
                    method: 'PATCH',
                    body: data,
                    credentials: 'include',
                };
            },
            transformResponse: (result: { data: { user: IUser } }) =>
                result.data.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) { }
            },
        }),
    }),
});


export const {
    useDepositUserAccountMutation,
    useResetAccountMutation
} = userApi;
