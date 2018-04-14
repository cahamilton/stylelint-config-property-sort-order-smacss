"use strict"

const order = require("css-property-sort-order-smacss")

const generate = require("./generate")

const config = generate(order)

module.exports = {
  "plugins": [
    "stylelint-order",
  ],
  "rules": {
    "order/properties-order": config,
  },
}
