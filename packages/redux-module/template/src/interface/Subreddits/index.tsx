import * as React from 'react'
import { connect } from 'react-redux'
import { actions, selectors } from 'app/store'

import { Subreddit as _Subreddit } from 'app/store/posts'
import { Action, RootState } from 'app/store'
import { Dispatch } from 'redux'

const handleClick = (callback: Function) => (subreddit: _Subreddit) => () =>
  callback(subreddit)

const Subreddit = ({
  subreddit,
  highlight,
  onSelect
}: {
  subreddit: _Subreddit
  highlight: boolean
  onSelect: (subbreddit: _Subreddit) => Action
}) => (
  <a
    className={['db pa1', highlight ? 'primary-100' : ''].join(' ')}
    onClick={handleClick(onSelect)(subreddit)}
  >
    {subreddit}
  </a>
)

const Subreddits = ({
  current,
  subreddits,
  onSelect
}: {
  current: _Subreddit
  subreddits: _Subreddit[]
  onSelect: (subbreddit: _Subreddit) => Action
}) => (
  <div className="pa3">
    {subreddits.map((subreddit) => (
      <Subreddit
        key={subreddit}
        subreddit={subreddit}
        highlight={current === subreddit}
        onSelect={onSelect}
      />
    ))}
  </div>
)

const getSubreddits = (): _Subreddit[] => [
  'singapore',
  'pcmasterrace',
  'reactjs'
]

const mapStateToProps = (store: RootState) => ({
  current: selectors.posts.getSubreddit(store),
  subreddits: getSubreddits()
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onSelect: (subreddit: _Subreddit) =>
    dispatch(actions.posts.setSubreddit(subreddit))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subreddits)
