exports.PUT_user = function (req, res, _dbConnection) {
  const updateUser = (req, res, _dbConnection, callback) => {
    let body = req.body;

    // Initialize sqlData array to hold SQL query parameters
    let sqlData = [];

    // Count the request body properties (fields)
    let count = 0;
    for (let prop in body) {
      if (body.hasOwnProperty(prop)) {
        count++;
      }
    }

    // If no fields to update, return a bad request error
    if (count === 0) {
      return callback(
        {
          status: "400",
          message:
            "Bad Request: At least one field (user_fname, user_lname, user_isdel) must be provided",
        },
        null
      );
    }

    // Build the SQL query dynamically based on provided fields
    let sqlQuery = `UPDATE user_tbl SET `;

    // Concatenate user_fname if provided
    if (body.user_fname) {
      sqlQuery += `user_fname = ?`;
      sqlData.push(body.user_fname);
      if (count > 1) {
        sqlQuery += `, `;
        count--;
      }
    }

    // Concatenate user_lname if provided
    if (body.user_lname) {
      sqlQuery += `user_lname = ? `;
      sqlData.push(body.user_lname);
      if (count > 1) {
        sqlQuery += `, `;
        count--;
      }
    }

    // Concatenate user_isdel if provided
    if (body.user_isdel) {
      sqlQuery += `user_isdel = ? `;
      sqlData.push(body.user_isdel);
      if (count > 1) {
        sqlQuery += `, `;
        count--;
      }
    }

    // Add WHERE clause to specify which user to update
    sqlData.push(req.params.userId);
    sqlQuery += `WHERE user_id = ?`;

    // Execute the SQL query
    _dbConnection.query(sqlQuery, sqlData, (err, result) => {
      if (err) {
        console.error("Database Query Error:", err); // Log the error for debugging
        return callback(
          {
            status: "500",
            message: "Internal Server Error: Unable to execute query",
          },
          null
        );
      }

      // If no rows are affected, the user ID might not exist
      if (result.affectedRows === 0) {
        return callback(
          {
            status: "404",
            message: `User with ID ${req.params.userId} not found or no changes made`,
          },
          null
        );
      }

      // Query the updated user data
      const selectQuery = "SELECT * FROM user_tbl WHERE user_id = ?";
      _dbConnection.query(
        selectQuery,
        [req.params.userId],
        (err, userResult) => {
          if (err) {
            console.error("Database Query Error:", err); // Log the error for debugging
            return callback(
              {
                status: "500",
                message: "Internal Server Error: Unable to fetch updated user",
              },
              null
            );
          }

          // Return the updated user data
          callback(null, {
            status: "200",
            message: "User updated successfully",
            user: userResult,
          });
        }
      );
    });
  };

  // Call updateUser with the provided request, response, and database connection
  updateUser(req, res, _dbConnection, (err, result) => {
    if (err) {
      res.status(err.status || 500).send(err); // Send the specific error response
    } else {
      res.status(result.status || 200).send(result); // Send success response
    }
  });
};
