require('dotenv').config();

const fs = require('fs');
const path = require('path');
const Twit = require('twit');
const { randomBaianinhoPhrase } = require('./phrase-generator');

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});

function tweetWithImage(params) {
  const b64content = fs.readFileSync(
    path.resolve(__dirname, `./assets/${params.imagePath}`),
    {
      encoding: 'base64',
    }
  );
  T.post('media/upload', { media_data: b64content }, function (
    err,
    data,
    response
  ) {
    const mediaIdStr = data.media_id_string;
    const altText = params.status;
    const metaParams = { media_id: mediaIdStr, alt_text: { text: altText } };

    T.post('media/metadata/create', metaParams, function (err, data, response) {
      if (!err) {
        params.media_ids = [mediaIdStr];

        T.post('statuses/update', params, function (err, data, response) {
          console.info(data);
        });
      }
    });
  });
}

function tweetTextOnly(params) {
  T.post('statuses/update', params, function (err, response) {
    if (err !== undefined) {
      console.error(err);
    } else {
      console.info(`Tweeted: ${params.status} `);
    }
  });
}

function tweetEvent(tweet) {
  console.log('tweet', tweet);
  const inReplyToUser = tweet.user.screen_name;
  const inReplyTo = tweet.in_reply_to_screen_name;
  const tweetIncludesVara = tweet.entities.hashtags.find(
    x => x.text.toUpperCase() === 'VARA'
  );
  const tweetIncludesHere = tweet.entities.hashtags.find(
    x => x.text.toUpperCase() === 'AQUI'
  );

  if (
    !tweetIncludesHere &&
    (inReplyToUser === 'baianinho_bot' ||
      inReplyTo === 'baianinho_bot' ||
      !tweetIncludesVara)
  )
    return;

  const nameID = tweet.id_str;
  const threadID = tweet.in_reply_to_status_id_str || tweet.id_str;

  const reply = randomBaianinhoPhrase({
    screen_name: tweetIncludesHere
      ? tweet.user.screen_name
      : tweet.in_reply_to_screen_name,
  });

  const params = {
    imagePath: reply.imagePath,
    status: `${reply.message} cc: @${tweet.user.screen_name}`,
    in_reply_to_status_id: tweetIncludesHere ? nameID : threadID,
  };

  if (params.imagePath) {
    tweetWithImage(params);
  } else {
    tweetTextOnly(params);
  }
}

const stream = T.stream('statuses/filter', { track: ['@baianinho_bot'] });
stream.on('tweet', tweetEvent);
