import { AnyAction } from "@reduxjs/toolkit";
import { getSubscriptionSuccessMock } from "../_testData/subscription.data";

import reducer, {
  getSubscriptionDispatch,
  initialState,
  LoadingStatusTypes,
  updateSubscription,
} from "./subscriptionSlice";

describe("subscriptionSlice", () => {
  describe("reducers", () => {
    it("should return an initial state", () => {
      expect(reducer(undefined, {} as AnyAction)).toEqual(initialState);
    });

    it("should handle ‘updateSubscription’", () => {
      const { ...previousState } = initialState;
      expect(
        reducer(
          previousState,
          updateSubscription(getSubscriptionSuccessMock)
        )
      ).toEqual({
        app: { ...getSubscriptionSuccessMock },
        error: null,
        loadingStatus: LoadingStatusTypes.IDLE
      });
    });

    describe("getSubscriptionDispatch reducers", () => {
      it("should handle ‘getSubscriptionDispatch.pending’", () => {
        const { loadingStatus, ...profile } = initialState;

        expect(
          reducer(initialState, getSubscriptionDispatch.pending(""))
        ).toEqual({
          ...profile,
          error: null,
          loadingStatus: LoadingStatusTypes.GET_SUBSCRIPTION_LOADING,
        });
      });

      it("should handle ‘getSubscriptionDispatch.fulfilled’", () => {
        const { ...profile } = getSubscriptionSuccessMock;

        expect(
          reducer(
            initialState,
            getSubscriptionDispatch.fulfilled(
              getSubscriptionSuccessMock,
              ""
            )
          )
        ).toEqual({
          app: { ...profile },
          error: null,
          loadingStatus: LoadingStatusTypes.GET_SUBSCRIPTION_COMPLETED,
        });
      });

      it("should handle ‘getSubscriptionDispatch.rejected’", () => {
        const { loadingStatus, error, ...profile } = initialState;
        const action = {
          type: getSubscriptionDispatch.rejected.type,
          payload: {
            name: "HTTPError",
            message: "418",
          },
        };
        expect(reducer(initialState, action)).toEqual({
          ...profile,
          error: {
            name: "HTTPError",
            message: "418",
          },
          loadingStatus: LoadingStatusTypes.GET_SUBSCRIPTION_FAILED,
        });
      });
    });
  });
});
