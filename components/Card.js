import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Moment from 'react-moment'
import { useRouter } from 'next/router'
import {  HeartIcon, FilmIcon } from '@heroicons/react/outline'



import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { genres } from '../utils/genres'

const TvIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
</svg>

  )
}

const Card = ({ result }) => {
  const router = useRouter()
  const baseURL = 'https://image.tmdb.org/t/p/original'
  const { media_type } = result

  const goToDetail = () => {
    if(media_type === 'movie') {
      router.push(`/movie/${result.id}`)
    } else {
      router.push(`/tv/${result.id}`)
    }

  }

  const renderGenres = () => {
    return (
      <div>
        {result.genre_ids
          .map((genreId) => {
            const genre = genres.find(g => g.id === genreId);
            return genre ? (
              <Fragment key={genreId}>
                <Link className='text-gray-300 hover:text-yellow-200 underline underline-offset-3 ' href={`/genres/${genreId}`}>{genre.name}</Link>
              </Fragment>
            ) : null;
          })
          .filter(genre => genre !== null)
          .slice(0, 3)
          .reduce((prev, curr) => [prev, ', ', curr])}
      </div>
    );
  };
  
  



const vote_average = result.vote_average.toFixed(1)
  return (
    <div className="mb-4  sm:mb-0 p-2 text-gray-300   active:text-red-400 ">
      <Image
      className='cursor-pointer'
        onClick={goToDetail}
        aspectratio={500 / 750}
        src={`${baseURL}${result.poster_path}`}
        width={500}
        height={750}
        alt={result.title || 'image'}
      />
      <div className="p-2">
        {/* <h2 className="text-lg font-bold">{result.title || result.name}</h2> */}
        {/* <p className="truncate text-md font-light">{result.overview}</p> */}


        <div className="flex justify-between align-center font-light py-1">
          <div className='flex border-gray-500 border-2 rounded-md px-2 py-1'>IMDb:<p className=' pl-1 font-semibold'>{vote_average}</p></div>
          { true ?         <HeartIconSolid className="h-5 text-red-400 ml-4 mr-0" /> : <HeartIcon className="h-5 ml-3 mr-1"/>}
          <div>{media_type === 'movie' ? 'Film': 'TV'}</div>
      
        </div>
        <div className='flex '>{renderGenres()}</div>

      </div>
    </div>
  )
}

export default Card
