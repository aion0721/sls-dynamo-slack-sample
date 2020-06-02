"use strict";
const { dynamodb_arn, event_eventID, slack_path, link_basepath } = process.env;
const pushMessage = require("./slackApi");

module.exports.dynamoStream = async (event) => {
  console.log(JSON.stringify(event, null, 2));
  const {
    Records: [
      {
        dynamodb: { NewImage },
      },
    ],
  } = event;
  console.log([NewImage]);

  const text = `新着の勉強会があります!確認してみましょう
:memo:${NewImage.title.S}
:page_with_curl:${NewImage.catchMessage.S}
:date:${NewImage.startedAt.S}
${link_basepath}${NewImage.hashtag.S} `;

  // Push Slack
  await pushMessage({ text });
  //console.log({ text: txt });
};
