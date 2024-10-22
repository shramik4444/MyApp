import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
  }

  onchangeusername = event => {
    this.setState({username: event.target.value})
  }

  onchangepassword = event => {
    this.setState({password: event.target.value})
  }

  onsubmitsuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    console.log('history----------->', history)
    history.replace('/')
  }

  onsubmitfailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onsubmitform = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      console.log(data)
      this.onsubmitsuccess(data.jwt_token)
    } else {
      this.onsubmitfailure(data.error_msg)
    }

    console.log(data)
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="bg-cont">
        <form className="login-cont" onSubmit={this.onsubmitform}>
          <div className="imgdiv">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="imgstyle"
              alt="website logo"
            />
          </div>
          <div>
            <label htmlFor="USERNAME">USERNAME</label>
            <input
              type="text"
              id="USERNAME"
              placeholder="username"
              onChange={this.onchangeusername}
            />
          </div>
          <div>
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={this.onchangepassword}
            />
          </div>
          <button type="submit">Login</button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
