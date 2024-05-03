import { useState } from 'react'

import Navbar from '../components/Navbar'
import Results from '../components/Results'
import requests from '../utils/requests'
import Pagination from '../components/Pagination'

const apiKey = process.env.NEXT_PUBLIC_API_KEY

export default function Home({ results }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 20

  const searchMovies = async () => {
    const finalURL = encodeURI(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
    )
    const request = await fetch(finalURL)
      .then((response) => response.json())
      .then((data) => filterMovies(data))
  }

  const filterMovies = (data) => {
    const movies = data.results.filter((movie) => movie.backdrop_path)
    setSearchResults(movies)
  }

  const handlePageChange = () => {
    const indexOfLastResult = currentPage * resultsPerPage
    const indexOfFirstResult = indexOfLastResult - resultsPerPage
    return searchResults.slice(indexOfFirstResult, indexOfLastResult)
  }

  const onNextPage = () => {
    setCurrentPage(currentPage + 1)
    console.log('Current Page:', currentPage)
  }

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1)
    console.log('Current Page:', currentPage)
  }

  return (
    <div>
      <Navbar
        searchMovies={searchMovies}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
      />
      <div className=" pb-14">
        {searchResults?.length > 0 ? (
          <Results results={searchResults} />
        ) : (
          <Results results={results} />
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 bg-gray-800 shadow-md">
        <Pagination
          currentPage={currentPage}
          totalResults={searchResults.length}
          resultsPerPage={resultsPerPage}
          onPageChange={handlePageChange}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const genre = context.query.genre || 'fetchTrending'
  let results = null

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3${requests[genre].url}&include_adult=false`
    )

    const data = await response.json()
    results = data.results
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return {
    props: {
      results: results || []
    }
  }
}
