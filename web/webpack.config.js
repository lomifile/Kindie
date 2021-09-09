const path = require("path");

module.exports = {
  module: {
    rules: [{ test: /\.png$/, use: "imagemin-optipng" }],
  },
};
