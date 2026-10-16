import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { normalizePhoneList, splitPhones, telHref } from "../../src/shared/phones.ts";

describe("contact phone list", () => {
  it("splits on commas (incl. Thai/Chinese full-width) and tidies spaces", () => {
    assert.deepEqual(splitPhones("063 795 1218,  095-579-0679 ， 02 123 4567"), ["063 795 1218", "095-579-0679", "02 123 4567"]);
    assert.deepEqual(splitPhones(null), []);
    assert.deepEqual(splitPhones("081-234-5678"), ["081-234-5678"]);
  });
  it("normalizes to 'a, b' and rejects malformed or too many numbers", () => {
    assert.equal(normalizePhoneList("0637951218,0955790679"), "0637951218, 0955790679");
    assert.equal(normalizePhoneList("+66 63 795 1218; 095 579 0679"), "+66 63 795 1218, 095 579 0679");
    assert.equal(normalizePhoneList("0637951218, call me"), null);
    assert.equal(normalizePhoneList("------"), null);
    assert.equal(normalizePhoneList(Array(6).fill("0812345678").join(",")), null);
  });
  it("builds a tel: link per number", () => {
    assert.equal(telHref("+66 63-795-1218"), "tel:+66637951218");
  });
});
