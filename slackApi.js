const { WebClient } = require("@slack/web-api");

const {
  SLACK_API_TOKEN,
  SLACK_CHANNEL,
  SLACK_USERNAME,
  SLACK_ICON,
} = process.env;

const slackClient = new WebClient(SLACK_API_TOKEN);

const pushMessage = async ({ text }) => {
  const result = await slackClient.chat.postMessage({
    text,
    channel: SLACK_CHANNEL,
    username: SLACK_USERNAME,
    icon_url: SLACK_ICON,
    unful_links: true,
  });
  console.log({ result });
};

module.exports = pushMessage;
