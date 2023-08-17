const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
  params: {
    q: 'tesla',
    region: 'US'
  },
  headers: {
    'X-RapidAPI-Key': 'fd55628022msh24b85fe9dbee867p16f506jsneebbf9728214',
    'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
  }
};



async function getResponse(){

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }

}

getResponse()