import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ADD_THREAD } from '../../utils/mutations'
import { QUERY_THREADS, QUERY_ME } from '../../utils/queries'
import Auth from '../../utils/auth'
import Notlogin from './Notlogin'

const ThreadForm = () => {
  const [threadText, setThreadText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addThread, { error }] = useMutation
  (ADD_THREAD, {
    refetchQueries: [
      QUERY_THREADS,
      'getThreads',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addThread({
        variables: {
          threadText,
          threadAuthor: Auth.getProfile().authenticatedPerson.username
        },
      });

      setThreadText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'threadText' && value.length <= 280) {
      setThreadText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>

      {Auth.loggedIn() ? (
        <>
          <center><h3>What Thread Would You Like to Post Today?</h3></center>
          <form
            className="Thread-form"
            onSubmit={handleFormSubmit}
          >
            <div className="">
              <center>
              <textarea
                name="threadText"
                placeholder="Enter the content of your thread here."
                value={threadText}
                className="Comment-box"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
              </center>
            </div>

            <div className="">
              <center>
              <button className="Signup-btn" type="submit">
                Post Thread
              </button>
              </center>
            </div>
            {error && (
              <div className="">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ThreadForm;
