const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (userID) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    method: 'get',
    url: `https://api.github.com/users/${userID}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  //send the GET request
  return axios(options)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log('Status: ' + err.response.headers.status);
    })

}

module.exports.getReposByUsername = getReposByUsername;