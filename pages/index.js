import { useState, useEffect } from 'react'

import Navbar from '../components/Navbar'
import Results from '../components/Results'
import requests from '../utils/requests'
import Pagination from '../components/Pagination'

const apiKey = process.env.NEXT_PUBLIC_API_KEY

export default function Home({ initialResults, initialGenre, initialPage }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(initialResults || [])
  const [currentPage, setCurrentPage] = useState(initialPage || 1)
  const [totalPages, setTotalPages] = useState(0)
  const [currentGenre, setCurrentGenre] = useState(
    initialGenre || 'fetchTrending'
  )
  const resultsPerPage = 20 // This might be unused if you are doing all pagination through the API

  useEffect(() => {
    searchMovies(currentGenre) // Fetch movies based on current genre or search term
  }, [currentPage, currentGenre]) // Dependency on currentPage and currentGenre

  const searchMovies = async (genre) => {
    const endpoint = searchTerm ? `/search/multi` : requests[genre].url
    const query = searchTerm ? `&query=${encodeURI(searchTerm)}` : ''
    const finalURL = `https://api.themoviedb.org/3${endpoint}?api_key=${apiKey}&language=en-US&page=${currentPage}&include_adult=false${query}`

    const response = await fetch(finalURL)
    const data = await response.json()
    if (data.results) {
      const movies = data.results.filter((movie) => movie.backdrop_path)
      setSearchResults(movies)
      setTotalPages(data.total_pages)
    } else {
      setSearchResults([])
    }
  }

  const handleGenreChange = (newGenre) => {
    setCurrentGenre(newGenre)
    setCurrentPage(1) // Reset to page 1 for new genre
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
        searchMovies={() => searchMovies('search')}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCurrentGenre={setCurrentGenre}
        setSearchResults={setSearchResults}
      />
      <div className="pb-14">
        <Results
          results={searchResults.length > 0 ? searchResults : initialResults}
        />
      </div>
      <div className="fixed inset-x-0 bottom-0 bg-gray-800 shadow-md">
        <Pagination
          currentPage={currentPage}
          totalResults={searchResults.length}
          resultsPerPage={resultsPerPage}
          totalPages={totalPages}
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

  const response = await fetch(
    `https://api.themoviedb.org/3${requests[genre].url}&page=${page}&include_adult=false`
  )
  const data = await response.json()

  return {
    props: {
      initialResults: data.results || [],
      initialGenre: genre,
      initialPage: Number(page)
    }
  }
}
