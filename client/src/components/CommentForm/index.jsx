import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ADD_COMMENT } from '../../utils/mutations'
import Auth from '../../utils/auth'
import '../../assets/styles/Johnstyle.css'

const CommentForm = ({ threadId }) => {
  const [commentText, setCommentText] = useState('')
  const [addComment, { error }] = useMutation(ADD_COMMENT)

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          threadId,
          commentText,
          commentAuthor: Auth.getProfile().authenticatedPerson.username
        },
      });

      setCommentText('')
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value)
    }
  }

  return (
    <div className="Comment-logout">
      {Auth.loggedIn() ? (
        <>
          <form
            className=""
            onSubmit={handleFormSubmit}
          >
            <div className="">
              <center>
              <textarea
                name="commentText"
                placeholder="Type your comment here"
                value={commentText}
                className="Comment-box"
                style={{ lineHeight: '3.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
              </center> 
            </div>

            <div className="">
              <center>
              <button className="Signup-btn" type="submit">
                Add Comment
              </button>
              </center>
            </div>
          </form>
        </>
      ) : (
        <center><p>
          You need to be logged in to share your Threads. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
        </center>
      )}
    </div>
  )
}

export default CommentForm
