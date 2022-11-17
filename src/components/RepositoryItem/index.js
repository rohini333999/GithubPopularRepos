import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, forksCount, starsCount, issuesCount, name} = repoDetails
  return (
    <li className="list">
      <div className="repo-container">
        <img src={avatarUrl} className="repo-image" alt={name} />
        <h1 className="heading">{name}</h1>
        <div className="count">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p className="para">{starsCount} stars</p>
        </div>
        <div className="count">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p className="para">{forksCount} forks</p>
        </div>
        <div className="count">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p className="para">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
