const parseEnv = () => {
  const envVariables = Object
    .entries(process.env)
    .filter((envVariable) => envVariable[0].startsWith('RSS_'));
  if (envVariables.length) {
    let result = '';
    for (let i = 0; i < envVariables.length; i++) {
      i < envVariables.length - 1 ?
        result += `${envVariables[i][0]}=${envVariables[i][1]}; ` :
        result += `${envVariables[i][0]}=${envVariables[i][1]}`;
    }
    console.log(result);
  } else {
    console.log('there are no environment variables given')
  }
};

parseEnv();