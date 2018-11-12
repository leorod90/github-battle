var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function RepoGrid(props) {
  console.log(props.repos)
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li key={repo.id} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-item'>
              <li>
                <img className='avatar' src={repo.owner.avatar_url} alt={'Avatar for ' + repo.owner.login} />
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>
                @{repo.owner.login}
              </li>
              <li>
                {repo.stargazers_count} stars
              </li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

function SelectLanguage(props) {
  var languages = ['all', 'javascript', 'react', 'html', 'css', 'php']
  return (
    <div>
      <ul className="languages">
        {languages.map(function (lang) {
          return (
            <li key={lang}
              style={lang === props.selectedLanguage ? { color: 'red' } : null}
              onClick={props.updateLanguage.bind(null, lang)}>
              {lang}</li>
          )
        }, this)}
      </ul>
    </div>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
};


class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'all',
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentWillMount() {
    //AJAX
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null,
      }
    });
    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos: repos
          }
        })
      }.bind(this))
  }
  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          updateLanguage={this.updateLanguage}
        />
        {this.state.repos
          ? <RepoGrid repos={this.state.repos} />
          : <div className="loader"></div>}
      </div>
    );
  }
}

module.exports = Popular;