import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HTTPError } from "ky";
import {
  IPostReviewRequestBody,
  IPostReviewSuccessResponse,
  IDeleteReviewRequestBody,
  IDeleteReviewSuccessResponse,
  IPutUpvoteReviewRequestBody,
  IPutUpvoteReviewSuccessResponse
} from "src/interfaces/ResponseInterface";
import { postReview } from "src/logic/functions/postReview.function";
import { deleteReview } from "src/logic/functions/deleteReview.function";
import { putUpvoteReview } from "src/logic/functions/putUpvoteReview.function";
import { RootState } from "../../store";

export const postReviewDispatch = createAsyncThunk<
  IPostReviewSuccessResponse,
  IPostReviewRequestBody,
  { state: RootState }
>("postReviewDispatch", async (req, { rejectWithValue }) => {
  try {
    const res = (await postReview(
      req
    )) as IPostReviewSuccessResponse;
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

export const deleteReviewDispatch = createAsyncThunk<
  IDeleteReviewSuccessResponse,
  IDeleteReviewRequestBody,
  { state: RootState }
>("deleteReviewDispatch", async (req, { rejectWithValue }) => {
  try {
    const res = (await deleteReview(
      req
    )) as IDeleteReviewSuccessResponse;
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

export const putUpvoteReviewDispatch = createAsyncThunk<
  IPutUpvoteReviewSuccessResponse,
  IPutUpvoteReviewRequestBody,
  { state: RootState }
>("putUpvoteReviewDispatch", async (req, { rejectWithValue }) => {
  try {
    const res = (await putUpvoteReview(
      req
    )) as IPutUpvoteReviewSuccessResponse;
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

export enum ReviewLoadingStatusTypes {
  IDLE = "IDLE",
  POST_REVIEW_LOADING = "POST_REVIEW_LOADING",
  POST_REVIEW_FAILED = "POST_REVIEW_FAILED",
  POST_REVIEW_COMPLETED = "POST_REVIEW_COMPLETED",
  DELETE_REVIEW_LOADING = "DELETE_REVIEW_LOADING",
  DELETE_REVIEW_FAILED = "DELETE_REVIEW_FAILED",
  DELETE_REVIEW_COMPLETED = "DELETE_REVIEW_COMPLETED",
  PUT_UPVOTE_REVIEW_LOADING = "PUT_UPVOTE_REVIEW_LOADING",
  PUT_UPVOTE_REVIEW_FAILED = "PUT_UPVOTE_REVIEW_FAILED",
  PUT_UPVOTE_REVIEW_COMPLETED = "PUT_UPVOTE_REVIEW_COMPLETED",
}

export interface ReviewState {
  review?: IPostReviewSuccessResponse;
  reviewLoadingStatus: ReviewLoadingStatusTypes;
  error: any;
}

export const initialState: ReviewState = {
  reviewLoadingStatus: ReviewLoadingStatusTypes.IDLE,
  error: null,
}

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    updateReview: (
      state,
      action: PayloadAction<IPostReviewSuccessResponse>) => ({
      ...state,
      review: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(postReviewDispatch.fulfilled, (state, action) => ({
      ...state,
      reviewLoadingStatus: ReviewLoadingStatusTypes.POST_REVIEW_COMPLETED,
      review: action.payload,
    }));
    builder.addCase(postReviewDispatch.pending, (state) => {
      state.reviewLoadingStatus = ReviewLoadingStatusTypes.POST_REVIEW_LOADING;
    });
    builder.addCase(postReviewDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.reviewLoadingStatus = ReviewLoadingStatusTypes.POST_REVIEW_FAILED;
    });
    builder.addCase(deleteReviewDispatch.fulfilled, (state) => ({
      ...state,
      reviewLoadingStatus: ReviewLoadingStatusTypes.DELETE_REVIEW_COMPLETED,
    }));
    builder.addCase(deleteReviewDispatch.pending, (state) => {
      state.reviewLoadingStatus = ReviewLoadingStatusTypes.DELETE_REVIEW_LOADING;
    });
    builder.addCase(deleteReviewDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.reviewLoadingStatus = ReviewLoadingStatusTypes.DELETE_REVIEW_FAILED;
    });
    builder.addCase(putUpvoteReviewDispatch.fulfilled, (state) => ({
      ...state,
      reviewLoadingStatus: ReviewLoadingStatusTypes.PUT_UPVOTE_REVIEW_COMPLETED,
    }));
    builder.addCase(putUpvoteReviewDispatch.pending, (state) => {
      state.reviewLoadingStatus = ReviewLoadingStatusTypes.PUT_UPVOTE_REVIEW_LOADING;
    });
    builder.addCase(putUpvoteReviewDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.reviewLoadingStatus = ReviewLoadingStatusTypes.PUT_UPVOTE_REVIEW_FAILED;
    });
  },
});

export const { updateReview }  = reviewSlice.actions;

export const selectReview = (state:RootState)  =>  state.review;
export const selectReviewLoadingStatus  = (state: RootState)  =>
  state.review.reviewLoadingStatus;
export const selectReviewLoadingError = (state: RootState) =>
  state.review.error;

export default reviewSlice.reducer;
