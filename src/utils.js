// Man this is evil...
const RANDOM_WHITESPACE_CHARS = [
  ' ',
  '​​​​ ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  '⠀',
];

const fs = require('fs');
const path = require('path');

function shuffledWhitespaces() {
  let currentIndex = RANDOM_WHITESPACE_CHARS.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = RANDOM_WHITESPACE_CHARS[currentIndex];
    RANDOM_WHITESPACE_CHARS[currentIndex] =
      RANDOM_WHITESPACE_CHARS[randomIndex];
    RANDOM_WHITESPACE_CHARS[randomIndex] = temporaryValue;
  }

  return RANDOM_WHITESPACE_CHARS.join(' ');
}

function tweetWithImage(twitInstance, params) {
  const b64content = fs.readFileSync(
    path.resolve(__dirname, `./assets/${params.imagePath}`),
    {
      encoding: 'base64',
    }
  );
  twitInstance.post('media/upload', { media_data: b64content }, function(
    err,
    data,
    response
  ) {
    const mediaIdStr = data.media_id_string;
    const altText = params.status;
    const metaParams = { media_id: mediaIdStr, alt_text: { text: altText } };

    twitInstance.post('media/metadata/create', metaParams, function(err) {
      if (!err) {
        params.media_ids = [mediaIdStr];

        twitInstance.post('statuses/update', params, function(err) {
          console.info(data);
        });
      }
    });
  });
}

function tweetTextOnly(twitInstance, params) {
  twitInstance.post('statuses/update', params, function(err) {
    if (err !== undefined) {
      console.error(err);
    } else {
      console.info(`Tweeted: ${params.status} `);
    }
  });
}

module.exports = { shuffledWhitespaces, tweetWithImage, tweetTextOnly };
