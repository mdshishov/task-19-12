import readlineSync from 'readline-sync';

const whoWins = (player1, player2) => {
  if (player1 === 1) {
    if (player2 === 2) {
      return 1;
    }
    if (player2 === 3) {
      return 2;
    }
  }

  if (player1 === 2) {
    if (player2 === 3) {
      return 1;
    }
    if (player2 === 1) {
      return 2;
    }
  }

  if (player1 === 3) {
    if (player2 === 1) {
      return 1;
    }
    if (player2 === 2) {
      return 2;
    }
  }

  return 0;
};

const resultMessage = (user, computer) => {
  const lines = ['Камень ломает ножницы.', 'Ножницы режут бумагу.', 'Бумага оборачивает камень.'];
  const winner = whoWins(user, computer);
  let message = '';

  if (winner === 1) {
    message += 'Вы победили! ';
  } else if (winner === 2) {
    message += 'Победил компьютер. ';
  } else {
    return ['Ничья.', winner];
  }

  if ((user === 1 || user === 2) && (computer === 1 || computer === 2)) {
    message += lines[0];
  }
  if ((user === 2 || user === 3) && (computer === 2 || computer === 3)) {
    message += lines[1];
  }
  if ((user === 1 || user === 3) && (computer === 1 || computer === 3)) {
    message += lines[2];
  }

  return [message, winner];
};

const getRandom = (n = 3, m = 1) => Math.floor(Math.random() * n + m);

const gameRound = () => {
  console.log('\nВыберите вашу фигуру:');

  const moves = ['Камень', 'Ножницы', 'Бумага'];
  for (let i = 0; i < moves.length; i += 1) {
    console.log(`${i + 1}. ${moves[i]}`);
  }

  const user = Number(readlineSync.keyIn('\nВаш выбор: ', { limit: '$<1-3>' }));
  console.log(`Ваш выбор: ${moves[user - 1]}\n`);

  const computer = getRandom();
  console.log(`Компьютер выбирает: ${moves[computer - 1]}\n`);

  const [message, winner] = resultMessage(user, computer);
  console.log(`Результат: ${message}\n`);

  return winner;
};

const isEnd = () => {
  const ask = readlineSync.question('Хотите сыграть ещё раз? (да/нет): ', {
    limit: ['да', 'нет'],
    limitMessage: 'Введите, пожалуйста "да" или "нет".',
  });

  return ask === 'да';
};

const game = () => {
  console.log('Добро пожаловать в игру "Камень, Ножницы, Бумага"!');

  let userCount = 0;
  let computerCount = 0;

  let flag = true;
  do {
    const winner = gameRound();

    if (winner === 1) {
      userCount += 1;
    }
    if (winner === 2) {
      computerCount += 1;
    }
    console.log(`Пользователь ${userCount} | ${computerCount} Компьютер`);

    flag = isEnd();
  } while (flag);

  console.log('\nСпасибо за игру! До встречи!');
};

game();
