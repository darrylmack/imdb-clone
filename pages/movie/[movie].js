import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ThumbUpIcon } from '@heroicons/react/outline'

import { db, auth } from '../../utils/firebase'
import MediaPlayer from '../../components/MediaPlayer'

import ImageViewer from '../../components/MediaPlayer'
import FeatureList from '../../components/FeatureList'

const Detail = ({ movie }) => {
  const router = useRouter()
  const user = auth.currentUser

  const [uid, setUid] = useState('')
  const [showTrailer, setShowTrailer] = useState(false)
  const [showImage, setShowImage] = useState(true)
  const [showVideo, setShowVideo] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)
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
    videos,
    id
  } = movie

  useEffect(() => {

    setUid(user?.uid)
  }, [user])

  useEffect(() => {
    setShowImage(true)
    setShowVideo(false)
  }, [])

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

  const handlePlayVideo = (key) => {
    setCurrentFeature(key)
    setShowImage(false)
    setShowVideo(true)
  }

  const getTrailer = () => {
    let trailer = trailers.find((video) => video.name === 'Official Trailer')
    setShowTrailer(!showTrailer)
    return trailer.key
  }

  const playTrailer = () => {
    if (showTrailer) {
      setShowImage(true)
      setShowVideo(false)
      setShowTrailer(false)
    } else {
      handlePlayVideo(getTrailer())
      setShowTrailer(true)
    }
  }

  const addMovie = async () => {
    const uid = user.uid
    try {
      await db.collection('users').doc(uid).collection('movies').add({
        backdrop_path,
        poster_path,
        title,
id
      })
    } catch (error) {
      console.error(error.message)
    }
  }


  return (
    <div className="p-3 bg-gray-900 text-white min-h-screen">
      <MediaPlayer
        baseURL={baseURL}
        backdrop_path={backdrop_path}
        poster_path={poster_path}
        videoId={currentFeature}
        showImage={showImage}
        showVideo={showVideo}
      />

      <div className="flex p-1 pb-3 pt-0 justify-between items-center relative bg-gray-900">
        <h1 className=" text-4xl  text-white font-semibold">{title || name}</h1>
        {trailers && (
          <button
            className="bg-black text-white border-white border px-8 py-4 text-lg hover:bg-white hover:text-black"
            onClick={playTrailer}
          >
            {showTrailer ? 'Close Trailer' : 'Play Trailer'}
          </button>
        )}
         <button
            className="bg-black text-white border-white border px-8 py-4 text-lg hover:bg-white hover:text-black"
            onClick={addMovie}
          >
            Add to Favorites
          </button>
      </div>

      <div className="p-4">
        <p className=" text-base pb-2">{overview}</p>
        <p className="flex items-center ">
          {release_date || first_air_date}{' '}
          <ThumbUpIcon className="h-5 ml-3 mr-1" />
          {vote_count}
        </p>
      </div>

      <FeatureList features={features} playVideo={handlePlayVideo} />
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
