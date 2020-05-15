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

module.exports = { shuffledWhitespaces };
