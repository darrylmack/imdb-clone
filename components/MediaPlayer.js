import { useState, useEffect } from 'react'
import Image from 'next/image'
import YouTube from 'react-youtube'

const MediaPlayer = ({
  baseURL,
  backdrop_path,
  poster_path,
  videoId,
  showImage,
  showVideo
}) => {
  const options = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0
    }
  }
  return (
    <div className="max-w-screen mx-auto">
      <div className="w-[100%] aspect-w-16 aspect-h-9 bg-black">
        {showImage ? (
          <Image
            layout="responsive"
            src={`${baseURL}${backdrop_path || poster_path}`}
            width={1280}
            height={720}
            alt="Show Image"
          />
        ) : showVideo ? (
          <div className=" aspect-w-16 aspect-h-9 ">
            <YouTube
              videoId={videoId}
              id={videoId}
              className=" h-full w-full rounded-lg"
              opts={options}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default MediaPlayer
