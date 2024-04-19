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
        <button onClick={() => router.push('/about')}>
          <HeaderIcon title="ABOUT" Icon={InformationCircleIcon} />
        </button>
        <button onClick={() => router.push('/profile')}>
          <HeaderIcon title="PROFILE" Icon={UserIcon} />
        </button>
      </div>

      <div className="flex">
        <Image
          src="/images/real-favorites-logo.png"
          width={200}
          height={63}
          alt="Reel Favorites Logo"
          className="cursor-pointer active:brightness-110"
          onClick={() => router.push('/')}
        />
      </div>
    </div>
  )
}

export default Header
