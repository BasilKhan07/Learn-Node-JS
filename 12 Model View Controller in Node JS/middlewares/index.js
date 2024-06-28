const fs = require("fs");

function logReqRes(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `${Date.now()}: ${req.method}: ${req.path}\n`,
      (err, data) => {
        console.log("Hello from Middleware 1");
        req.myUsername = "basil.dev";
        next();
      }
    );
  };
}

module.exports = {
  logReqRes,
};
