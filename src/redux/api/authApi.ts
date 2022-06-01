
import { createApi } from '@reduxjs/toolkit/query/react';
import logging from '../../app/logging';
import { LoginInput } from '../../views/login';
import { RegisterInput } from '../../views/signup';
import { productApi } from './productApi';
import { IUser } from './types';
import { userApi } from './userApi';
import customFetchBase from './customeFetchBase';



export const authApi = createApi({

  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    registerUser: builder.mutation<IUser, RegisterInput>({
      query(data: RegisterInput) {

        return {
          url: 'auth/register',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (result: { data: { user: IUser } }) => result.data.user,

    }),
    loginUser: builder.mutation<
      { access_token: string; status: string },
      LoginInput
    >({
      query(data) {
        return {
          url: 'auth/login',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
    
          await dispatch(userApi.endpoints.getUser.initiate());
          // await dispatch(productApi.endpoints.getProducts.initiate());

        
        } catch (error) {
          logging.error(error)
        }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'auth/logout',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = authApi;