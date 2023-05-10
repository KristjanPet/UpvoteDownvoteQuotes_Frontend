import { observer } from 'mobx-react'
import { QuoteNumberType } from 'models/auth'
import { FC, useEffect, useState } from 'react'
import * as API from 'api/Api'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import Avatar from 'react-avatar'
import authStore from 'stores/auth.store'
import { Link, useLocation } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import UpdateQuoteForm from './UpdateQuoteForm'
import DeleteQuoteForm from './DeleteQuoteForm'

interface Props {
  quote: QuoteNumberType
}

const ShowQuoteComponent: FC<Props> = ({ quote }) => {
  const [quoteVotes, setQuoteVotes] = useState(quote.votes || 0)
  const location = useLocation()
  const isHomePage = location.pathname === routes.HOME
  const [voteType, setVoteType] = useState<string | null>(null)
  const [isAuthor, setIsAuthor] = useState(false)

  useEffect(() => {
    const checkVote = async () => {
      if (!quote.quote.id) return
      try {
        const { didVote, upDown, isAuthor } = (
          await API.checkVote(quote.quote.id)
        ).data
        setIsAuthor(isAuthor)
        if (isAuthor) return
        if (didVote === false) {
          setVoteType(null)
          return
        }
        if (upDown === true) setVoteType('upvote')
        if (upDown === false) setVoteType('downvote')
      } catch (e) {
        console.error(e)
      }
    }
    checkVote()
  }, [quote.quote.id])

  const handleVote = async (vote: boolean) => {
    if (isAuthor) return
    const api_request =
      vote === true
        ? API.postUpVote(quote.quote.id)
        : API.postDownVote(quote.quote.id)

    try {
      const res = (await api_request).data
      if (voteType === 'upvote' && vote === true) {
        setQuoteVotes(quoteVotes - 1)
        setVoteType(null)
        return
      }
      if (voteType === 'downvote' && vote === false) {
        setVoteType(null)
        setQuoteVotes(quoteVotes + 1)
        return
      }
      if (vote === true) {
        const change = voteType === 'downvote' ? quoteVotes + 2 : quoteVotes + 1
        setVoteType('upvote')
        setQuoteVotes(change)
        return
      }
      if (vote === false) {
        const change = voteType === 'upvote' ? quoteVotes - 2 : quoteVotes - 1
        setQuoteVotes(change)
        setVoteType('downvote')
      }
    } catch (e) {
      console.log(e)
    }
  }

  // const handleDownVote = async () => {
  //   await API.postDownVote(quote.quote.id)
  //   setVotedUp(false)
  //   setVotedDown(true)
  // }

  return (
    <div
      key={quote.quote.id}
      className="quoteComponent d-flex justify-content-between"
    >
      <div className="d-flex flex-column">
        <div onClick={() => handleVote(true)}>
          <RiArrowUpSLine
            size={24}
            color={voteType === 'upvote' ? 'orange' : 'black'}
          />
        </div>
        <div className="d-flex justify-content-center ">{quoteVotes}</div>
        <div>
          <RiArrowDownSLine
            size={24}
            color={voteType === 'downvote' ? 'orange' : 'black'}
            onClick={() => handleVote(false)}
          />
        </div>
      </div>
      <div className="d-flex flex-column flex-grow">
        <p className=" mt-3">{quote.quote.text || 'ni ni'}</p>
        <Link
          to={`${routes.PROFILE}/${quote.quote.author.id}`}
          className="text-decoration-none text-black"
        >
          <div className="d-flex">
            <Avatar
              className="quote-avatar mx-0"
              round
              src={
                quote.quote.author.avatar
                  ? `${process.env.REACT_APP_API_URL}/files/${quote.quote.author.avatar}`
                  : '/images/blankAvatarIcon.svg'
              }
              alt={
                quote.quote.author.first_name || quote.quote.author.last_name
                  ? `${quote.quote.author.first_name} ${quote.quote.author.last_name}`
                  : quote.quote.author.email
              }
            />
            <p className="mx-2 font-size-12 pt-1">
              {quote.quote.author.first_name} {quote.quote.author.last_name}
            </p>
          </div>
        </Link>
      </div>
      {authStore.user?.id === quote.quote.author.id && !isHomePage && (
        <div className="d-flex flex-column ">
          <UpdateQuoteForm quote_id={quote.quote.id} text={quote.quote.text} />
          <DeleteQuoteForm quote_id={quote.quote.id} />
        </div>
      )}
    </div>
  )
}

export default observer(ShowQuoteComponent)
