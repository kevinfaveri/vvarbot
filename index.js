require('dotenv').config();

const Twit = require('twit');

function getRandomInt(min, max) {
  const minCalc = Math.ceil(min);
  const maxCalc = Math.floor(max);
  return Math.floor(Math.random() * (maxCalc - minCalc + 1)) + minCalc;
}

const randomBaianinhoPhrase = ({ screen_name: screenName }) => {
  const number = getRandomInt(1, 3);
  switch (number) {
    case 1:
      return `@${screenName} É isso aí ${screenName}! VARA é 20!`;
    case 2:
      return `@${screenName} Boa ${screenName}! É VARA neles!`;
    case 3:
      return `@${screenName} Não conheço um cliente da Via Varejo que esteja arrependido, pelo contrário, já estamos comprando muito mais. É a melhor empresa de todos os tempos!`;

    default:
      return `@${screenName} É isso aí ${screenName}! Vara é 20!`;
  }
};

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});

function tweetEvent(tweet) {
  console.log('tweet', tweet);
  const inReplyToUser = tweet.user.screen_name;
  const inReplyTo = tweet.in_reply_to_screen_name;

  if (inReplyToUser === 'vvarbot' || inReplyTo === 'vvarbot') return;

  const nameID = tweet.id_str;
  const threadID = tweet.in_reply_to_status_id_str;
  const reply = randomBaianinhoPhrase({
    screen_name: threadID
      ? tweet.in_reply_to_screen_name
      : tweet.user.screen_name,
  });
  const params = {
    status: reply,
    in_reply_to_status_id: threadID || nameID,
  };

  console.log('params -->', params);

  T.post('statuses/update', params, function (err, response) {
    if (err !== undefined) {
      console.log(err);
    } else {
      console.log(`Tweeted: ${params.status} `);
    }
  });
}

const stream = T.stream('statuses/filter', { track: ['@vvarbot'] });
stream.on('tweet', tweetEvent);
