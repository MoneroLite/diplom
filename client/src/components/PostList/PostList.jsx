 import { observer } from 'mobx-react-lite'

import React, { useContext, useEffect } from 'react'
import { fetchPost } from '../../http/postAPI'
// import { useParams } from 'react-router-dom'
import { Context } from '../../index'
import PostItem from '../PostItem/PostItem'

const PostList = observer(({posts}) => {
 
 

    // const {post} = useContext(Context)
    // useEffect(() => {
    //   // fetchOneCategory(id).then(data => setCategory(data))
    //   fetchPost().then(data => post.setPost(data))
    // }, [])
    // console.log(post.post)
    // const {category} = useContext(Context)
    // ид категории
    // const {id} = useParams()


    //  const posts = post.post.filter(post => post.categoryId === Number(id))
  console.log(posts.length)

   if (posts.length) return (
    posts.map(post => 
                <PostItem  key={post.id} post={post} />
                )
    )
    
    return (
      <div className='no__post'>Тут пока нет постов</div>
    )
    

  // return (
  //     <div>
  //       {posts.length ?

  //        posts.map(post => 
  //           <PostItem  key={post.id} post={post} />
  //           )
  //            :
  //           <div>Тут пока нет постов</div>  }
  //   </div>
  // )
})

export default PostList