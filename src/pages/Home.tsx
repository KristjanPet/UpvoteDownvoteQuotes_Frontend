import Layout from 'components/ui/Layout'
import { routes } from 'constants/routesConstants'
import { QuoteNumberType } from 'models/auth'
import { FC, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import * as API from 'api/Api'
import ShowQuoteComponent from 'components/quotes/ShowQuoteComponent'
import { useQuery } from 'react-query'
import authStore from 'stores/auth.store'

const Home: FC = () => {
  const [randomQuote, setRandomQuote] = useState<QuoteNumberType>()
  const { data: mostLikedQuotesData } = useQuery<
    { data: QuoteNumberType[] } | undefined
  >(['mostLikedQuotes'], () => API.getAllMostLikedQuotes())
  const { data: mostRecentQuotesData } = useQuery<
    { data: QuoteNumberType[] } | undefined
  >(['mostRecentQuotes'], () => API.getAllRecentQuotes())

  const quotesComponent = (data: QuoteNumberType[]) =>
    data?.map((quote) => (
      <div key={quote.quote.id}>
        <ShowQuoteComponent key={quote?.quote.id} quote={quote} />
      </div>
    )) || []

  useEffect(() => {
    const fetchRandomQuote = async () => {
      const randomQuote = (await API.fetchRandomQuote()).data as QuoteNumberType
      console.log(randomQuote)
      setRandomQuote(randomQuote)
    }
    fetchRandomQuote()
  }, [])

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
          <p>No quotes found.</p>
        </div>
      )
    }
  }

  const showRecentQuoteComponent = () => {
    // console.log(userData?.data.quote)
    if (mostRecentQuotesData && mostRecentQuotesData.data.length > 0) {
      return (
        <>
          <div className="d-flex flex-column flex-wrap gap-3">
            {quotesComponent(mostRecentQuotesData.data)}
          </div>{' '}
        </>
      )
    } else {
      return (
        <div>
          <p>No quotes found.</p>
        </div>
      )
    }
  }

  return (
    <>
      <Layout>
        {authStore.user ? (
          <div className="home-page-container d-flex flex-column border border-primary">
            <div className="d-flex justify-content-center mx-5 pl-40">
              <div className="d-flex flex-column ">
                <h1 className="line-space-0 text-orange text-center">
                  Quote of the day
                </h1>
                <h5 className="line-space-0 mb-4 text-center">
                  Quote of the day is randomly choosen quote.
                </h5>
                {randomQuote && (
                  <ShowQuoteComponent
                    key={randomQuote?.quote.id}
                    quote={randomQuote}
                  />
                )}
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center mb-3 mg-top-150 pl-40">
              <div className="d-flex flex-column w-50">
                <p className="font-size-35 text-center line-space-0 text-orange">
                  Most upvoted quotes
                </p>
                <p className="text-center">
                  Most upvoted quotes on the platform. Sign up or login to like
                  the quotes and keep them saved in your profile
                </p>
              </div>
            </div>
            <div className="d-flex h-500">{showLikedQuoteComponent()}</div>
            <div className="d-flex justify-content-center align-items-center">
              <NavLink
                to={routes.SIGNUP}
                className={'text-decoration-none mt-4'}
              >
                <button className="login-button-litlle">Load more</button>
              </NavLink>
            </div>
            <div className="d-flex justify-content-center align-items-center mb-3 mg-top-150 pl-40">
              <div className="d-flex flex-column w-50">
                <p className="font-size-35 text-center line-space-0 text-orange">
                  Most recent quotes
                </p>
                <p className="text-center">
                  Recent quotes updates as soon user adds new quote. Go ahed
                  show them that you seen the new quote and like the ones you
                  like.
                </p>
              </div>
            </div>
            <div className="d-flex h-500">{showRecentQuoteComponent()}</div>
            <div className="d-flex justify-content-center align-items-center">
              <NavLink
                to={routes.SIGNUP}
                className={'text-decoration-none mt-4'}
              >
                <button className="login-button-litlle">Load more</button>
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="home-page-container d-flex flex-column">
            <div className="d-flex justify-content-between mx-5 pl-40">
              <div className="d-flex flex-column w-50">
                <h1 className="font-size-98 line-space-0">
                  Welcome <br /> to{' '}
                  <span className="text-orange">Quotastic</span>{' '}
                </h1>
                <p className="line-space-0 font-size-24 w-530 ">
                  Quotastic is free online platform for you to explore the
                  quips, quotes, and proverbs. Sign up and express yourself.
                </p>
                <NavLink
                  to={routes.SIGNUP}
                  className={'text-decoration-none mt-4'}
                >
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
                  Most upvoted quotes on the platform. Sign up or login to like
                  the quotes and keep them saved in your profile
                </p>
              </div>
            </div>
            <div className="d-flex h-500">{showLikedQuoteComponent()}</div>
            <div className="d-flex justify-content-center align-items-center">
              <NavLink
                to={routes.SIGNUP}
                className={'text-decoration-none mt-4'}
              >
                <button className="login-button-litlle">
                  Sign up to see more
                </button>
              </NavLink>
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}

export default Home
