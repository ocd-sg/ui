import * as React from 'react'
import { useContext } from 'react'

import { Post as TPost } from 'app/store'
import { Context } from 'app/store'

const Post = ({ post }: { post: TPost }) => (
  <li className='pb2'>
    <div className='f7 ttu fw6 text-normal-80'>{post.author}</div>
    <div className='f4 fw4'>{post.title}</div>
  </li>
)

const Posts = () => {
  const [ { posts } ] = useContext(Context)
  return (
    <ul className='pr2'>
      {posts.map((post) => <Post key={post.id} post={post} />)}
    </ul>
  )
}

export default Posts
