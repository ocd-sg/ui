import * as React from 'react'
import { useContext } from 'react'

import { Subreddit as TSubreddit } from 'app/types'
import { Context, setSubreddit } from 'app/store'

const Subreddit = ({
  subreddit,
  highlight,
  onClick
}: {
  subreddit: TSubreddit
  highlight: boolean
  onClick: Function
}) => (
  <a
    className={['db pa1', highlight ? 'b' : ''].join(' ')}
    onClick={onClick}
  >
    {subreddit}
  </a>
)

const Subreddits = () => {
  const [ { subreddit }, dispatch ] = useContext(Context)
  const subreddits = ['singapore', 'reactjs', 'headphones']
  const handleSelect = (subreddit) => () => dispatch(setSubreddit(subreddit))

  return (
    <div className='pa3'>
      {subreddits.map((_subreddit) => (
        <Subreddit
          key={_subreddit}
          subreddit={_subreddit}
          highlight={_subreddit === subreddit}
          onClick={handleSelect(_subreddit)}
        />
      ))}
    </div>
  )
}

export default Subreddits
