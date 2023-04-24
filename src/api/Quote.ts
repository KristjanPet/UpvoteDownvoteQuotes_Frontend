import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { QuoteNumberType } from 'models/auth'

export const fetchQuote = async (id: string) =>
  apiRequest<undefined, QuoteNumberType>(
    'get',
    apiRoutes.FETCH_QUOTE + '/' + id,
  )
