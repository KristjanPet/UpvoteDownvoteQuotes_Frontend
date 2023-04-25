import { observer } from 'mobx-react'
import { QuoteNumberType } from 'models/auth'
import React, { FC } from 'react'
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

interface Props {
  quote: QuoteType
}

const ShowQuoteComponent: FC<Props> = ({ quote }) => {
  const { data: quoteData } = useQuery<{ data: QuoteNumberType } | undefined>(
    [quote?.id],
    () => API.fetchQuote(quote?.id || ''),
  )
  // console.log(quoteData ? quoteData.data.quote.id: '')

  return (
    <div
      key={quoteData?.data.quote.id}
      className="quoteComponent d-flex justify-content-between"
    >
      <div className="d-flex flex-column">
        <div>
          <RiArrowUpSLine size={24} />
        </div>
        <div className="d-flex justify-content-center ">
          {quoteData?.data.voteNum}
        </div>
        <div>
          <RiArrowDownSLine size={24} />
        </div>
      </div>
      <div className="d-flex flex-column flex-grow">
        <p className=" mt-3">{quoteData?.data.quote.text || 'ni ni'}</p>
        <Link
          to={`${routes.PROFILE}/${quoteData?.data.quote.author.id}`}
          className="text-decoration-none text-black"
        >
          <div className="d-flex">
            <Avatar
              className="quote-avatar mx-0"
              round
              src={
                quoteData?.data.quote.author.avatar
                  ? `${process.env.REACT_APP_API_URL}/files/${quoteData?.data.quote.author.avatar}`
                  : '/images/blankAvatarIcon.svg'
              }
              alt={
                quoteData?.data.quote.author.first_name ||
                quoteData?.data.quote.author.last_name
                  ? `${quoteData?.data.quote.author.first_name} ${quoteData?.data.quote.author.last_name}`
                  : quoteData?.data.quote.author.email
              }
            />
            <p className="mx-2 font-size-12 pt-1">
              {quoteData?.data.quote.author.first_name}{' '}
              {quoteData?.data.quote.author.last_name}
            </p>
          </div>
        </Link>
      </div>
      {authStore.user?.id == quoteData?.data.quote.author.id && (
        <div className="d-flex flex-column ">
          <AiOutlineSetting size={16} className="mb-3 text-orange" />
          <MdClose size={16} className="text-orange" />
        </div>
      )}
    </div>
  )
}

export default observer(ShowQuoteComponent)
