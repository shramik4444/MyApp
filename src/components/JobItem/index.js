import './index.css'
import {Link} from 'react-router-dom'

const JobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    title,
    rating,
  } = details

  return (
    <div className="item-cont">
      <Link to={`/jobs/${id}`}>
        <div className="logo-cont">
          <img src={companyLogoUrl} className="logo-style" alt="company logo" />
          <div className="info-cont">
            <h1 className="head">{title}</h1>
            <p>{rating}</p>
          </div>
        </div>
        <div className="location-cont">
          <div className="type-cont">
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </Link>
    </div>
  )
}
export default JobItem
