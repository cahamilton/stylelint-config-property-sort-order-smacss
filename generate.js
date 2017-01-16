module.exports = function (order) {
  const config = []

  for (let property in order) {
    if (order.hasOwnProperty(property)) {
      for (let i = 0; i < order[property].length; i++) {
        config.push({ "properties": order[property][i] })
      }
    }
  }

  return config
}
