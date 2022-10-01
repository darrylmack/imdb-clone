const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export default {
  fetchTrending: {
    title: 'Trending',
    url: `/trending/all/week?api_key=${API_KEY}&language=en-US`
  },
  topRated: {
    title: 'Top Rated',
    url: `/movie/top_rated?api_key=${API_KEY}&language=en-US`
  },
  discover: {
    title: 'Discover',
    url: `/discover/movie?api_key=${API_KEY}&language=en-US`
  }
}
