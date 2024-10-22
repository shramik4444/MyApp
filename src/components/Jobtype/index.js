import './index.css'

const Jobtype = props => {
  const {details, checkboxfilter} = props
  const {employmentTypeId, label} = details
  const onclickcheckbox = () => {
    checkboxfilter(employmentTypeId)
  }

  return (
    <li className="list-cont">
      <input
        type="checkbox"
        onChange={onclickcheckbox}
        value={employmentTypeId}
      />
      <p className="type-font">{label}</p>
    </li>
  )
}
export default Jobtype
