import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HTTPError } from "ky";
import {
  ISearchRequestHeaders,
  ISearchSuccessResponse,
} from "src/interfaces/ResponseInterface";
import { Article } from "src/interfaces/ViralInterface";
import { getSearch } from "src/logic/functions/getSearch.function";
import { RootState } from "../../store";

export const getSearchDispatch = createAsyncThunk<
  ISearchSuccessResponse,
  ISearchRequestHeaders,
  { state: RootState }
>("getSearchDispatch", async (req, { rejectWithValue }) => {
  try {
    const res = (await getSearch(req)) as ISearchSuccessResponse;
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

export enum ArticleLoadingStatusTypes {
  IDLE = "IDLE",
  GET_SEARCH_LOADING = "GET_SEARCH_LOADING",
  GET_SEARCH_FAILED = "GET_SEARCH_FAILED",
  GET_SEARCH_COMPLETED = "GET_SEARCH_COMPLETED",
}

export interface ArticleState {
  articles: Article[];
  articleloadingStatus: ArticleLoadingStatusTypes;
  error: any;
}

export const initialState: ArticleState = {
  articles: [],
  articleloadingStatus: ArticleLoadingStatusTypes.IDLE,
  error: null,
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    updateArticles: (state, action: PayloadAction<Article[]>) => ({
      ...state,
      articles: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchDispatch.fulfilled, (state, action) => ({
      ...state,
      articleloadingStatus: ArticleLoadingStatusTypes.GET_SEARCH_COMPLETED,
      articles: action.payload.articles,
    }));
    builder.addCase(getSearchDispatch.pending, (state) => {
      state.articleloadingStatus = ArticleLoadingStatusTypes.GET_SEARCH_LOADING;
    });
    builder.addCase(getSearchDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.articleloadingStatus = ArticleLoadingStatusTypes.GET_SEARCH_FAILED;
    });
  },
});

export const { updateArticles } = articleSlice.actions;

export const selectArticles = (state: RootState) => state.articles;
export const selectArticlesLoadingStatus = (state: RootState) =>
  state.articles.articleloadingStatus;
export const selectArticlesLoadingError = (state: RootState) =>
  state.articles.error;

export default articleSlice.reducer;
