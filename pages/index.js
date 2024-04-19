import Head from 'next/head'
import { useState } from 'react'

import Navbar from '../components/Navbar'
import Results from '../components/Results'
import requests from '../utils/requests'

export default function Home({ results }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const searchMovies = async () => {
    const finalURL = encodeURI(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
    )
    const request = await fetch(finalURL)
      .then((response) => response.json())
      .then((data) => filterMovies(data))
  }

  const filterMovies = (data) => {
    const movies = data.results.filter((movie) => movie.backdrop_path)
    setSearchResults(movies)
  }

  return (
    <div>
      <Head>
        <title>Influenced by IMDB</title>
        <meta
          name="description"
          content="Not IMDB - for demonstration purposes only"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        searchMovies={searchMovies}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
      />

      {searchResults?.length > 0 ? (
        <Results results={searchResults} />
      ) : (
        <Results results={results} />
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const genre = context.query.genre || 'fetchTrending'
  const request = await fetch(
    `https://api.themoviedb.org/3${requests[genre].url}&inlcude_adult=false`
  ).then((response) => response.json())

  return {
    props: {
      results: request.results
    }
  }
}
