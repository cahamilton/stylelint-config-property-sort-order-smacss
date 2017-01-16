const order = require("css-property-sort-order-smacss")
const generate = require("./generate")

const config = generate(order)

module.exports = {
  "rules": {
    "declaration-block-properties-order": config,
  },
}
