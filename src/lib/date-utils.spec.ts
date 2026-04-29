import { formatYM, formatYMD } from "@/lib/date-utils.ts";
import { type Assertion, describe, expect, it } from 'vitest'

describe("date-utils", () => {

  const validDate = new Date("January 12, 2010");

  describe("formatYMD()", () => {
    describe("when given valid date", () => {
      it("should return intended YYYY-MM-DD format", () => {
        (expect(formatYMD(validDate)) as Assertion).toBe("2010-01-12");
      });
    });
  });

  describe("formatYM()", () => {
    describe("when given valid date", () => {
      it("should return intended YYYY-MM format", () => {
        (expect(formatYM(validDate)) as Assertion).toBe("2010-01");
      });
    });
  });

});
