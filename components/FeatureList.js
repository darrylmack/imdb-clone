import YouTube from 'react-youtube'

const FeatureList = ({ features }) => {
  const options = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0
    }
  }

  const playVideo = (key) => {
    console.log('Play Video: ', key)
  }

  const renderFeatures = () => {
    return features?.map((feature) => {
      return (
        <div
          onClick={() => playVideo(feature.key)}
          className="w-[100%]  px-4 mb-4 cursor-pointer"
        >
          <img
            src={`https://img.youtube.com/vi/${feature.key}/0.jpg`}
            width="100%"
            height="auto"
            className="object-cover min-w-full bg-transparent"
          />
          {/* <YouTube
            videoId={feature.key}
            opts={options}
            iframeClassName={'object-cover min-w-full h-[100%]'}
          /> */}
          <h2 className="text-white text-left -mt-8 text-lg pl-2 font-light">
            {feature.name}
          </h2>
        </div>
      )
    })
  }

  return (
    <div className="bg-black select-none p-2  sm:grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {renderFeatures()}
    </div>
  )
}

export default FeatureList
