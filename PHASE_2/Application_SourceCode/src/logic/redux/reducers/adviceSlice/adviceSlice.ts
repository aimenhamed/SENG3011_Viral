import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HTTPError } from "ky";
import {
  IAdviceSpecificSuccessResponse,
  ICommentPostRequestBody,
  ICommentPostSuccessResponse,
} from "src/interfaces/ResponseInterface";
import { getSpecificAdvice } from "src/logic/functions/getSpecificAdvice.function";
import { postComment } from "src/logic/functions/postComment.function";
import { RootState } from "../../store";

export const getSpecificAdviceDispatch = createAsyncThunk<
  IAdviceSpecificSuccessResponse,
  string,
  { state: RootState }
>("getSpecificAdviceDispatch", async (country, { rejectWithValue }) => {
  try {
    const res = (await getSpecificAdvice(
      country
    )) as IAdviceSpecificSuccessResponse;
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

export const postCommentDispatch = createAsyncThunk<
  ICommentPostSuccessResponse,
  ICommentPostRequestBody,
  { state: RootState }
>("postCommentDispatch", async (req, { rejectWithValue }) => {
  try {
    const res = (await postComment(req)) as ICommentPostSuccessResponse;
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

export enum AdviceLoadingStatusTypes {
  IDLE = "IDLE",
  GET_ADVICE_LOADING = "GET_ADVICE_LOADING",
  GET_ADVICE_FAILED = "GET_ADVICE_FAILED",
  GET_ADVICE_COMPLETED = "GET_ADVICE_COMPLETED",
  POST_COMMENT_LOADING = "POST_COMMENT_LOADING",
  POST_COMMENT_FAILED = "POST_COMMENT_FAILED",
  POST_COMMENT_COMPLETED = "POST_COMMENT_COMPLETED",
}

export interface ArticleState {
  advice?: IAdviceSpecificSuccessResponse;
  adviceloadingStatus: AdviceLoadingStatusTypes;
  error: any;
}

export const initialState: ArticleState = {
  adviceloadingStatus: AdviceLoadingStatusTypes.IDLE,
  error: null,
};

export const adviceSlice = createSlice({
  name: "advice",
  initialState,
  reducers: {
    updateAdvice: (
      state,
      action: PayloadAction<IAdviceSpecificSuccessResponse>
    ) => ({
      ...state,
      advice: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getSpecificAdviceDispatch.fulfilled, (state, action) => ({
      ...state,
      adviceloadingStatus: AdviceLoadingStatusTypes.GET_ADVICE_COMPLETED,
      advice: action.payload,
    }));
    builder.addCase(getSpecificAdviceDispatch.pending, (state) => {
      state.adviceloadingStatus = AdviceLoadingStatusTypes.GET_ADVICE_LOADING;
    });
    builder.addCase(getSpecificAdviceDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.adviceloadingStatus = AdviceLoadingStatusTypes.GET_ADVICE_FAILED;
    });
    builder.addCase(postCommentDispatch.fulfilled, (state, action) => {
      state.adviceloadingStatus =
        AdviceLoadingStatusTypes.POST_COMMENT_COMPLETED;
      if (state.advice) {
        const newComment = action.payload.comment;
        const newComments = state.advice.comments.filter(
          (comment) => comment.commentId !== newComment.commentId
        );
        newComments.push(newComment);
        state.advice.comments = newComments;
      }
    });
    builder.addCase(postCommentDispatch.pending, (state) => {
      state.adviceloadingStatus = AdviceLoadingStatusTypes.POST_COMMENT_LOADING;
    });
    builder.addCase(postCommentDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.adviceloadingStatus = AdviceLoadingStatusTypes.POST_COMMENT_FAILED;
    });
  },
});

export const { updateAdvice } = adviceSlice.actions;

export const selectAdvice = (state: RootState) => state.advice;
export const selectAdviceLoadingStatus = (state: RootState) =>
  state.advice.adviceloadingStatus;
export const selectAdviceLoadingError = (state: RootState) =>
  state.advice.error;

export default adviceSlice.reducer;
