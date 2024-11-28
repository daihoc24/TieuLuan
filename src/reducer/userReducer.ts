import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLogin } from "../interfaces/user";


interface UserState {
  userInfo: UserLogin | null;
}

const DEFAULT_STATE: UserState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: DEFAULT_STATE,
  reducers: {
    setUserInfo(state: UserState, action: PayloadAction<UserLogin|null>) {
      state.userInfo = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;