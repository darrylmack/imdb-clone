import { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Moment from 'react-moment'
import { useRouter } from 'next/router'
import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'

import { useAuth } from '../context/AuthContext'
import { db } from '../utils/firebase'
import { genres } from '../utils/genres'

const Card = ({ result }) => {
  const router = useRouter()
  const { currentUser } = useAuth()
  const baseURL = 'https://image.tmdb.org/t/p/original'
  const { media_type } = result
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    getFavoriteStatus()
  }, [])

  const goToDetail = () => {
    if (media_type === 'movie') {
      router.push(`/movie/${result.id}`)
    } else {
      router.push(`/tv/${result.id}`)
    }
  }

  const getFavoriteStatus = async () => {
    if (!currentUser) return
    const userRef = db.collection('users').doc(currentUser.uid) // get a reference to the user document
    const favoritesRef = userRef.collection('favorites') // get a reference to the favorites collection

    const snapshot = await favoritesRef.get()

    const favorites = snapshot.docs.map((doc) => doc.data())

    const favorite = favorites.find((f) => f.id === result.id)
    if (favorite) {
      setIsFavorite(true)
    }
  }

  const addFavorite = async () => {
    const favorite = {
      id: result.id,
      title: result.title || result.name,
      media_type: result.media_type,
      poster_path: result.poster_path,
      backdrop_path: result.backdrop_path,
      vote_average: result.vote_average,
      overview: result.overview,
      release_date: result.release_date || result.first_air_date,
      genres: result.genre_ids
    }
    const userRef = db.collection('users').doc(currentUser.uid) // get a reference to the user document
    const favoritesRef = userRef
      .collection('favorites')
      .doc(String(favorite.id)) // get a reference to the favorite document

    await favoritesRef.set(favorite) // set the favorite document
  }

  const removeFavorite = async () => {
    const userRef = db.collection('users').doc(currentUser.uid) // get a reference to the user document
    const favoritesRef = userRef.collection('favorites').doc(String(result.id)) // get a reference to the favorite document

    await favoritesRef.delete() // delete the favorite document
  }

  const setFavoriteStatus = () => {
    if (!currentUser) {
      alert('Please sign in to add to favorites')
      return
    }
    if (isFavorite) {
      setIsFavorite(false)
      removeFavorite()
    } else {
      setIsFavorite(true)
      addFavorite()
    }
  }

  const renderGenres = () => {
    return (
      <div>
        {result.genre_ids
          .map((genreId) => {
            const genre = genres.find((g) => g.id === genreId)
            return genre ? (
              <Fragment key={genreId}>
                <Link
                  className="text-gray-300 hover:text-yellow-200 underline underline-offset-3 "
                  href={`/genres/${genreId}`}
                >
                  {genre.name}
                </Link>
              </Fragment>
            ) : null
          })
          .filter((genre) => genre !== null)
          .slice(0, 3)
          .reduce((prev, curr) => [prev, ', ', curr])}
      </div>
    )
  }

  const vote_average = result.vote_average.toFixed(1)
  return (
    <div className="mb-4  sm:mb-0 p-2 text-gray-300   active:text-red-400 ">
      <Image
        className="cursor-pointer"
        onClick={goToDetail}
        aspectratio={500 / 750}
        src={`${baseURL}${result.poster_path}`}
        width={500}
        height={750}
        alt={result.title || 'image'}
      />
      <div className="p-2">
        <div className="flex justify-between align-center font-light py-1">
          <div className="flex border-gray-500 border-2 rounded-md px-2 py-1">
            IMDb:<p className=" pl-1 font-semibold">{vote_average}</p>
          </div>
          <div className="flex" onClick={setFavoriteStatus}>
            {isFavorite ? (
              <HeartIconSolid className="h-5 text-red-400 ml-4 mr-0" />
            ) : (
              <HeartIcon className="h-5 ml-3 mr-1" />
            )}
          </div>

          <div>{media_type === 'movie' ? 'Film' : 'TV'}</div>
        </div>
        <div className="flex ">{renderGenres()}</div>
      </div>
    </div>
  )
}

export default Card
