import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const status = {
  initial: ' INITIAL',
  uiSuccess: 'SUCCESS',
  uiFailure: 'FAILURE',
  uiLoading: 'LOADING',
}

class GithubPopularRepos extends Component {
  state = {
    languagesList: [],
    apiStatus: status.initial,
    queryParam: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getLanguageData()
  }

  getLanguageData = async () => {
    this.setState({apiStatus: status.uiLoading})
    const {queryParam} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${queryParam}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const updatedData = data.popular_repos.map(each => ({
      avatarUrl: each.avatar_url,
      forksCount: each.forks_count,
      id: each.id,
      issuesCount: each.issues_count,
      name: each.name,
      startsCount: each.starts_count,
    }))

    if (response.ok === true) {
      this.setState({languagesList: updatedData, apiStatus: status.uiSuccess})
    } else {
      this.setState({apiStatus: status.uiFailure})
    }
  }

  changeData = getId => {
    this.setState({queryParam: getId}, this.getLanguageData)
  }

  renderSuccessView = () => {
    const {languagesList} = this.state
    return (
      <ul className="list-container">
        {languagesList.map(eachLang => (
          <RepositoryItem repoDetails={eachLang} key={eachLang.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.uiSuccess:
        return this.renderSuccessView()
      case status.uiLoading:
        return this.renderLoadingView()
      case status.uiFailure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1>Popular</h1>
        <ul className="button-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              buttonDetails={each}
              key={each.id}
              changeData={this.changeData}
            />
          ))}
        </ul>
        {this.renderSwitch()}
      </div>
    )
  }
}

export default GithubPopularRepos
