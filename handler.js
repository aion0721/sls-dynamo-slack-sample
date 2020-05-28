"use strict";
const https = require("https");
const dynamodb_arn = process.env.dynamodb_arn;
const event_eventID = process.env.evnt_eventID;
const slack_path = process.env.slack_path;
const pushMessage = require("./slackApi");

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

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
  const data = JSON.stringify({
    text: "Result: :apple:" + Date(),
    blocks: [],
    attachments: [
      {
        color: "#00FF00",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text:
                "A message *with some bold text* and _some italicized text_.",
            },
          },
        ],
      },
    ],
  });

  const options = {
    hostname: "hooks.slack.com",
    port: 443,
    path: slack_path,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
    },
  };

  await pushMessage({ text: "this is test message" });

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
