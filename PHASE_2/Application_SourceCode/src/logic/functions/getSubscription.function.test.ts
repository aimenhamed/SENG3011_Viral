import {v4 as uuidv4} from "uuid";
import * as createRequest from "../createRequest";
import { getSubscription } from "./getSubscription.function";
import AppConfig from "../config";

jest.mock("uuid");
describe("getSubscription", () => {
  it("should make a GET request to subscription endpoint", () => {
    const uuidMock = uuidv4 as jest.Mock<string>;
    uuidMock.mockReturnValue("unit-test-uuid");
    const getSpy = jest
      .spyOn(createRequest, "get")
      .mockResolvedValue({ message: "Hey mate" });
    getSubscription();
    expect(getSpy).toHaveBeenCalledWith(
      `${AppConfig.apiUrl}/v1/subscription/`
    );
  });
});
