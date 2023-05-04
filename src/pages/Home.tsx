import Layout from 'components/ui/Layout'
import { routes } from 'constants/routesConstants'
import { QuoteNumberType } from 'models/auth'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import * as API from 'api/Api'
import ShowQuoteComponent from 'components/quotes/ShowQuoteComponent'
import { useQuery } from 'react-query'

const Home: FC = () => {
  const { data: mostLikedQuotesData } = useQuery<
    { data: QuoteNumberType[] } | undefined
  >(['mostLikedQuotes'], () => API.getAllMostLikedQuotes())

  const quotesComponent = (data: QuoteNumberType[]) =>
    data?.map((quote) => (
      <div key={quote.quote.id}>
        <ShowQuoteComponent key={quote?.quote.id} quote={quote} />
      </div>
    )) || []

  const showLikedQuoteComponent = () => {
    // console.log(userData?.data.quote)
    if (mostLikedQuotesData && mostLikedQuotesData.data.length > 0) {
      return (
        <>
          <div className="d-flex flex-column flex-wrap gap-3">
            {quotesComponent(mostLikedQuotesData.data)}
          </div>{' '}
        </>
      )
    } else {
      return (
        <div>
          <p>No quotes found for this user.</p>
        </div>
      )
    }
  }

  return (
    <Layout>
      <div className="home-page-container d-flex flex-column">
        <div className="d-flex justify-content-between mx-5 pl-40">
          <div className="d-flex flex-column w-50">
            <h1 className="font-size-98 line-space-0">
              Welcome <br /> to <span className="text-orange">Quotastic</span>{' '}
            </h1>
            <p className="line-space-0 font-size-24 w-530 ">
              Quotastic is free online platform for you to explore the quips,
              quotes, and proverbs. Sign up and express yourself.
            </p>
            <NavLink to={routes.SIGNUP} className={'text-decoration-none mt-4'}>
              <button className="signup-button-litlle">Sign up</button>
            </NavLink>
          </div>
          <div className="d-flex flex-column">
            <img
              src="/images/homePageQuote.svg"
              // className='bg-light'
              alt="Add"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mg-top-150 pl-40">
          <p className="font-size-61 text-center line-space-0">
            Explore the world of <br />{' '}
            <span className="text-orange">fantastic quotes</span>{' '}
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-3 mg-top-150 pl-40">
          <div className="d-flex flex-column w-50">
            <p className="font-size-35 text-center line-space-0 text-orange">
              Most upvoted quotes
            </p>
            <p className="text-center">
              Most upvoted quotes on the platform. Sign up or login to like the
              quotes and keep them saved in your profile
            </p>
          </div>
        </div>
        <div className="d-flex h-500">{showLikedQuoteComponent()}</div>
        <div className="d-flex justify-content-center align-items-center">
          <NavLink to={routes.SIGNUP} className={'text-decoration-none mt-4'}>
            <button className="login-button-litlle">Sign up to see more</button>
          </NavLink>
        </div>
      </div>
    </Layout>
  )
}

export default Home
