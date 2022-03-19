import { getWidgetEntity, getMockWidgets } from "../utils/testData";
import { convertWidgetEntityToInterface } from "./Widget.converter";

describe("convertWidgetEntityToInterface", () => {
  it("should convert WidgetEntity to Widget interface", () => {
    const entity = getWidgetEntity();
    const widget = getMockWidgets()[0];
    expect(convertWidgetEntityToInterface(entity)).toEqual(widget);
  });
});
