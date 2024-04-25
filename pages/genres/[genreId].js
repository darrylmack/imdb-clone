import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import Results from '../../components/Results'
import { PAGE_TYPES } from 'next/dist/lib/page-types'

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
  const page = context.query.page || 1
  const genreId = params.genreId

  console.log('Genre ID', genreId)

  try {
    // Fetch movies and TV shows separately
    const moviesPromise = fetchFromTMDB('discover/movie', {
      with_genres: genreId, page
    })
    const tvShowsPromise = fetchFromTMDB('discover/tv', {
      with_genres: genreId, PAGE_TYPES
    })

    // Use Promise.all to handle both requests concurrently
    const [moviesData, tvShowsData] = await Promise.all([
      moviesPromise,
      tvShowsPromise
    ])

    return {
      props: {
        movies: moviesData.results,
        tvShows: tvShowsData.results,
        page: parseInt(page),
        totalPages: Math.max(moviesData.total_pages, tvShowsData.total_pages), // Get the maximum of pages between movies and TV shows,
    genreId
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        movies: [],
        tvShows: [],
        error: 'Failed to load data.',
        page: 1,
        totalPages: 0
      }
    }
  }
}

const Genre = ({ movies, tvShows, page, totalPages, genreId, error }) => {
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
    <div className="relative min-h-screen bg-gray-900">
         <Head>
        <title>Movies and TV Shows by Genre</title>
        <meta name="description" content="List of movies and TV shows by genre" />
      </Head>
      {/* <Navbar
        searchMovies={searchMovies}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
      /> */}
<section className='flex flex-wrap justify-center'>
<Results results={allContent} />
</section>

    

<div className="fixed inset-x-0 bottom-0 bg-gray-800/80 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-center">
          {page > 1 && (
            <Link href={`/genres/${genreId}?page=${page - 1}`} className="bg-gray-800 border border-w-2 border-gray-600 py-2 px-4 rounded-md mr-4 text-white  hover:bg-gray-200 hover:text-gray-900">Previous
            </Link>
          )}
          {page < totalPages && (
            <Link href={`/genres/${genreId}?page=${page + 1}`} className="bg-gray-800 border border-w-2 border-gray-600 py-2 px-8 rounded-md text-white hover:bg-gray-200 hover:text-gray-900">Next
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Genre
