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
  console.log('baseURL', baseURL)
  console.log('backdrop_path', backdrop_path)
  console.log('poster_path', poster_path)
  console.log('videoId', videoId)
  console.log('showImage', showImage)
  console.log('showVideo', showVideo)
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
      ) : showVideo ? (
        <div className=" object-cover w-[100%]">
          <YouTube
            videoId={videoId}
            options={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 1,
                controls: 0,
                modestbranding: 1,
                showinfo: 0
              }
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

export default MediaPlayer
