import React from 'react'

interface Props {
  children: JSX.Element
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-gray-900 w-full flex flex-col">
      <div className="bg-gray-900 text-gray-100">{children}</div>
    </div>
  )
}

export default Layout
