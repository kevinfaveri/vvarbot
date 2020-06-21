function getRandomInt(min, max) {
  const minCalc = Math.ceil(min);
  const maxCalc = Math.floor(max);
  return Math.floor(Math.random() * (maxCalc - minCalc + 1)) + minCalc;
}

const randomBaianinhoPhrase = ({ screen_name: screenName }) => {
  let message = `@${screenName} É isso aí ${screenName}! Vara é 20!`;
  let imagePath = 'baiano_1.jpeg';
  const number = getRandomInt(1, 5);
  switch (number) {
    case 1:
      message = `@${screenName} É isso aí ${screenName}! VARA é 20!`;
      imagePath = 'baiano_1.jpeg';
      break;
    case 2:
      message = `@${screenName} Boa ${screenName}! É VARA neles!`;
      imagePath = 'baiano_2.jpeg';
      break;
    case 3:
      message = `@${screenName} Não conheço um cliente da Via Varejo que esteja arrependido, pelo contrário, já estamos comprando muito mais. É a melhor empresa de todos os tempos!`;
      imagePath = 'baiano_3.jpeg';
      break;
    case 4:
      message = `@${screenName} Aqui ouvindo o choro dos HATERS!`;
      imagePath = 'baiano_4.jpeg';
      break;

    default:
      break;
  }
  return { message, imagePath };
};

module.exports = { randomBaianinhoPhrase };
