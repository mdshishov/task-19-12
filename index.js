import readlineSync from 'readline-sync';

const whoWins = (player1, player2) => {
  if (player1 === player2) {
    return 0;
  }

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
};

const resultMessage = (user, computer) => {
  const lines = ['Камень ломает ножницы', 'Ножницы режут бумагу', 'Бумага оборачивает камень'];
  const winner = whoWins(user, computer);
  let result = '';

  if (winner === 1) {
    result += 'Вы победили! ';
  } else if (winner === 2) {
    result += 'Победил компьютер. ';
  } else {
    return 'Ничья.';
  }

  if ((user === 1 || user === 2) && (computer === 1 || computer === 2)) {
    return `${result}${lines[0]}.`;
  }
  if ((user === 2 || user === 3) && (computer === 2 || computer === 3)) {
    return `${result}${lines[1]}.`;
  }
  if ((user === 1 || user === 3) && (computer === 1 || computer === 3)) {
    return `${result}${lines[2]}.`;
  }
};

const getRandom = () => Math.floor(Math.random() * 2 + 1);

const gameStage = () => {
  console.log('\nВыберите вашу фигуру:');
  
  const moves = ['Камень', 'Ножницы', 'Бумага'];
  for (let i = 0; i < moves.length; i += 1) {
    console.log(`${i + 1}. ${moves[i]}`);
  }

  console.log();
  const index = Number(readlineSync.keyIn('Ваш выбор: ', {limit: '$<1-3>'}));
  console.log(`Ваш выбор: ${moves[index - 1]}`);

  const computer = getRandom();
  console.log(`\nКомпьютер выбирает: ${moves[computer - 1]}`);

  console.log('\nРезультат: ' + resultMessage(index, computer));
};

const isEnd = () => {
  const ask = readlineSync.question('\nХотите сыграть ещё раз? (да/нет): ', {
    limit: ['да', 'нет'],
    limitMessage: 'Введите, пожалуйста "да" или "нет".'
  });

  return ask === 'да';
}

const game = () => {
  console.log('Добро пожаловать в игру "Камень, Ножницы, Бумага"!');
  let end = true;

  do {
    gameStage();
    end = isEnd();
  } while (end);

  console.log('\nСпасибо за игру! До встречи!')
};

game();