import { Link } from 'react-router-dom'
import '../../assets/styles/Johnstyle.css'

const ThreadList = ({
  threads,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!threads.length) {
    return <center><h3>No Thread Yet</h3></center>
  }

  return (
    <div className='Thread-body'>
      {showTitle && <h3 className="Threads-title">{title}</h3>}
      {threads &&
        threads.map((thread) => (
          <div key={thread._id} className="test">
            <h4 className="">
              {showUsername ? (
                <div
                  className="Thread-title"
                  to={`/profiles/${thread.threadAuthor}`}
                >
                  {thread.threadAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    {thread.createdAt}
                  </span>
                </div>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    {thread.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="">
              <p>{thread.threadText}</p>
            </div>
            <Link
              className="Signup-btn"
              to={`/threads/${thread._id}`}
            >
              <button className="Signup-btn">Open Thread</button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThreadList;
