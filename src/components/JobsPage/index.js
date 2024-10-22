import './index.css'
import NavBar from '../NavBar'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

const JobsPage = props => {
  const {details, setofskills, companylife, samejobs} = props
  console.log('jobdetails ---->', details)
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    id,
    employmentType,
    jobDescription,
    lifeAtCompany,
    location,
    packagePerAnnum,
    rating,
    skills,
    title,
  } = details

  const {description, imageUrl} = companylife

  const {
    similarCompanyLogoUrl,
    similarRating,
    similarTitle,
    similarJobDescription,
    similarEmploymentType,
    similarId,
    similarLocation,
  } = samejobs

  console.log(similarEmploymentType)
  samejobs.map(each => console.log('each ---->', each))

  return (
    <div className="jobitem-bg">
      <NavBar />
      <div className="jobitem-cont">
        <div className="itemlogo-cont">
          <img
            src={companyLogoUrl}
            className="logo-style"
            alt="job details company logo"
          />
          <div className="iteminfo-cont">
            <h1 className="head">{title}</h1>
            <p>{rating}</p>
          </div>
        </div>

        <div className="itemlocation-cont">
          <div className="itemtype-cont">
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="desc">Description</h1>
        <p>{jobDescription}</p>
        <h1 className="desc">Skills</h1>
        <ul className="skill-cont">
          {setofskills.map(each => (
            <Skills det={each} key={each.skillsName} />
          ))}
        </ul>

        <div className="desc-cont">
          <div className="lifeAtCompany-cont">
            <h1>Life at Company</h1>
            <p>{description}</p>
          </div>
          <img src={imageUrl} className="img-size" />
        </div>
      </div>

      <ul className="similar-cont">
        {samejobs.map(each => (
          <SimilarJobs similar={each} key={each.similarId} />
        ))}
      </ul>
    </div>
  )
}
export default JobsPage
