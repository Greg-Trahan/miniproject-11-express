const diagnostics = require("express").Router();
const uuid = require("uuid");
const savedDignostics = require("../db/diagnostics.json");
const fs = require("fs");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// GET Route for retrieving diagnostic information
diagnostics.get("/", (req, res) => {
  // use the readFromFile function to read the db/diagnostics.json file
  diagData = JSON.stringify(savedDignostics);
  test = readFromFile(savedDignostics);
  console.log(test);
  // TODO: Logic for sending all the content of db/diagnostics.json
  res.status(200).json(`${diagData}`);
});

// POST Route for a error logging
diagnostics.post("/", (req, res) => {
  // Destructuring assignment for the items in req.body
  console.log(req.body);

  // const { tip, topic, username } = req.body;
  // console.log(`
  //   tip: ${tip},
  //   topic: ${topic},
  //   username: ${username}
  // `);

  // If all the required properties are present
  // if (tip && topic && username) {
  //   // Variable for the object we will save
  //   const newError = {
  //     tip,
  //     topic,
  //     username,
  //   };

  const newError = req.body;

  // Obtain existing reviews
  fs.readFile("./db/diagnostics.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const currentErrors = JSON.parse(data);

      // Add a new review
      currentErrors.push(req.body);

      // Write updated reviews back to the file
      fs.writeFile(
        "./db/diagnostics.json",
        JSON.stringify(currentErrors, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info("Successfully updated errors!")
      );
    }
  });

  const response = {
    status: "success",
    body: newError,
  };

  console.log(response);
  res.status(201).json(response);

  //******************************************* */
});

module.exports = diagnostics;
