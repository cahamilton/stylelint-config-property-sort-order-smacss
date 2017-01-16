const test = require("tape")
const order = require("./sort-order")
const expected = require("./expected")

const generate = require("../generate")

test("Generate configuration", function (t) {
  const actual = generate(order)
  t.deepEqual(actual, expected)
  t.end()
})
