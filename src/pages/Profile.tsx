import ShowQuoteComponent from 'components/quotes/ShowQuoteComponent'
import DashboardLayout from 'components/ui/DashboardLayout'
import Layout from 'components/ui/Layout'
import { FC } from 'react'
import Avatar from 'react-avatar'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import authStore from 'stores/auth.store'
import * as API from 'api/Api'
import { QuoteNumberType, UserType } from 'models/auth'

// interface Props {
//   defaultValues?: UserType
// }

const Profile: FC = () => {
  const { userId } = useParams()
  const { data: userData } = useQuery<{ data: UserType } | undefined>(
    ['user'],
    () => API.fetchUser(userId || ''),
  )
  const { data: quoteNumber } = useQuery<{ data: number } | undefined>(
    ['quoteNumber'],
    () => API.fetchQuotesNumber(userId || ''),
  )
  const { data: votesNumber } = useQuery<{ data: number } | undefined>(
    ['voteNumber'],
    () => API.fetchVotesNumber(userId || ''),
  )
  const { data: mostLikedQuotesData } = useQuery<
    { data: QuoteNumberType[] } | undefined
  >(['mostLikedQuotes'], () => API.getMostLikedQuotesByUser(userId || ''))
  const { data: recentQuotesData } = useQuery<
    { data: QuoteNumberType[] } | undefined
  >(['mostRecentQuotes'], () => API.getRecentQuotesByUser(userId || ''))
  const { data: likedQuotesData } = useQuery<
    { data: QuoteNumberType[] } | undefined
  >(['likedQuotes'], () => API.getLikedQuotesByUser(userId || ''))

  const quotesComponent = (data: QuoteNumberType[]) =>
    data?.map((quote) => (
      <div key={quote.quote.id}>
        <ShowQuoteComponent key={quote?.quote.id} quote={quote} />
      </div>
    )) || []

  const showQuoteComponent = (number: number) => {
    // console.log(userData?.data.quote)

    switch (number) {
      case 1:
        if (mostLikedQuotesData && mostLikedQuotesData.data.length > 0) {
          return <div>{quotesComponent(mostLikedQuotesData.data)}</div>
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
          return <div>{quotesComponent(recentQuotesData.data)}</div>
        } else {
          return (
            <div>
              <p>User did not publish any ecent quotes.</p>
            </div>
          )
        }

      case 3:
        if (likedQuotesData && likedQuotesData.data.length > 0) {
          return <div>{quotesComponent(likedQuotesData.data)}</div>
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
      <div className="d-flex justify-content-center rectangle flex-column">
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

      <div className="d-flex quote-component-pozition mx-3">
        <div className="mb-1">
          <p className="text-orange font-size-24 text-align-center px-3">
            Most liked quotes
          </p>
          {showQuoteComponent(1)}
        </div>
        <div>
          <p className="font-size-24 text-align-center px-3">Most recent</p>
          {showQuoteComponent(2)}
        </div>
        <div className="">
          <p className="font-size-24 text-align-center px-3">Liked</p>
          {showQuoteComponent(3)}
        </div>
      </div>
    </Layout>
  )
}

export default Profile
