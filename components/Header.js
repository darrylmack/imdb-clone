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
    <div className="bg-gray-900 text-gray-200 flex flex-col  items-center p-6 py-8 select-none sm:flex-row justify-between">
      <div className="flex">
        <img
          src="/images/reel-favorites-logo-white.png"
          width='200px'
          height='auto'
          alt="Reel Favorites Logo"
          className="cursor-pointer active:brightness-110"
          onClick={() => router.push('/')}
        />
      </div>{' '}
      <div className="flex">
        <button onClick={() => router.push('/')}>
          <HeaderIcon title="HOME" Icon={HomeIcon} />
        </button>
        <button onClick={() => router.push('/about')}>
          <HeaderIcon title="ABOUT" Icon={InformationCircleIcon} />
        </button>
        <button onClick={() => router.push('/account')}>
          <HeaderIcon title="ACCOUNT" Icon={UserIcon} />
        </button>
      </div>
    </div>
  )
}

export default Header
