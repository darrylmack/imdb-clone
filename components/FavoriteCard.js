import Image from 'next/image'
import { useRouter } from 'next/router'


const Card = ({ result }) => {
  const router = useRouter()
  const baseURL = 'https://image.tmdb.org/t/p/original'
  const goToDetail = () => {
console.log(result.id)
router.push(`/movie/${result.id}`)
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


        <div className="flex justify-between font-light ">
    


        </div>

      </div>
    </div>
  )
}

export default Card
