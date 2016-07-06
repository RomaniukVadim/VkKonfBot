module.exports = {
  random: (min, max) => {
    return parseInt(min + Math.random() * (max - min))
  },
  randomObject: (object) => {
    return parseInt(Math.random() * Object.keys(object).length - 1)
  }
}
