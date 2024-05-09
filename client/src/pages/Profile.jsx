import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import ThreadForm from '../components/ThreadForm'
import ThreadList from '../components/ThreadList'
import { QUERY_USER, QUERY_ME } from '../utils/queries'
import Auth from '../utils/auth'
import '../assets/styles/Johnstyle.css'

const Profile = () => {
  const { username: userParam } = useParams()

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  })

  const user = data?.me || data?.user || {}
  if (
    Auth.loggedIn() && 
    Auth.getProfile().authenticatedPerson.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 className="Logout-message">
        Please login to your profile to view your Thread.
      </h4>
    )
  }

  return (
    <div>
      <div className="">
        <center>
          <h2 className="">
            Your Thread:
          </h2>
        </center>
        <div className="">
          <ThreadList
            threads={user.threads}
            title={`${user.username}'s threads...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className=""
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <ThreadForm />
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile;
