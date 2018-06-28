import Config from 'app/config'
import { Post, Posts } from 'app/store/posts'

type Request = {
  url: string
  method: 'GET' | 'POST'
  crossDomain: boolean
  responseType: 'json'
}

export const validatePostsRequest = (): boolean => true

export const composePostsRequest = (subreddit: string): Request => ({
  url: `${Config.api}/r/${subreddit}.json?limit=50`,
  crossDomain: true,
  responseType: 'json',
  method: 'GET'
})

const parsePost = ({
  data: { id, author, title, selftext: text }
}: {
  data: any
}): Post => ({
  id,
  author,
  title,
  text
})

export const parsePostsResponse = ({
  data: { children }
}: {
  data: any
}): Posts => children.map(parsePost)
