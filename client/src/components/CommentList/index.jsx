import '../../assets/styles/Johnstyle.css'

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <center><h3 className="Thread-title-comment">Be the first to comment!</h3></center>
  }

  return (
    <>
    <center>
      <h3
        className=""
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Thread's comments
      </h3>
      </center>
      <div className="">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="">
              <center>
              <div className="Comment-user">
                <h5 className="">
                  {comment.commentAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="">{comment.commentText}</p>
              </div>
              </center>
            </div>
          ))}
      </div>
    </>
  )
}

export default CommentList
