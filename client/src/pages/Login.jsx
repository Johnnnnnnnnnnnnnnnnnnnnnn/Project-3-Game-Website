import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'
import Auth from '../utils/auth'
import '../assets/styles/Johnstyle.css'

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error, data }] = useMutation(LOGIN_USER)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value,
    });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    console.log(formState)
    try {
      const { data } = await login({
        variables: { ...formState },
      })

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: '',
      password: '',
    })
  }

  return (
    <main className="">
      <div className="">
        <div className="">
          <center>
          <h1 className="">Login</h1>
          <div className="">
            {data ? (
              <p>
                Loading . . .
                <Link to="/">Click this link if this page doesnt work.</Link>
              </p>
            ) : (
              <form className="Login-form" onSubmit={handleFormSubmit}>
                <input
                  className="Signup-input"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="Signup-input"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="Signup-btn"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="">
                {error.message}
              </div>
            )}
          </div>
          </center>
        </div>
      </div>
    </main>
  )
}

export default Login
