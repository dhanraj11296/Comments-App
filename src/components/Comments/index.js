import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }
  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }
  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }
  renderCommentsList = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        CommentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }
  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initialContainer ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }
  onChangeCommentInput = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }
  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }
  render() {
    const {nameInput, commentInput, commentsList} = this.state
    return (
      <div className="appContainer">
        <div className="commentsContainer">
          <h1 className="appHeading">Comments</h1>
          <div className="commentsInputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="formDescription">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="nameInput"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <textarea
                placeholder="Your Comment"
                className="commentInput"
                value={commentInput}
                onChange={this.onChangeCommentInput}
                rows="6"
              />
              <button type="submit" className="addButton">
                Add Comment
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="commentsCount">{commentsList.length}</span>
            Comments
          </p>
          <ul className="commentsList">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}
export default Comments
