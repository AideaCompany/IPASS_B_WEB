import React, { FC } from 'react'

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="container mx-auto main_container ">{children}</div>
}

export default Layout
