import { getUserEntity, getMockUsers } from "../utils/testData";
import { convertUserEntityToInterface } from "./User.converter";

describe("convertUserEntityToInterface", () => {
  it("should convert UserEntity to User interface", () => {
    const entity = getUserEntity();
    const user = getMockUsers()[0];
    expect(convertUserEntityToInterface(entity)).toEqual(user);
  });
});
