const async = require("async");
exports.POST_user = (req, res, _dbConnection) => {
  const putUser = (dbConnection, body, callback) => {
    //we will save the user_fname and user_lname that in the request body
    let sqlData = [body.user_fname, body.user_lname];

    let sqlQuery =
      "INSERT INTO user_tbl (user_fname, user_lname, user_isdel) " +
      "VALUES (?, ?, 0)";

    dbConnection.query(sqlQuery, sqlData, (err, result) => {
      if (err) {
        console.log("error", TAG + "putUser Err : " + err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  };

  const validateCredential = (body, callback) => {
    if (body.user_fname == "" || body.user_fname == null) {
      result = "User First Name is empty";
      callback(null, result);
    } else if (body.user_lname == "" || body.user_lname == null) {
      result = "User Last Name is empty";
      callback(null, result);
    } else {
      callback();
    }
  };

  const insertUser = (req, res, _dbConnection, callback) => {
    //initialize database connection
    var dbConnection = _dbConnection;

    //initialize response
    var resp;

    //if any of the functions pass an error to the callback
    //the next function is not executed and the main callback is
    //immediately called with the error
    async.waterfall(
      [
        (callback) => {
          validateCredential(req.body, (err, result) => {
            //check if the validateCredentials return a callback(err, null)
            if (err) {
              callback(err, null);
            } else {
              //check if the validateCredentials return a callback(null, result)
              if (result) {
                let err = {
                  status: "204",
                  message: result,
                };
                callback(err, null);
              } else {
                callback();
              }
            }
          });
        },
        (callback) => {
          putUser(dbConnection, req.body, (err, result) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, result.insertId);
            }
          });
        },
      ],
      //main callback function
      (err, userId) => {
        if (err) {
          callback(err, null);
        } else {
          resp = { status: "200", userId: userId };
          callback(null, resp);
        }
      }
    );
  };

  insertUser(req, res, _dbConnection, (err, result) => {
    if (err) {
      //check if its a error
      if (err.status != "204") {
        let err = {};
        err.status = "500";
        err.message = "Internal Server Error";
      }
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
