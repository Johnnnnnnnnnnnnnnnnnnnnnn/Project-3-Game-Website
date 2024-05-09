import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../assets/styles/Johnstyle.css'

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="">
      <div className="">
        <div className="">
          <center>
          <h1 className="">Sign Up</h1>
          <div className="">
            {data ? (
              <p>
                Loading . . .
              </p>
            ) : (
              <form className="Signup-form" onSubmit={handleFormSubmit}>
                <input
                  className="Signup-input"
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
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
  );
};

export default Signup;
