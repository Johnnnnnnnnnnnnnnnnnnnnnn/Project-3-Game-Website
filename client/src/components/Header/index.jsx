import { Link } from 'react-router-dom'
import Auth from '../../utils/auth'
import controller from '../../assets/images/controller.jpg'
import controller2 from '../../assets/images/controller2.png'
import '../../assets/styles/Johnstyle.css'

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="">
      <div className="Header">
        <div>
          <Link className="Logo" to="/about">
            <img className="Logo-image" src={controller2} alt="John Logo"/>
            <h1 className="">John Games</h1>
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
            <div className=''>
              <div className='Navbar'>
                <Link className="List-item" to="/">
                  <h4>Home</h4>
                </Link>
                <Link className="List-item" to="/home">
                  <h4>Thread</h4>
                </Link>
                <Link className="List-item" to="/me">
                  {Auth.getProfile().authenticatedPerson.username}
                </Link>
                <p className="List-item" onClick={logout}>
                  Logout
                </p>
              </div>
            </div>
            </>
          ) : (
            <>
            <div className='Navbar'>
              <Link className="List-item" to="/">
                <h4>Home</h4>
              </Link>
              <Link className="List-item" to="/home">
                <h4>Thread</h4>
              </Link>
              <Link className="List-item" to="/signup">
                <h4>Sign-Up</h4>
              </Link>
              <Link className="List-item" to="/login">
                <h4>Login</h4>
              </Link>
            </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
