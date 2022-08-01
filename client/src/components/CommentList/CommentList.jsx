import React from 'react'
import CommentItem from '../CommentItem/CommentItem'

const CommentList = ({changePost, post}) => {
  return (
    <div>
        
        {post.comments.map(comment => 
        // console.log(comment)
            <CommentItem changePost={changePost} key={comment.id} comment={comment}/>
            )}
    </div>
  )
}

export default CommentList