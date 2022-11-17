import './index.css'

const LanguageFilterItem = props => {
  const {buttonDetails, changeData} = props
  const {id, language} = buttonDetails
  const onClickButton = () => {
    changeData(id)
  }
  return (
    <li className="button-list">
      <button type="button" className="button" onClick={onClickButton}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
