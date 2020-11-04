const express = require('express');
const bodyParser = require('body-parser');
const getRepos = require('../helpers/github.js');
const saveRepos = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // console.log(req.body.username);
  getRepos.getReposByUsername(req.body.username)
    .then(responseToSendData => {
      //console.log(res.data)
      var dataSet = [];
      for (var i = 0; i < responseToSendData.data.length; i++) {
        var storage = {};
        storage['full_name'] = responseToSendData.data[i].full_name;
        storage['owner_login'] = responseToSendData.data[i].owner.login;
        storage['owner_id'] = responseToSendData.data[i].owner.id;
        storage['html_url'] = responseToSendData.data[i].html_url;
        storage["forks_count"] = responseToSendData.data[i].forks_count;
        dataSet.push(storage);
      }
      saveRepos.save(dataSet)
        .catch(error => {
          if (err.code === 11000) {
            return;
          } else {
            throw err;
          }
        })
        .then(response => {
          res.status(201).send('Success')
        })
        .catch(error => {
          res.status(400).send(error)
        })
    })
    .catch(err => {
      console.log(err)
    })


});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

