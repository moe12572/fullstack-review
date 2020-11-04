const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true,
  /* other options */
})


let repoSchema = mongoose.Schema({
  full_name: String,
  owner: { login: String, id: Number },
  html_url: { type: String, unique: true },
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (input) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  //console.log(input);
  return Repo.insertMany(input, { ordered: false });

}

module.exports.save = save;