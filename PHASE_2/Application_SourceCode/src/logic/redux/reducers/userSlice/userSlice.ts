import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HTTPError } from "ky";
import {
  IUserBookmarkArticleRequestBody,
  IUserBookmarkArticleSuccessResponse,
  IUserBookmarkCountryRequestBody,
  IUserBookmarkCountrySuccessResponse,
  IUserLoginRequestBody,
  IUserLoginSuccessResponse,
  IUserRegisterRequestBody,
  IUserRegisterSuccessResponse,
  IUserUpdateRequestBody,
  IUserUpdateSuccessResponse,
} from "src/interfaces/ResponseInterface";
import { putBookmarkCountry } from "src/logic/functions/putBookmarkCountry.function";
import { postLogin } from "src/logic/functions/postLogin.function";
import { postRegister } from "src/logic/functions/postRegister.function";
import { putUserUpdate } from "src/logic/functions/putUpdateUser.function";
import { putBookmarkArticle } from "src/logic/functions/putBookmarkArticle.function";
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
    const res = (await putUserUpdate(
      req.userId,
      req.body
    )) as IUserUpdateSuccessResponse;
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

export const putBookmarkCountryDispatch = createAsyncThunk<
  IUserBookmarkCountrySuccessResponse,
  IUserBookmarkCountryRequestBody,
  { state: RootState }
>("putBookmarkCountryDispatch", async (req, { rejectWithValue }) => {
  try {
    const res = (await putBookmarkCountry(
      req
    )) as IUserBookmarkCountrySuccessResponse;
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

export const putBookmarkArticleDispatch = createAsyncThunk<
  IUserBookmarkArticleSuccessResponse,
  IUserBookmarkArticleRequestBody,
  { state: RootState }
>("putBookmarkArticleDispatch", async (req, { rejectWithValue }) => {
  try {
    const res = (await putBookmarkArticle(
      req
    )) as IUserBookmarkArticleSuccessResponse;
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
  PUT_BOOKMARK_COUNTRY_LOADING = "PUT_BOOKMARK_COUNTRY_LOADING",
  PUT_BOOKMARK_COUNTRY_FAILED = "PUT_BOOKMARK_COUNTRY_FAILED",
  PUT_BOOKMARK_COUNTRY_COMPLETED = "PUT_BOOKMARK_COUNTRY_COMPLETED",
  PUT_BOOKMARK_ARTICLE_LOADING = "PUT_BOOKMARK_ARTICLE_LOADING",
  PUT_BOOKMARK_ARTICLE_FAILED = "PUT_BOOKMARK_ARTICLE_FAILED",
  PUT_BOOKMARK_ARTICLE_COMPLETED = "PUT_BOOKMARK_ARTICLE_COMPLETED",
}

export interface UserState {
  user?:
    | IUserLoginSuccessResponse
    | IUserRegisterSuccessResponse
    | IUserUpdateSuccessResponse
    | IUserBookmarkCountrySuccessResponse
    | IUserBookmarkArticleSuccessResponse;
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
    clearUser: (state) => ({
      ...state,
      user: undefined,
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
    builder.addCase(putBookmarkCountryDispatch.fulfilled, (state, action) => ({
      ...state,
      userLoadingStatus: UserLoadingStatusTypes.PUT_BOOKMARK_COUNTRY_COMPLETED,
      user: action.payload,
    }));
    builder.addCase(putBookmarkCountryDispatch.pending, (state) => {
      state.userLoadingStatus =
        UserLoadingStatusTypes.PUT_BOOKMARK_COUNTRY_LOADING;
    });
    builder.addCase(putBookmarkCountryDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.userLoadingStatus =
        UserLoadingStatusTypes.PUT_BOOKMARK_COUNTRY_FAILED;
    });
    builder.addCase(putBookmarkArticleDispatch.fulfilled, (state, action) => ({
      ...state,
      userLoadingStatus: UserLoadingStatusTypes.PUT_BOOKMARK_ARTICLE_COMPLETED,
      user: action.payload,
    }));
    builder.addCase(putBookmarkArticleDispatch.pending, (state) => {
      state.userLoadingStatus =
        UserLoadingStatusTypes.PUT_BOOKMARK_ARTICLE_LOADING;
    });
    builder.addCase(putBookmarkArticleDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.userLoadingStatus =
        UserLoadingStatusTypes.PUT_BOOKMARK_ARTICLE_FAILED;
    });
  },
});

export const { clearUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectUserLoadingStatus = (state: RootState) =>
  state.user.userLoadingStatus;
export const selectUserLoadingError = (state: RootState) => state.user.error;

export default userSlice.reducer;
