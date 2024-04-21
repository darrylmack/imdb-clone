import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ThumbUpIcon } from '@heroicons/react/outline'

import MediaPlayer from '../../components/MediaPlayer'

import ImageViewer from '../../components/MediaPlayer'
import FeatureList from '../../components/FeatureList'

const Detail = ({ movie }) => {
  const router = useRouter()
  const [showTrailer, setShowTrailer] = useState(false)
  const [trailers, setTrailers] = useState([])
  const [features, setFeatures] = useState([])

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
    getFeatures()
  }, [])

  const getFeatures = () => {
    let featuretteList = []
    if (videos?.results.length > 0) {
      videos.results.forEach((video) => {
        if (video.type === 'Featurette') {
          featuretteList.push(video)
        }
      })
    }
    setFeatures(featuretteList)
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
    <div className="p-3 bg-gray-900 text-white min-h-screen">
      <div className=" bg-black max-w-[90%]] sm:max-w-full border-gray-700 border-t-2 border-b-2 mb-4">
        {showTrailer ? (
          <div>{videos && getTrailer()}</div>
        ) : (
          <ImageViewer
            baseURL={baseURL}
            backdrop_path={backdrop_path}
            poster_path={poster_path}
          />
        )}
      </div>

      <div className="flex p-1 pb-3 pt-0 justify-between items-center relative bg-gray-900">
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

      <div className="p-4">
        <p className=" text-base pb-2">{overview}</p>
        <p className="flex items-center ">
          {release_date || first_air_date}{' '}
          <ThumbUpIcon className="h-5 ml-3 mr-1" />
          {vote_count}
        </p>
      </div>

      <FeatureList features={features} />
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
