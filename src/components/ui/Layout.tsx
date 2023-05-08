import { FC, ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

interface Props {
  children: ReactNode | ReactNode[]
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div
        className="d-flex flex-column "
        style={{ minHeight: '100vh', height: 'auto' }}
      >
        <Navbar />
        <div className="container-xxl p-4">{children}</div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
