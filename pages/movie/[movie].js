import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ThumbUpIcon } from '@heroicons/react/outline'
import YouTube from 'react-youtube'
import Moment from 'react-moment'
import { render } from 'react-dom'

const Detail = ({ movie }) => {
  const router = useRouter()
  const [showTrailer, setShowTrailer] = useState(false)
  const [trailers, setTrailers] = useState([])
  const [featurettes, setFeaturettes] = useState([])

  const baseURL = 'https://image.tmdb.org/t/p/original'

  if (movie.adult) {
    router.push('/')
    return null
  }

  const {
    backdrop_path,
    poster_path,
    title,
    name,
    overview,
    release_date,
    first_air_date,
    vote_count,
    videos
  } = movie

  useEffect(() => {
    let trailerList = []
    if (videos?.results.length > 0) {
      videos.results.forEach((video) => {
        trailerList.push(video)
      })
    }
    setTrailers(trailerList)
    getFeaturettes()
  }, [])

  const getFeaturettes = () => {
    let featuretteList = []
    if (videos?.results.length > 0) {
      videos.results.forEach((video) => {
        if (video.type === 'Featurette') {
          featuretteList.push(video)
        }
      })
    }
    setFeaturettes(featuretteList)
  }

  const renderFeaturettes = () => {
    const options = {
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 1,
        controls: 0
      }
    }

    if (featurettes.length > 0) {
      return featurettes.map((video) => {
        console.log(video)
        return (
          <div className="max-w-screen mx-auto">
            <div className="w-[100%] aspect-w-16 aspect-h-9 bg-black">
              <YouTube
                videoId={video.key}
                opts={options}
                iframeClassName={'object-cover min-w-full h-[100%]'}
              />
            </div>
          </div>
        )
      })
    }
  }

  const getTrailer = () => {
    const options = {
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 1,
        controls: 0
      }
    }

    const officialTrailer = trailers.find(
      (video) => video.name === 'Official Trailer'
    )

    if (officialTrailer?.key && showTrailer) {
      return (
        <div className="bg-gray-900 select-none p-2  sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="w-[100%] aspect-w-16 aspect-h-9 bg-black">
            <YouTube
              videoId={officialTrailer.key}
              opts={options}
              iframeClassName={'object-cover min-w-full h-[100%]'}
            />
          </div>
        </div>
      )
    }

    if (!officialTrailer) {
      return (
        <div className="bg-gray-900 select-none p-2  sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="w-[240px] aspect-w-16 aspect-h-9 bg-black">
            <YouTube
              videoId={videos.results[0].key}
              opts={options}
              iframeClassName={'object-cover min-w-full h-[100%]'}
            />
          </div>
        </div>
      )
    }
  }

  return (
    <div className="p-3 bg-gray-800 text-white min-h-screen">
      <div className="flex p-1 pb-3 pt-0 justify-between items-center relative">
        <h1 className=" text-4xl  text-white font-semibold">{title || name}</h1>
        {trailers && (
          <button
            className="bg-black text-white border-white border px-8 py-4 text-lg hover:bg-white hover:text-black"
            onClick={() => setShowTrailer(!showTrailer)}
          >
            {showTrailer ? 'Close Trailer' : 'Play Trailer'}
          </button>
        )}
      </div>
      <div className=" bg-black max-w-[90%]] sm:max-w-full">
        {showTrailer ? (
          <div>{videos && getTrailer()}</div>
        ) : (
          <Image
            layout="responsive"
            src={`${baseURL}${backdrop_path || poster_path}`}
            width={1280}
            height={720}
          />
        )}
      </div>

      <div>{featurettes && renderFeaturettes()}</div>

      <div className="p-4">
        <p className=" text-base pb-2">{overview}</p>
        <p className="flex items-center ">
          {release_date || first_air_date}{' '}
          <ThumbUpIcon className="h-5 ml-3 mr-1" />
          {vote_count}
        </p>
      </div>
    </div>
  )
}

export default Detail

export async function getServerSideProps(context) {
  const id = context.query.movie

  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos&language=en-US`
  ).then((response) => response.json())

  return {
    props: {
      movie: request
    }
  }
}
