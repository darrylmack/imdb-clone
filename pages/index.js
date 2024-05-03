import { useState, useEffect } from 'react'

import Navbar from '../components/Navbar'
import Results from '../components/Results'
import requests from '../utils/requests'
import Pagination from '../components/Pagination'

const apiKey = process.env.NEXT_PUBLIC_API_KEY

export default function Home({ results }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(results || [])
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 20 // This might be unused if you are doing all pagination through the API

  useEffect(() => {
    searchMovies() // Call on mount and whenever currentPage changes
  }, [currentPage]) // Dependency on currentPage ensures re-fetch on change

  const searchMovies = async () => {
    const finalURL = encodeURI(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=${currentPage}&include_adult=false`
    )
    const request = await fetch(finalURL)
      .then((response) => response.json())
      .then((data) => {
        const movies = data.results.filter((movie) => movie.backdrop_path)
        setSearchResults(movies)
      })
      .catch((err) => {
        console.error('Failed to fetch movies:', err)
        setSearchResults([]) // Handle errors by setting searchResults to empty or showing an error message
      })
  }

  const onNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1)
    console.log('Next page')
  }

  const onPreviousPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))
    console.log('Previous page')
  }

  console.log('Current page:', currentPage)
  return (
    <div>
      <Navbar
        searchMovies={searchMovies}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="pb-14">
        <Results results={searchResults.length > 0 ? searchResults : results} />
      </div>
      <div className="fixed inset-x-0 bottom-0 bg-gray-800 shadow-md">
        <Pagination
          currentPage={currentPage}
          totalResults={searchResults.length}
          resultsPerPage={resultsPerPage}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const genre = context.query.genre || 'fetchTrending'
  const page = context.query.page || 1
  let results = null

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3${requests[genre].url}&page=${page}&include_adult=false`
    )
    const data = await response.json()
    results = data.results
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return {
    props: {
      results,
      currentPage: Number(page)
    }
  }
}
