import React from 'react'

const HeaderIcon = ({ Icon, title }) => {
  return (
    <div className="flex flex-col mx-4 hover:text-white hover:cursor-pointer active:text-red-500 lg:mx-6">
      <Icon className="h-8" />
      <p className="my-2">{title}</p>
    </div>
  )
}

export default HeaderIcon
