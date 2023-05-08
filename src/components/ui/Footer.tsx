import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="footer w-100 ">
      <div className="d-flex align-items-center h-100 justify-content-between container-xxl">
        <img src="images/footerLogo.svg" alt="FooterLogo" />
        <p className="text-white mt-3">
          All Rights Reserved | skillupmentor.com
        </p>
      </div>
    </footer>
  )
}

export default Footer
