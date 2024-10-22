import './index.css'

const Salaryitem = props => {
  const {details, radioclicked} = props
  const {salaryRangeId, label} = details

  const onclickradio = () => {
    radioclicked(salaryRangeId)
  }

  return (
    <li className="list-cont">
      <input type="radio" onChange={onclickradio} />
      <p className="type-font">{label}</p>
    </li>
  )
}
export default Salaryitem
