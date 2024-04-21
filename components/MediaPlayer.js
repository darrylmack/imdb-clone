import { useState, useEffect } from 'react'
import Image from 'next/image'
import YouTube from 'react-youtube'

const MediaPlayer = ({ baseURL, backdrop_path, poster_path }) => {
  const [showImage, setShowImage] = useState(true)
  const [setshowVideo, setSetshowVideo] = useState(false)
  const [videoID, setVideoID] = useState('')
  const [player, setPlayer] = useState(null)

  return (
    <div>
      {showImage ? (
        <Image
          layout="responsive"
          src={`${baseURL}${backdrop_path || poster_path}`}
          width={1280}
          height={720}
          alt="Show Image"
        />
      ) : (
        <YouTube
          videoId={videoID}
          onReady={onReady}
          options={{
            playerVars: {
              autoplay: 1,
              controls: 0,
              modestbranding: 1,
              showinfo: 0
            }
          }}
        />
      )}
    </div>
  )
}

export default MediaPlayer
