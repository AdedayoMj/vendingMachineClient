import { createApi } from '@reduxjs/toolkit/query/react';

import { setUser, setCoinChanges } from '../slices/userSlice';
import { IChange, IUser } from './types';
import customFetchBase from './customeFetchBase';
import { EditUserAccount } from '../../components/editUser';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customFetchBase,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUser: builder.mutation<IUser, void>({
            query() {
                return {
                    url: 'user/getUser',
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
        editUser: builder.mutation<IUser, EditUserAccount>({
            query(data) {
                return {
                    url: 'user/updateUser',
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

        getChange: builder.mutation<IChange, void>({
            query() {
                return {
                    url: 'user/getChange',
                    method: 'GET',
                    credentials: 'include',
                };
            },
            transformResponse: (result: { data: { coinChanges: IChange } }) =>
                result.data.coinChanges,

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {


                    const { data } = await queryFulfilled;
                    dispatch(setCoinChanges(data));
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
    useResetAccountMutation,
    useGetUserMutation,
    useGetChangeMutation,
    useEditUserMutation
} = userApi;
