var GET_all_user = require("../user/GET_all_user");
var GET_user = require("../user/GET_user");
var POST_user = require("../user/POST_user");
var PUT_user = require("../user/PUT_user");

module.exports.init = (server, dbConnection) => {
  server.get("/api/user", (req, res) => {
    //call GET_all_user function in the GET_all_user.js
    GET_all_user.GET_all_user(req, res, dbConnection);
    console.log("info: done with GET_all_user.GET_all_user");
  });
  server.get("/api/user/:userId", (req, res) => {
    GET_user.GET_user(req, res, dbConnection);
    console.log("info: done with GET_user.GET_user");
  });
  server.post("/api/user", (req, res) => {
    POST_user.POST_user(req, res, dbConnection);
    console.log("info", "done with POST_user.POST_user");
  });
  server.put("/api/user/:userId", function (req, res, next) {
    PUT_user.PUT_user(req, res, dbConnection, next);
    console.log("info", "done with PUT_user.PUT_user");
  });
};
