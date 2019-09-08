import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import { filter, mapTo, tap, ignoreElements } from 'rxjs/operators'

import * as core from './core'
import * as posts from './posts'

import { Epic } from 'redux-observable'

export interface Action {
  type: string
  payload?: any
  params?: any
}

export type RootState = {
  core: core.State
  posts: posts.State
}

// logger epic
const logger: Epic<Action, Action, RootState> = (action$, store$) =>
  action$.pipe(
    tap((action) => console.log(action, store$.value)),
    ignoreElements()
  )

// connected epics
const fetchInitialPosts: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(
      ({ type }) =>
        [
          core.constants.SET_INITIAL_STATE,
          posts.constants.SET_SUBREDDIT
        ].indexOf(type) !== -1
    ),
    mapTo({ type: posts.constants.FETCH_POSTS })
  )

const epics = combineEpics<Action, Action, RootState>(
  ...[...core.epics, ...posts.epics],
  logger,
  fetchInitialPosts
)

const reducer = combineReducers({
  [core.mountPoint]: core.reducer,
  [posts.mountPoint]: posts.reducer
})

const actions = {
  [core.mountPoint]: core.actions,
  [posts.mountPoint]: posts.actions
}

const selectors = {
  [core.mountPoint]: core.selectors,
  [posts.mountPoint]: posts.selectors
}

export { actions, selectors, epics, reducer }
