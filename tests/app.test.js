const test = require("node:test");
const assert = require("node:assert/strict");
const { buildMessage } = require("../src/app");

test("buildMessage returns the GHAS demo message", () => {
    assert.equal(buildMessage(), "GHAS Azure DevOps test app");
});