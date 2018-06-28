import * as React from 'react'
import { connect } from 'react-redux'
import { selectors } from 'app/store'

import { Post as _Post, Posts as _Posts } from 'app/store/posts'
import { RootState } from 'app/store'

const Post = ({ post }: { post: _Post }) => (
  <li className="pb2">
    <div className="f7 ttu fw6 text-normal-80">{post.author}</div>
    <div className="f4 fw4">{post.title}</div>
  </li>
)

const Posts = ({ posts }: { posts: _Posts }) => (
  <ul className="pr2">
    {posts.map((post) => <Post key={post.id} post={post} />)}
  </ul>
)

const mapStateToProps = (store: RootState) => ({
  posts: selectors.posts.getPosts(store)
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
