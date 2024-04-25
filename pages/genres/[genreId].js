
import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Results from '../../components/Results'
import requests from '../../utils/requests'

const apiKey = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getServerSideProps(context) {
const {params} = context
const genreId = params.genreId;
console.log('GENRE ID:', genreId)

const url = `${BASE_URL}/discover/tv?api_key=${apiKey}&with_genres=${genreId}`;
 

  try {
    const response = await fetch(url)

    const data = await response.json()
    return {
      props: { movies: data.results }, // Send the movies to the page as props
    };
  } catch (error) {
    console.error('Error fetching data:', error)
    return { props: { movies: [] } }; // Send empty array if there's an error
 
  }


}

export default function Home({ movies }) {


  return (
    <div>
      

      {/* <Navbar
        searchMovies={searchMovies}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
      /> */}

  
        <Results results={movies} />
      
    </div>
  )
}


