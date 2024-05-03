import { useRouter } from 'next/router'
import requests from '../utils/requests'
import { SearchIcon, XIcon, MicrophoneIcon } from '@heroicons/react/solid'
import { useState } from 'react'

const Navbar = ({
  searchMovies,
  searchTerm,
  setSearchTerm,
  setSearchResults,
  setCurrentGenre
}) => {
  const router = useRouter()

  const navigateAndClear = (key) => {
    setSearchResults([])
    setSearchTerm('')
    setCurrentGenre(key)
    router.push(`?genre=${key}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm) {
      setCurrentGenre('search')
      searchMovies()
    }
  }

  return (
    <div className="flex flex-col sm:flex-row   justify-center items-center p-4  bg-gray-800 text-gray-300 select-none text-xl lg:text-2xl">
      <div className="flex pb-4 sm:pb-0 ">
        {Object.entries(requests).map(([key, { title, url }]) => (
          <h2
            onClick={() => navigateAndClear(key)}
            className="text-center p-3 sm:p-6 cursor-pointer hover:text-white active:text-red-400"
            key={key}
          >
            {title}
          </h2>
        ))}
      </div>
      <div className="flex pb-0 sm:ml-10">
        <form onSubmit={handleSubmit}>
          <div className="flex  flex-row  justify-center  items-center  ">
            <SearchIcon
              className="h-0 sm:h-6 text-yellow-500 mr-3 cursor-pointer hover:text-yellow-500 disabled:text-gray-400"
              onClick={handleSubmit}
            />

            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              className="flex  focus:outline-none rounded-full px-4 py-2 text-black "
              placeholder="Search for a show"
              value={searchTerm}
            />
            <XIcon
              className="h-0 sm:h-6 text-gray-500 cursor-pointer ml-2 hover:text-yellow-500 active:text-yellow-500"
              onClick={() => setSearchTerm('')}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Navbar
