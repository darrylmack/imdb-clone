import Image from 'next/image'

const ShowImage = ({ baseURL, backdrop_path, poster_path }) => {
  return (
    <Image
      layout="responsive"
      src={`${baseURL}${backdrop_path || poster_path}`}
      width={1280}
      height={720}
      alt="Show Image"
    />
  )
}

export default ShowImage
