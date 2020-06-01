"use strict";
const https = require("https");
const { dynamodb_arn, event_eventID, slack_path, link_basepath } = process.env;
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

  // Push Slack
  //await pushMessage({ text: "${NewImage}" });
  console.log({ text: NewImage.title.S });
};
