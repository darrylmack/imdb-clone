import Image from 'next/image'
import HeaderIcon from './HeaderIcon'
import {
  HomeIcon,
  UserIcon,
  InformationCircleIcon
} from '@heroicons/react/solid'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()
  return (
    <div className="bg-gray-700 text-gray-200 flex flex-col items-center p-6 py-8 select-none sm:flex-row justify-between">
      <div className="flex">
        <button onClick={() => router.push('/')}>
          <HeaderIcon title="HOME" Icon={HomeIcon} />
        </button>
      </div>
      <Image
        src="/images/not_imdb_logo.png"
        width={200}
        height={63}
        className="cursor-pointer active:brightness-110"
        onClick={() => router.push('/')}
      />
    </div>
  )
}

export default Header
