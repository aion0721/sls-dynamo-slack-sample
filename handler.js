"use strict";
const https = require("https");
const dynamodb_arn = process.env.dynamodb_arn;
const event_eventID = process.env.evnt_eventID;
const slack_path = process.env.slack_path;
const pushMessage = require("./slackApi");

module.exports.dynamo_stream = async (event) => {
  console.log(JSON.stringify(event, null, 2));
  const {
    Records: [
      {
        dynamodb: { NewImage },
      },
    ],
  } = event;
  console.log([NewImage]);

  await pushMessage({ text: "${NewImage}" });

  // Push Slack
  //  const req = https.request(options, (res) => {
  //    if (res.statusCode === 200) {
  //      console.log("OK:" + res.statusCode);
  //    } else {
  //      console.log("Status Error:" + res.statusCode);
  //    }
  //  });
  //
  //  req.on("error", (e) => {
  //    console.error(e);
  //  });
  //
  //  req.write(data);
  //
  //  req.end();
};
