const Twit = require('twit');
const cron = require('node-cron');
const { randomBaianinhoPhrase } = require('./phrase-generator');
const { tweetWithImage, tweetTextOnly } = require('./utils');

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});

function tweetEvent(tweet) {
  const inReplyToUser = tweet.user.screen_name;
  const inReplyTo = tweet.in_reply_to_screen_name;
  const replyThreadId = tweet.in_reply_to_status_id_str;
  const tweetIncludesVara = tweet.entities.hashtags.find(
    x => x.text.toUpperCase() === 'VARA'
  );

  if (
    !tweetIncludesVara ||
    (inReplyToUser === 'baianinho_bot' && inReplyTo === 'baianinho_bot')
  )
    return;

  const nameID = tweet.id_str;
  const threadID = replyThreadId || tweet.id_str;

  const screenName = replyThreadId ? inReplyTo : inReplyToUser;

  const reply = randomBaianinhoPhrase({
    screenName,
  });

  const cc = replyThreadId ? `cc: @${inReplyToUser}` : '';

  const params = {
    imagePath: reply.imagePath,
    status: `@${screenName} ${reply.message} ${cc}`,
    in_reply_to_status_id: !replyThreadId ? nameID : threadID,
  };

  if (params.imagePath) tweetWithImage(T, params);
  else tweetTextOnly(T, params);
}

const stream = T.stream('statuses/filter', { track: ['@baianinho_bot'] });
stream.on('tweet', tweetEvent);
stream.on('limit', msg => console.warn('limit msg', msg));
stream.on('connected', function() {
  console.log('Is Connected');
});
stream.on('disconnect', function(disconnectMessage) {
  console.warn('disconnectMessage', disconnectMessage);
});
stream.on('error', function(error) {
  console.warn('error', error);
});

// Schedule random phrases every three hours
cron.schedule('0 0 */3 * * *', () => {
  const reply = randomBaianinhoPhrase({ screenName: 'galera' });
  const params = {
    imagePath: reply.imagePath,
    status: reply.message,
  };

  if (params.imagePath) {
    tweetWithImage(T, params);
  } else {
    tweetTextOnly(T, params);
  }
});

// Schedule donation pledge
cron.schedule('0 0 18 * * *', () => {
  tweetTextOnly(T, {
    status: `Pessoal, preciso da ajuda de vocês! Eu rodo inteiramente na nuvem e isso acaba tendo custos...Portanto, se possível, ajude doando qualquer valor para o meu criador aqui:
    https://cutt.ly/kevin-paypal
    https://pag.ae/7W8bEJKYK
    https://picpay.me/kevinfguiar`,
  });
});

// Schedule DISCLAIMER
cron.schedule('0 30 9 * * *', () => {
  tweetTextOnly(T, {
    status: `DISCLAIMER: 
    Esta conta não tem a menor intenção de se passar por uma pessoa real! 
    Todas as ideias aqui apresentadas são memes relativos a #VVAR3, sem qualquer intenção além de provocar risadas.
    Também não possui qualquer relação com a Via Varejo.`,
  });
});
