
import { exportCsv } from "../utils/exportCsv";
import { mockUser } from "./mockUser";

beforeEach(function () {
  Object.defineProperty(URL, "createObjectURL", {
    configurable: true,
    value: jest.fn().mockReturnValue("blob:test")
  });

  Object.defineProperty(URL, "revokeObjectURL", {
    configurable: true,
    value: jest.fn()
  });

  jest.spyOn(
    HTMLAnchorElement.prototype,
    "click"
  ).mockImplementation(function () {});
});

afterEach(function () {
  jest.restoreAllMocks();
});

test("exports users as CSV", function () {
  exportCsv([mockUser]);

  expect(URL.createObjectURL).toHaveBeenCalledWith(
    expect.any(Blob)
  );

  expect(
    HTMLAnchorElement.prototype.click
  ).toHaveBeenCalled();

  expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:test");
});

test("exports empty user list", function () {
  exportCsv([]);

  expect(URL.createObjectURL).toHaveBeenCalledWith(
    expect.any(Blob)
  );
});
