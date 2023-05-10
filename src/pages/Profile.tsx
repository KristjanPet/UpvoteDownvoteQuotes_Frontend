import ShowQuoteComponent from 'components/quotes/ShowQuoteComponent'
import Layout from 'components/ui/Layout'
import { FC, useState } from 'react'
import Avatar from 'react-avatar'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import * as API from 'api/Api'
import { QuoteNumberType, UserType } from 'models/auth'

// interface Props {
//   defaultValues?: UserType
// }

const Profile: FC = () => {
  const { userId } = useParams()
  const [pageNumber, setPageNumber] = useState(1)

  const { data: userData } = useQuery<{ data: UserType } | undefined>(
    ['user', userId],
    () => API.fetchUser(userId || ''),
    { enabled: !!userId },
  )
  const { data: quoteNumber } = useQuery<{ data: number } | undefined>(
    ['quoteNumber', userId],
    () => API.fetchQuotesNumber(userId || ''),
    { enabled: !!userId },
  )
  const { data: votesNumber } = useQuery<{ data: number } | undefined>(
    ['voteNumber', userId],
    () => API.fetchVotesNumber(userId || ''),
    { enabled: !!userId },
  )

  const { data: mostLikedQuotesData } = useQuery<
    { data: QuoteNumberType[] } | undefined
  >(
    ['mostLikedQuotes', userId, pageNumber],
    () => API.getMostLikedQuotesByUser(userId || '', pageNumber),
    { enabled: !!userId },
  )

  const { data: recentQuotesData } = useQuery<
    { data: QuoteNumberType[] } | undefined
  >(
    ['mostRecentQuotes', userId, pageNumber],
    () => API.getRecentQuotesByUser(userId || '', pageNumber),
    { enabled: !!userId },
  )

  const { data: likedQuotesData } = useQuery<
    { data: QuoteNumberType[] } | undefined
  >(
    ['likedQuotes', userId, pageNumber],
    () => API.getLikedQuotesByUser(userId || '', pageNumber),
    {
      enabled: !!userId,
    },
  )

  const quotesComponent = (data: QuoteNumberType[]) =>
    data?.map((quote, index) => (
      <div key={index}>
        <div className="col">
          <ShowQuoteComponent key={quote?.quote.id} quote={quote} />
        </div>
        <div className="w-100"></div>
      </div>
    )) || []

  const showQuoteComponent = (number: number) => {
    // console.log(userData?.data.quote)

    switch (number) {
      case 1:
        if (mostLikedQuotesData && mostLikedQuotesData.data.length > 0) {
          return (
            <div className="row">
              {quotesComponent(mostLikedQuotesData.data)}
            </div>
          )
        } else {
          return (
            <div>
              <p>No quotes found for this user.</p>
            </div>
          )
        }
      case 2:
        // console.log(recentQuotesData || 'prazno sve')
        if (recentQuotesData && recentQuotesData.data.length > 0) {
          return (
            <div className="row">{quotesComponent(recentQuotesData.data)}</div>
          )
        } else {
          return (
            <div>
              <p>User did not publish any ecent quotes.</p>
            </div>
          )
        }

      case 3:
        if (likedQuotesData && likedQuotesData.data.length > 0) {
          return (
            <div className="row">{quotesComponent(likedQuotesData.data)}</div>
          )
        } else {
          return (
            <div>
              <p>No liked quotes found for this user.</p>
            </div>
          )
        }
    }
  }

  return (
    <Layout>
      <div className="d-flex justify-content-center rectangle flex-column"></div>
      <div className="d-flex justify-content-center flex-column profile">
        <div className="align-self-center mb-3 mg-top-100">
          <Avatar
            className="signup-avatar"
            round
            src={
              userData?.data.avatar
                ? `${process.env.REACT_APP_API_URL}/files/${userData.data.avatar}`
                : '/images/blankAvatarIcon.svg'
            }
            alt={
              userData?.data.first_name || userData?.data.last_name
                ? `${userData.data.first_name} ${userData.data.last_name}`
                : userData?.data.email
            }
          />
        </div>
        <div className="align-self-center text-white">
          <h2>
            {userData?.data.first_name || ''} {userData?.data.last_name || ''}
          </h2>
        </div>
        <div className=" align-self-center profile-box  d-flex justify-content-center gap-5">
          <div className="text-center">
            <p className="mb-1 signup-text-small">Quotes</p>
            <p className="m-0 text-orange h4">{quoteNumber?.data || ''}</p>
          </div>
          <div className="text-center">
            <p className="mb-1 signup-text-small">Quotastic karma</p>
            <p className="m-0 h4">{votesNumber?.data || ''}</p>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column quote-component-pozition">
        <div className="row">
          <div className="col-md-4 col-12">
            <p className="text-orange font-size-24 text-align-center px-3">
              Most liked quotes
            </p>
            {showQuoteComponent(1)}
          </div>
          <div className="col-md-4 col-12">
            <p className="font-size-24 text-align-center px-3">Most recent</p>
            {showQuoteComponent(2)}
          </div>
          <div className="col-md-4 col-12">
            <p className="font-size-24 text-align-center px-3">Liked</p>
            {showQuoteComponent(3)}
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            className="login-button-litlle mt-4"
          >
            Load more
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
