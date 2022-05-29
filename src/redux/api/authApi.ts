  
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginInput } from '../../views/login';
import { RegisterInput } from '../../views/signup';
import { IUser } from './types';
import { userApi } from './userApi';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const authApi = createApi({
    
    
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3360/api/auth`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<IUser, RegisterInput>({
      query(data:RegisterInput) {
        console.log(data);
          
        return {
          url: 'register',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (result: { data: { user: IUser } }) =>result.data.user,
      
      
    }),
    loginUser: builder.mutation<
      { access_token: string; status: string },
      LoginInput
    >({
      query(data) {
        return {
          url: 'login',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'logout',
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