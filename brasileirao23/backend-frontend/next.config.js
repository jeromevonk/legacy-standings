module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api' // development api
      : 'https://brasileirao23.vercel.app/api' // production api
  }
}
