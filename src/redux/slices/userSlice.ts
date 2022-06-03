import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChange, IUser } from '../api/types';

interface IUserState {
  user: IUser | null;
  coinChanges: Partial<IChange> | null;
}

const initialState: IUserState = {
  user: null,
  coinChanges: null
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state:any, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setCoinChanges:(state:any, action: PayloadAction<Partial<IChange>>) => {
      state.coinChanges = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser, setCoinChanges } = userSlice.actions;