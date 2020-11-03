import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search(term) {
    console.log(`${term} was searched`);
    // TODO
    // var input = { username: term }
    $.ajax({
      type: "POST",
      data: { username: term },
      url: "/repos",
      success: function (data) {
        alert('success');
      },
      error: function (data) {
        alert('failure');
      },
    });
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));