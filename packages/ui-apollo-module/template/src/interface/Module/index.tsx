import * as React from 'react'

import Countries from 'app/interface/Countries'
import Jobs from 'app/interface/Jobs'

const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: '1fr 3fr',
    alignItem: 'stretch',
    justifyItems: 'stretch'
  },
  subreddits: {
    gridColumn: '1 / 2'
  },
  posts: {
    gridColumn: '2 / 3'
  }
}

const Module = () => (
  <div className="w-100 h-100" style={styles.wrapper}>
    <div
      className="br b--background-80 flex flex-column flex-auto"
      style={styles.subreddits}
    >
      <Countries />
    </div>
    <div
      className="flex flex-column flex-auto overflow-auto"
      style={styles.posts}
    >
      <Jobs />
    </div>
  </div>
)

export default Module
