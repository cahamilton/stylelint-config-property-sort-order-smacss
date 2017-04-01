"use strict"

const test = require("tape")
const stylelint = require("stylelint")
const stylelintConfig = require("..")
const order = require("./sort-order")
const expected = require("./expected")

const generate = require("../generate")

test("Generate configuration", function (t) {
  const actual = generate(order)
  t.deepEqual(actual, expected)
  t.end()
})

test("Stylelint configuration", function (t) {
  stylelint.lint({
    code: "a { color: red; top: 0; }",
    config: stylelintConfig,
  }).then(function (output) {
    const actual = output.results[0].warnings[0].text
    t.equal(actual, "Expected top to come before color (order/declaration-block-properties-specified-order)")
    t.end()
  }).catch(function (err) {
    t.notOk(err)
    t.end()
  })
})
