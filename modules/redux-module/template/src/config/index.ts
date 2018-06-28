const config = {
  api:
    process.env.NODE_ENV === 'production'
      ? 'https://api.reddit.com'
      : 'https://api.reddit.com'
}

export default config
