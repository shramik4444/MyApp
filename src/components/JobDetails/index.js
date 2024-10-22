import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import JobsPage from '../JobsPage'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    job: [],
    company: [],
    apistatus: apiStatusConstants.initial,
    detailsofjob: [],
    setofskills: [],
    companylife: [],
    samejobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {
      company,
      detailsofjob,
      setofskills,
      companylife,
      samejobs,
      apistatus,
    } = this.state

    this.setState({apistatus: apiStatusConstants.inProgress})
    const {job} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log('response -=----------->', response.ok)

    if (response.ok === true) {
      const dataresponse = await response.json()
      const changedData = {
        jobDetails: dataresponse.job_details,
        similarJobs: dataresponse.similar_jobs,
      }
      const {jobDetails, similarJobs} = changedData
      const changetypesimilarjobs = similarJobs.map(each => ({
        similarCompanyLogoUrl: each.company_logo_url,
        similarEmploymentType: each.employment_type,
        similarId: each.id,
        similarJobDescription: each.job_description,
        similarLocation: each.location,
        similarRating: each.rating,
        similarTitle: each.title,
      }))
      const typechangedetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills.map(each => ({
          skillsimageUrl: each.image_url,
          skillsName: each.name,
        })),
        title: jobDetails.title,
      }
      this.setState({
        apistatus: apiStatusConstants.success,
        detailsofjob: typechangedetails,
        setofskills: typechangedetails.skills,
        companylife: typechangedetails.lifeAtCompany,
        samejobs: changetypesimilarjobs,
      })
    } else {
      this.setState({apistatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => {
    console.log('loadingggggggg')
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
    </div>
  )

  renderJobDetails = () => {
    const {apistatus} = this.state

    switch (apistatus) {
      case apiStatusConstants.success:
        return this.getJob()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return renderFailureView()
    }
  }

  getJob = () => {
    const {
      company,
      detailsofjob,
      setofskills,
      companylife,
      samejobs,
      apistatus,
    } = this.state

    return (
      <JobsPage
        details={detailsofjob}
        setofskills={setofskills}
        companylife={companylife}
        samejobs={samejobs}
      />
    )
  }

  render() {
    const {
      company,
      detailsofjob,
      setofskills,
      companylife,
      samejobs,
    } = this.state

    return <div>{this.renderJobDetails()}</div>
  }
}
export default JobDetails
