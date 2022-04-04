import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HTTPError } from "ky";
import {
  IUserLoginRequestBody,
  IUserLoginSuccessResponse,
  IUserRegisterRequestBody,
  IUserRegisterSuccessResponse,
  IUserUpdateRequestBody,
  IUserUpdateSuccessResponse,
} from "src/interfaces/ResponseInterface";
import { postLogin } from "src/logic/functions/postLogin.function";
import { postRegister } from "src/logic/functions/postRegister.function";
import { putUserUpdate } from "src/logic/functions/putUpdateUser.function";
import { RootState } from "../../store";

export const postLoginDispatch = createAsyncThunk<
  IUserLoginSuccessResponse,
  IUserLoginRequestBody,
  { state: RootState }
>("postLoginDispatch", async (req, { rejectWithValue }) => {
  try {
    const res = (await postLogin(req)) as IUserLoginSuccessResponse;
    return res;
  } catch (err) {
    if (err instanceof HTTPError) {
      return rejectWithValue({
        name: err.name,
        message: err.message,
        code: err.response.status,
        stack: err.stack,
      });
    }
    throw err;
  }
});

export const postRegisterDispatch = createAsyncThunk<
  IUserRegisterSuccessResponse,
  IUserRegisterRequestBody,
  { state: RootState }
>("postRegisterDispatch", async (req, { rejectWithValue }) => {
  try {
    const res = (await postRegister(req)) as IUserRegisterSuccessResponse;
    return res;
  } catch (err) {
    if (err instanceof HTTPError) {
      return rejectWithValue({
        name: err.name,
        message: err.message,
        code: err.response.status,
        stack: err.stack,
      });
    }
    throw err;
  }
});

export interface UpdateUserInterface {
  userId: string;
  body: IUserUpdateRequestBody;
}

export const putUserUpdateDispatch = createAsyncThunk<
IUserUpdateSuccessResponse,
UpdateUserInterface,
{ state: RootState }
>("putUserUpdateDispatch", async (req, { rejectWithValue }) => {
try {
  const res = (await putUserUpdate(req.userId, req.body)) as IUserUpdateSuccessResponse;
  return res;
} catch (err) {
  if (err instanceof HTTPError) {
    return rejectWithValue({
      name: err.name,
      message: err.message,
      code: err.response.status,
      stack: err.stack,
    });
  }
  throw err;
}
});

export enum UserLoadingStatusTypes {
  IDLE = "IDLE",
  POST_LOGIN_LOADING = "POST_LOGIN_LOADING",
  POST_LOGIN_FAILED = "POST_LOGIN_FAILED",
  POST_LOGIN_COMPLETED = "POST_LOGIN_COMPLETED",
  POST_REGISTER_LOADING = "POST_REGISTER_LOADING",
  POST_REGISTER_FAILED = "POST_REGISTER_FAILED",
  POST_REGISTER_COMPLETED = "POST_REGISTER_COMPLETED",
  PUT_USER_UPDATE_LOADING = "PUT_USER_UPDATE_LOADING",
  PUT_USER_UPDATE_FAILED = "PUT_USER_UPDATE_FAILED",
  PUT_USER_UPDATE_COMPLETED = "PUT_USER_UPDATE_COMPLETED",
}

export interface UserState {
  user?: IUserLoginSuccessResponse | IUserRegisterSuccessResponse | IUserUpdateSuccessResponse;
  userLoadingStatus: UserLoadingStatusTypes;
  error: any;
}

export const initialState: UserState = {
  userLoadingStatus: UserLoadingStatusTypes.IDLE,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<IUserLoginSuccessResponse>) => ({
      ...state,
      user: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(postLoginDispatch.fulfilled, (state, action) => ({
      ...state,
      userLoadingStatus: UserLoadingStatusTypes.POST_LOGIN_COMPLETED,
      user: action.payload,
    }));
    builder.addCase(postLoginDispatch.pending, (state) => {
      state.userLoadingStatus = UserLoadingStatusTypes.POST_LOGIN_LOADING;
    });
    builder.addCase(postLoginDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.userLoadingStatus = UserLoadingStatusTypes.POST_LOGIN_FAILED;
    });
    builder.addCase(postRegisterDispatch.fulfilled, (state, action) => ({
      ...state,
      userLoadingStatus: UserLoadingStatusTypes.POST_REGISTER_COMPLETED,
      user: action.payload,
    }));
    builder.addCase(postRegisterDispatch.pending, (state) => {
      state.userLoadingStatus = UserLoadingStatusTypes.POST_REGISTER_LOADING;
    });
    builder.addCase(postRegisterDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.userLoadingStatus = UserLoadingStatusTypes.POST_REGISTER_FAILED;
    });
    builder.addCase(putUserUpdateDispatch.fulfilled, (state, action) => ({
      ...state,
      userLoadingStatus: UserLoadingStatusTypes.PUT_USER_UPDATE_COMPLETED,
      user: action.payload,
    }));
    builder.addCase(putUserUpdateDispatch.pending, (state) => {
      state.userLoadingStatus = UserLoadingStatusTypes.PUT_USER_UPDATE_LOADING;
    });
    builder.addCase(putUserUpdateDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.userLoadingStatus = UserLoadingStatusTypes.PUT_USER_UPDATE_FAILED;
    });
  },
});

export const { updateUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectUserLoadingStatus = (state: RootState) =>
  state.user.userLoadingStatus;
export const selectUserLoadingError = (state: RootState) => state.user.error;

export default userSlice.reducer;
