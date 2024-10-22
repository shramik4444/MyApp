const SimilarJobs = props => {
  const {similar} = props
  const {
    similarCompanyLogoUrl,
    similarEmploymentType,
    similarRating,
    similarJobDescription,
    similarLocation,
    similarTitle,
  } = similar
  return (
    <div className="card-cont">
      <img
        src={similarCompanyLogoUrl}
        className="logo-style"
        alt="similar job company logo"
      />
      <div className="info-cont">
        <h1 className="head">{similarTitle}</h1>
        <p>{similarRating}</p>
      </div>
      <div className="location-cont">
        <div className="type-cont">
          <p>{similarLocation}</p>
          <p>{similarEmploymentType}</p>
        </div>
      </div>
      <hr className="line" />
      <h1>Description</h1>
      <p>{similarJobDescription}</p>
    </div>
  )
}
export default SimilarJobs
