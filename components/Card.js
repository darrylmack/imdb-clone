import Image from 'next/image'
import Moment from 'react-moment'
import { useRouter } from 'next/router'
import { ThumbUpIcon } from '@heroicons/react/outline'

const Card = ({ result }) => {
  const router = useRouter()
  const baseURL = 'https://image.tmdb.org/t/p/original'
  const goToDetail = () => {
    if (result.media_type) {
      if (result.media_type === 'movie') {
        router.push(`/movie/${result.id}`)
      } else {
        router.push(`/tv/${result.id}`)
      }
    }

    router.push(`/movie/${result.id}`)
  }

  return (
    <div className="mb-4  sm:mb-0 p-2 text-gray-300 cursor-pointer hover:text-white  active:text-red-400 ">
      <Image
        onClick={goToDetail}
        layout="responsive"
        src={`${baseURL}${result.poster_path}`}
        width={500}
        height={750}
        alt={result.title}
      />
      <div className="p-2">
        <h2 className="text-lg font-bold">{result.title || result.name}</h2>
        <p className="truncate text-md font-light">{result.overview}</p>

        <p className="flex items-center font-light ">
          <Moment parse="YYYY-MM-DD" format="M/DD/YYYY">
            {result.release_date || result.first_air_date}
          </Moment>

          <ThumbUpIcon className="h-5 ml-3 mr-1" />
          {result.vote_count}
        </p>
      </div>
    </div>
  )
}

export default Card
