import { randomUUID } from "node:crypto";

import { validateUUID } from "./validate-uuid";

describe("validateUUID", () => {
  it("should return true if uuid is valid", () => {
    const uuid = randomUUID();
    expect(validateUUID(uuid)).toBe(true);
  });

  it("should return false if uuid is invalid", () => {
    const uuid = "invalid-uuid";
    expect(validateUUID(uuid)).toBe(false);
  });
});
