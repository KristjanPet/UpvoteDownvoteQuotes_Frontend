import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className=" footer">
      <div className="d-flex align-items-center justify-content-between  w-100 ">
        <img src="images/footerLogo.svg" alt="FooterLogo" />
        <p className="text-white">All Rights Reserved | skillupmentor.com</p>
      </div>
    </footer>
  )
}

export default Footer
