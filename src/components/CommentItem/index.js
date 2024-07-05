import {formatDistanceToNow} from 'date-fns'
import './index.css'
const CommentItem = props => {
  const {CommentDetails} = props
  const {id, name, comment, isLiked, initialClassName, date} = CommentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'button active' : 'button'
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }
  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }
  return (
    <li className="commentItem">
      <div className="commentContainer">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="usernameTimeContainer">
            <p className="username">{name}</p>
            <p className="time">{postedTime}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttonContainer">
        <div className="likeContainer">
          <img src={likeImageUrl} alt="like" className="likeImage" />
          <button
            className={likeTextClassName}
            type="button"
            onClick={onClickLike}
          >
            Like
          </button>
        </div>
        <button
          className="button"
          type="button"
          onClick={onDeleteComment}
          data-testid="delete"
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="commentLine" />
    </li>
  )
}
export default CommentItem
