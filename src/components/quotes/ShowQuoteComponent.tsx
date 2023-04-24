import { observer } from 'mobx-react'
import { QuoteNumberType } from 'models/auth'
import React, { FC } from 'react'
import { useQuery } from 'react-query'
import * as API from 'api/Api'
import { QuoteType } from 'models/quote'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'

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
    <div key={quoteData?.data.quote.id} className="quoteComponent">
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
      <p>{quoteData?.data.quote.text || 'ni ni'}</p>
      <p>{quoteData?.data.quote.author.first_name}</p>
    </div>
  )
}

export default observer(ShowQuoteComponent)
