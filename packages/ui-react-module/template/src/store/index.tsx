import * as React from 'react'
import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'

import { Action, State, Subreddit, Post, Posts } from 'app/types'

export const Context = createContext()
export const Consumer = Context.Consumer

const initialState: State = {
  subreddit: 'singapore',
  posts: []
}

const setSubredditReducer = (state: State, action: Action): State => ({ ...state, subreddit: action.payload })
const setPostsReducer = (state: State, action: Action): State => ({ ...state, posts: action.payload })
const clearPostsReducer = (state: State, action: Action): State => ({ ...state, posts: [] })

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_SUBREDDIT':
      return setSubredditReducer(state, action)
    case 'SET_POSTS':
      return setPostsReducer(state, action)
    case 'CLEAR_POSTS':
      return clearPostsReducer(state, action)
    default:
      return state
  }
}

export const setSubreddit = (subreddit: Subreddit): Action => ({ type: 'SET_SUBREDDIT', payload: subreddit })
export const setPosts = (posts: Posts): Action => ({ type: 'SET_POSTS', payload: posts })
export const clearPosts = (): Action => ({ type: 'CLEAR_POSTS' })

const Provider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const { subreddit } = state

  useEffect(() => {
    dispatch(clearPosts())
    axios({
      method: 'get',
      url: `https://api.reddit.com/r/${subreddit}.json?limit=50`
    })
    .then((response) => response.data.data.children)
    .then((data) => data.map(transform))
    .then((posts) => dispatch(setPosts(posts)))
    function transform ({ data }): Post {
      return {
        id: data.id,
        author: data.author,
        title: data.title,
        text: data.selfText
      }
    }
  }, [subreddit])

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
}

export default Provider
