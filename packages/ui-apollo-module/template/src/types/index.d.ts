export type Action = {
  type: string
  payload?: any
}

export type State = {
  subreddit: Subreddit
  posts: Posts
}

export type Subreddit = string

export type Post = {
  id: string
  author: string
  title: string
  text: string
}
export type Posts = Post[]
