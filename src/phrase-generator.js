function getRandomInt(min, max) {
  const minCalc = Math.ceil(min);
  const maxCalc = Math.floor(max);
  return Math.floor(Math.random() * (maxCalc - minCalc + 1)) + minCalc;
}

const randomBaianinhoPhrase = ({ screenName }) => {
  let message = `É isso aí ${screenName}! Vara é 20!`;
  let imagePath = 'baiano_1.jpeg';
  const number = getRandomInt(1, 9);
  switch (number) {
    case 1:
      message = `É isso aí ${screenName}! VARA é 20!`;
      imagePath = 'baiano_1.jpeg';
      break;
    case 2:
      message = `Boa ${screenName}! É VARA neles!`;
      imagePath = 'baiano_2.jpeg';
      break;
    case 3:
      message = `Não conheço um cliente da Via Varejo que esteja arrependido, pelo contrário, já estamos comprando muito mais. É a melhor empresa de todos os tempos!`;
      imagePath = 'baiano_3.jpeg';
      break;
    case 4:
      message = `Aqui escutando o choro dos HATERS!`;
      imagePath = 'baiano_4.jpeg';
      break;
    case 5:
      message = `E aí vendido?`;
      imagePath = 'baiano_5.jpeg';
      break;
    case 6:
      message = `Tenho um remedinho para os vendidos...`;
      imagePath = 'baiano_6.jpeg';
      break;
    case 7:
      message = `Aqui curtindo uma seriezinha...`;
      imagePath = 'baiano_7.jpeg';
      break;
    case 8:
      message = `Esperando a VARA chegar em R$ 10 pra entrar comprado...`;
      imagePath = 'baiano_8.jpeg';
      break;
    case 9:
      message = `Prato de hoje...`;
      imagePath = 'baiano_9.jpeg';
      break;
    default:
      break;
  }
  return { message, imagePath };
};

module.exports = { randomBaianinhoPhrase };
