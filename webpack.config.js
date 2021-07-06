require("webpack");
const path = require("path");

let config = {
    entry: "./js/index.js",
    output: {
      path: path.resolve(__dirname, "./EliseRousseau_6_11062021"),
      filename: "./bundle.js"
    }
  }
  
  module.exports = config;