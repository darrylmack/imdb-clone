import { Fragment } from 'react'
import Image from 'next/image'
import Moment from 'react-moment'
import { useRouter } from 'next/router'
import { ThumbUpIcon, HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { genres } from '../utils/genres'

const Card = ({ result }) => {
  const router = useRouter()
  const baseURL = 'https://image.tmdb.org/t/p/original'
  const goToDetail = () => {

    const { media_type } = result

    switch (media_type) {
      case 'tv':
        router.push(`/tv/${result.id}`)
      case 'movie':
        router.push(`/movie/${result.id}`)
        break

      default:
        break
    }
  }

 

  const renderGenres = () => {
    return (
      <div>
        {result.genre_ids.map((genreId, index, array) => {
          // Find the genre in the genres array
          const genre = genres.find(g => g.id === genreId);
          return (
            <Fragment key={genreId}>
              <a href={`/genres/${genreId}`}>{genre ? genre.name : 'Unknown'}</a>
              {index !== array.length - 1 && ', '}
            </Fragment>
          );
        })}
      </div>
    );
  };
  

console.log('RESULT:', result)

const vote_average = result.vote_average.toFixed(1)
  return (
    <div className="mb-4  sm:mb-0 p-2 text-gray-300 cursor-pointer hover:text-white  active:text-red-400 ">
      <Image
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
        </div>
        <div className='flex'>{renderGenres()}</div>

      </div>
    </div>
  )
}

export default Card
