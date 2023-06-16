const parseArgs = () => {
  const argumentsArray = process.argv.slice(2);
  if (argumentsArray.length) {
    let result = '';
    for (let i = 0; i < argumentsArray.length; i += 2) {
      i < argumentsArray.length - 2 ?
        result += `${argumentsArray[i].slice(2)} is ${argumentsArray[i + 1]}, ` :
        result += `${argumentsArray[i].slice(2)} is ${argumentsArray[i + 1]}`;
    }
    console.log(result);
  } else {
    console.log('there are no arguments given')
  }
};

parseArgs();