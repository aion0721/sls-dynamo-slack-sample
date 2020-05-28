import { WebClient } from "@slack/web-api";

const { SLACK_API_TOKEN, SLACK_CHANNEL, SLACK_USERNAME } = process.env;

const slackClient = new WebClient(SLACK_API_TOKEN);

export const pushMessage = async ({ text }) => {
  const result = await slackClient.chat.postMessage({
    text,
    channel: SLACK_CHANNEL,
    username: SLACK_USERNAME,
    unful_links: true,
  });
  console.log({ result });
};
