import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import NavBar from '../NavBar'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')

  return (
    <div className="home-bg">
      <NavBar />
      <div className="info-bg">
        <h1>
          Find the Job that <br />
          fits your Life
        </h1>
        <p>
          Millions of people are searching for <br /> jobs,salary,information,
          company reviews. Find the jobs that fit your
        </p>
        <Link to="/jobs">
          <button className="btn">Find Jobs</button>
        </Link>
      </div>
    </div>
  )
}
export default Home
