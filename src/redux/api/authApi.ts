  
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginInput } from '../../views/login';
import { RegisterInput } from '../../views/signup';
import { IUser } from './types';
import { userApi } from './userApi';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const authApi = createApi({
    
    
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/auth`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<IUser, RegisterInput>({
      query(data:RegisterInput) {
        let postData = {
            name:data.name,
            password:data.password
        }
          
        return {
          url: 'register',
          method: 'POST',
          body: postData,
        };
      },
      transformResponse: (result: {  user: IUser }) =>result.user,
      
      
    }),
    loginUser: builder.mutation<
      { token: string; message: string },
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