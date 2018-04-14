"use strict"

const stylelint = require("stylelint")
const test = require("tape")

const config = require("..")
const expected = require("./expected")
const generate = require("../generate")
const order = require("./sort-order")

test("Generate configuration", function (t) {
  const actual = generate(order)
  t.deepEqual(actual, expected)
  t.end()
})

test("Stylelint configuration", function (t) {
  stylelint.lint({
    code: "a { color: red; top: 0; }",
    config,
  }).then(function (output) {
    const actual = output.results[0].warnings[0].text
    t.equal(actual, "Expected \"top\" to come before \"color\" (order/properties-order)")
    t.end()
  }).catch(function (err) {
    t.notOk(err)
    t.end()
  })
})
