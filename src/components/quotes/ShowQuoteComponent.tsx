import { observer } from 'mobx-react'
import { QuoteNumberType } from 'models/auth'
import React, { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import * as API from 'api/Api'
import { QuoteType } from 'models/quote'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { AiOutlineSetting } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'
import Avatar from 'react-avatar'
import authStore from 'stores/auth.store'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import { CheckVoteType } from 'models/vote'
import CreateQuoteForm from './CreateQuoteForm'
import UpdateQuoteForm from './UpdateQuoteForm'

interface Props {
  quote: QuoteNumberType
}

const ShowQuoteComponent: FC<Props> = ({ quote }) => {
  // const { data: quoteData } = useQuery<{ data: QuoteNumberType } | undefined>(
  //   [quote?.id],
  //   () => API.fetchQuote(quote?.id || ''),
  // )
  const [didClick, setDidClick] = useState(false)
  const { data: checkVoteData } = useQuery<{ data: CheckVoteType } | undefined>(
    ['checkVote', didClick],
    () => API.checkVote(quote.quote.id || ''),
  )

  console.log(checkVoteData?.data)

  const [votedDown, setVotedDown] = useState(false)
  const [votedUp, setVotedUp] = useState(false)

  // useEffect(() => {
  //   console.log(checkVoteData?.data.didVote)
  //   if (checkVoteData?.data.didVote) {

  //     setVotedUp(checkVoteData.data.upDown === true)
  //     setVotedDown(checkVoteData.data.upDown === true)
  //   }
  // }, [checkVoteData])

  const handleVote = async (upDown: boolean) => {
    setDidClick(!didClick)
    if (upDown) {
      if (!checkVoteData?.data.upDown) {
        await API.postUpVote(quote.quote.id)
        setVotedUp(true)
        setVotedDown(false)
      } else if (checkVoteData.data.upDown) {
        // await API.removeVote(quote.quote.id) TODO
        setVotedUp(false)
        setVotedDown(false)
      }
    } else {
      if (checkVoteData?.data.upDown) {
        await API.postDownVote(quote.quote.id)
        setVotedUp(false)
        setVotedDown(true)
      } else if (!checkVoteData?.data.upDown) {
        // await API.removeVote(quote.quote.id) TODO
        setVotedUp(false)
        setVotedDown(false)
      }
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
          <RiArrowUpSLine size={24} color={votedUp ? 'orange' : 'black'} />
        </div>
        <div className="d-flex justify-content-center ">{quote.votes}</div>
        <div>
          <RiArrowDownSLine
            size={24}
            color={votedDown ? 'orange' : 'black'}
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
      {authStore.user?.id == quote.quote.author.id && (
        <div className="d-flex flex-column ">
          <UpdateQuoteForm quote_id={quote.quote.id} text={quote.quote.text} />
          <MdClose size={16} className="text-orange" />
        </div>
      )}
    </div>
  )
}

export default observer(ShowQuoteComponent)
