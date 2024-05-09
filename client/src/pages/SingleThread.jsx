import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import { QUERY_SINGLE_THREAD } from '../utils/queries'
import '../assets/styles/Johnstyle.css'

const SingleThread = () => {
  const { threadId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_THREAD, {
    variables: { threadId: threadId },
  })

  const thread = data?.thread || {};

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="Comment-form">
      <div className="">
        <blockquote
          className="Thread-block"
          style={{
            background: 'lightCoral',
            fontSize: '1.5rem',
            fontStyle: '',
            border: '2px solid #1a1a1a',
            lineHeight: '1.5',
            padding: '20px'
          }}
        >
          <h3 className="Thread-title-comment">
          {thread.threadAuthor} <br />
          <span style={{ fontSize: '1rem' }}>
            {thread.createdAt}
          </span>
          </h3>
          {thread.threadText}
        </blockquote>
      </div>

      <div className="">
        <CommentList comments={thread.comments} />
      </div>
      <div className="">
        <CommentForm threadId={thread._id} />
      </div>
    </div>
  )
}

export default SingleThread
