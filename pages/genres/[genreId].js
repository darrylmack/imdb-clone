import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Results from '../../components/Results'

const apiKey = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

async function fetchFromTMDB(endpoint, params) {
  const url = new URL(`${BASE_URL}/${endpoint}`)
  url.search = new URLSearchParams({ ...params, api_key: apiKey })

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return response.json()
}

export async function getServerSideProps(context) {
  const { params } = context
  const genreId = params.genreId

  console.log('Genre ID', genreId)

  try {
    // Fetch movies and TV shows separately
    const moviesPromise = fetchFromTMDB('discover/movie', {
      with_genres: genreId
    })
    const tvShowsPromise = fetchFromTMDB('discover/tv', {
      with_genres: genreId
    })

    // Use Promise.all to handle both requests concurrently
    const [moviesData, tvShowsData] = await Promise.all([
      moviesPromise,
      tvShowsPromise
    ])

    return {
      props: {
        movies: moviesData.results,
        tvShows: tvShowsData.results
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        movies: [],
        tvShows: [],
        error: 'Failed to load data.'
      }
    }
  }
}

const Genre = ({ movies, tvShows, error }) => {
  const moviesWithType = movies.map((movie) => {
    movie.media_type = 'movie'
    return movie
  })

  const tvShowsWithType = tvShows.map((tvShow) => {
    tvShow.media_type = 'tv'
    return tvShow
  })

  const allContent = [...moviesWithType, ...tvShowsWithType]

  console.log('Movies', movies)
  console.log('TV Shows', tvShows)
  console.log('All Content: ', allContent)
  return (
    <div>
      {/* <Navbar
        searchMovies={searchMovies}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
      /> */}

      <Results results={allContent} />
    </div>
  )
}

export default Genre
