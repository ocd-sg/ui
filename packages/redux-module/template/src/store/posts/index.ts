import { ajax } from 'rxjs/ajax'
import { concat, of } from 'rxjs'
import { filter, map, switchMap, takeUntil } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import {
  validatePostsRequest,
  composePostsRequest,
  parsePostsResponse
} from './utils'

import { Action, RootState } from 'app/store'
import { Epic } from 'redux-observable'

const mountPoint = 'posts'

const SET_SUBREDDIT = `@@reddit/${mountPoint}/SET_SUBREDDIT`
const CLEAR_POSTS = `@@reddit/${mountPoint}/CLEAR_POSTS`
const FETCH_POSTS = `@@reddit/${mountPoint}/FETCH_POSTS`
const LOADED_POSTS = `@@reddit/${mountPoint}/LOADED_POSTS`

const MINUTE_IN_MILLISECONDS = 60 * 1000

export type Subreddit = string

export type Post = {
  id: string
  author: string
  title: string
  text: string
}

export type Posts = Post[]

export type State = {
  subreddit: Subreddit
  posts: Posts
}

export const initialState: State = {
  subreddit: 'singapore',
  posts: []
}

// reducers
const setSubredditReducer = (state: State, action: Action): State => ({
  ...state,
  subreddit: action.payload
})

const clearPostsReducer = (state: State, action: Action): State => ({
  ...state,
  posts: []
})

const loadedPostsReducer = (state: State, action: Action): State => ({
  ...state,
  posts: action.payload
})

const reducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case SET_SUBREDDIT:
      return setSubredditReducer(state, action)
    case CLEAR_POSTS:
      return clearPostsReducer(state, action)
    case LOADED_POSTS:
      return loadedPostsReducer(state, action)
    default:
      return state
  }
}

// actions
const setSubreddit = (subreddit: string): Action => ({
  type: SET_SUBREDDIT,
  payload: subreddit
})
const clearPosts = (): Action => ({
  type: CLEAR_POSTS
})
const loadedPosts = (posts: Posts): Action => ({
  type: LOADED_POSTS,
  payload: posts
})

// epics
const fetchPosts: Epic<Action, Action, RootState> = (action$, store$) =>
  action$.pipe(
    ofType(FETCH_POSTS),
    map(() => store$.value),
    map(getSubreddit),
    filter(validatePostsRequest),
    map(composePostsRequest),
    switchMap((request) =>
      concat(
        of(clearPosts()),
        ajax({
          ...request,
          timeout: MINUTE_IN_MILLISECONDS
        }).pipe(
          takeUntil(action$.pipe(ofType(FETCH_POSTS))),
          map(({ response }) => response),
          map(parsePostsResponse),
          map(loadedPosts)
        )
      )
    )
  )

// selectors
const getSubreddit = (store: RootState): Subreddit =>
  store[mountPoint].subreddit
const getPosts = (store: RootState): Posts => store[mountPoint].posts

// exposed
export { mountPoint }

export const constants = {
  SET_SUBREDDIT,
  FETCH_POSTS,
  LOADED_POSTS
}

export const actions = {
  setSubreddit
}

export const epics = [fetchPosts]

export const selectors = {
  getSubreddit,
  getPosts
}

export { reducer }

export const reducers = {
  setSubredditReducer,
  loadedPostsReducer
}
