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

module.exports = { randomBaianinhoPhrase };
