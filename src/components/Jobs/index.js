import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Salaryitem from '../Salaryitem'
import NavBar from '../NavBar'
import JobItem from '../JobItem'
import Jobtype from '../Jobtype'
import JobDetails from '../JobDetails'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profile: [],
    jobsList: [],
    typeofemployment: '',
    salarypackage: '',
    searchinput: '',
    job: [],
    apistatus: apiStatusConstants.initial,
  }

  rendertypeofjobs = () => {
    const employmentTypesList = [
      {
        label: 'Full Time',
        employmentTypeId: 'FULLTIME',
      },
      {
        label: 'Part Time',
        employmentTypeId: 'PARTTIME',
      },
      {
        label: 'Freelance',
        employmentTypeId: 'FREELANCE',
      },
      {
        label: 'Internship',
        employmentTypeId: 'INTERNSHIP',
      },
    ]

    return (
      <div>
        <h1>Type of Employment</h1>
        <ul>
          {employmentTypesList.map(each => (
            <Jobtype
              details={each}
              key={each.employmentTypeId}
              checkboxfilter={this.checkboxfilter}
            />
          ))}
        </ul>
      </div>
    )
  }

  onclicksearch = () => {
    this.getFilteredData()
  }

  enterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getFilteredData()
    }
  }

  changeSearchInput = event => {
    this.setState({searchinput: event.target.value})
  }

  checkboxfilter = id => {
    const {typeofemployment} = this.state
    console.log('type ====', typeofemployment)
    this.setState({typeofemployment: id}, this.getFilteredData)
  }

  radioclicked = id => {
    const {salarypackage} = this.state
    this.setState({salarypackage: id}, this.getFilteredData)
    console.log(id)
  }

  rendersalaryrange = () => {
    const salaryRangesList = [
      {
        salaryRangeId: '1000000',
        label: '10 LPA and above',
      },
      {
        salaryRangeId: '2000000',
        label: '20 LPA and above',
      },
      {
        salaryRangeId: '3000000',
        label: '30 LPA and above',
      },
      {
        salaryRangeId: '4000000',
        label: '40 LPA and above',
      },
    ]
    return (
      <ul>
        {salaryRangesList.map(each => (
          <Salaryitem
            details={each}
            key={each.salaryRangeId}
            radioclicked={this.radioclicked}
          />
        ))}
      </ul>
    )
  }

  getData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const respose = await fetch('https://apis.ccbp.in/profile', options)
    const resposeData = await respose.json()

    const changed = {
      profileImageUrl: resposeData.profile_details.profile_image_url,
      name: resposeData.profile_details.name,
      shortBio: resposeData.profile_details.short_bio,
    }

    this.setState({profile: changed})
  }

  componentDidMount() {
    this.getData()
    this.getFilteredData()
  }

  // getJobsData = async () => {
  //   const {jobsList} = this.state
  //   const jwtToken = Cookies.get('jwt_token')
  //   const url = 'https://apis.ccbp.in/jobs'
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //     },
  //   }
  //   const resp = await fetch(url, options)
  //   const data = await resp.json()
  //   const changedData = data.jobs.map(each => ({
  //     companyLogoUrl: each.company_logo_url,
  //     employmentType: each.employment_type,
  //     id: each.id,
  //     jobDescription: each.job_description,
  //     location: each.location,
  //     packagePerAnnum: each.package_per_annum,
  //     rating: each.rating,
  //     title: each.title,
  //   }))
  //   this.setState({jobsList: changedData})
  // }

  renderJobsList = () => {
    const {jobsList} = this.state

    return (
      <ul>
        {jobsList.map(each => (
          <JobItem details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderJobsFailureView = () => (
    <div className="nojobs-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="nojobs-img"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  getFilteredData = async () => {
    const {
      salarypackage,
      typeofemployment,
      searchinput,
      jobsList,
      apistatus,
    } = this.state
    this.setState({apistatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${typeofemployment}&minimum_package=${salarypackage}&search=${searchinput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const respData = await response.json()
      const changedData = respData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      console.log(respData)
      this.setState({
        jobsList: changedData,
        apistatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apistatus: apiStatusConstants.failure})
    }
  }

  renderprofile = () => {
    const {profile} = this.state
    const {profileImageUrl, name, shortBio} = profile

    return (
      <div className="first-cont">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="names">{name}</h1>
        <p className="names">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => {
    console.log('loadingggggggg')
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderJobsApiFailure = () => (
    <div className="nojobs-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="retry" onClick={this.retryJobsApiUrl}>
        Retry
      </button>
    </div>
  )

  renderJobListCase = () => {
    const {apistatus, jobsList} = this.state
    switch (apistatus) {
      case apiStatusConstants.success:
        if (jobsList.length === 0) {
          return this.renderJobsFailureView()
        }
        return this.renderJobsList()

      case apiStatusConstants.failure:
        return this.renderJobsApiFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderAllJobs = () => {
    const {jobsList} = this.state
  }

  retryJobsApiUrl = () => {
    this.getFilteredData()
  }

  render() {
    const {profile, jobsList, searchinput} = this.state
    const {profile_image_url, name, short_bio} = profile
    return (
      <>
        <NavBar />
        <div className="jobs-bg">
          <div className="left-cont">
            <div className="container">
              {this.renderprofile()}
              <hr className="line" />
              {this.rendertypeofjobs()}
              <hr className="line" />
              <h1>Salary Range</h1>
              {this.rendersalaryrange()}
            </div>
          </div>
          <div className="right-cont">
            <div className="search-div">
              <div>
                <input
                  type="search"
                  className="search-cont"
                  value={searchinput}
                  onChange={this.changeSearchInput}
                  onKeyDown={this.enterSearchInput}
                  data-testid="searchButton"
                />
                <button data-testid="searchButton" onClick={this.onclicksearch}>
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            {this.renderJobListCase()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
