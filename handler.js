"use strict";
const https = require("https");
const dynamodb_arn = process.env.dynamodb_arn;
const event_eventID = process.env.evnt_eventID;
const slack_path = process.env.slack_path;

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
  // Test event
  event = {
    Records: [
      {
        eventID: event_eventID,
        eventName: "INSERT",
        eventVersion: "1.1",
        eventSource: "aws:dynamodb",
        awsRegion: "ap-northeast-1",
        dynamodb: {
          ApproximateCreationDateTime: 1590219483,
          Keys: {
            id: {
              S: "8",
            },
          },
          NewImage: {
            id: {
              S: "8",
            },
          },
          SequenceNumber: "794900000000016712999939",
          SizeBytes: 6,
          StreamViewType: "NEW_AND_OLD_IMAGES",
        },
        eventSourceARN: dynamodb_arn,
      },
    ],
  };
  console.log(JSON.stringify(event, null, 2));
  const {
    Records: [
      {
        dynamodb: { NewImage },
      },
    ],
  } = event;
  console.log(NewImage.id.S);
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
