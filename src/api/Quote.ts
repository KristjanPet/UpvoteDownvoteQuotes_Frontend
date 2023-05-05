import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { QuoteNumberType } from 'models/auth'

export const fetchQuote = async (id: string) =>
  apiRequest<undefined, QuoteNumberType>(
    'get',
    apiRoutes.FETCH_QUOTE + '/' + id,
  )

export const fetchRandomQuote = async () =>
  apiRequest<undefined, QuoteNumberType>(
    'get',
    apiRoutes.FETCH_QUOTE + '/random/get',
  )

export const getAllMostLikedQuotes = async () =>
  apiRequest<undefined, QuoteNumberType[]>('get', apiRoutes.FETCH_QUOTE)

export const getAllRecentQuotes = async () =>
  apiRequest<undefined, QuoteNumberType[]>(
    'get',
    apiRoutes.FETCH_QUOTE + '/recent/get',
  )

export const getMostLikedQuotesByUser = async (id: string) =>
  apiRequest<undefined, QuoteNumberType[]>(
    'get',
    apiRoutes.FETCH_QUOTE + '/' + id + '/mostliked',
  )

export const getRecentQuotesByUser = async (id: string) =>
  apiRequest<undefined, QuoteNumberType[]>(
    'get',
    apiRoutes.FETCH_QUOTE + '/' + id + '/recent',
  )

export const getLikedQuotesByUser = async (id: string) =>
  apiRequest<undefined, QuoteNumberType[]>(
    'get',
    apiRoutes.FETCH_QUOTE + '/' + id + '/liked',
  )

export const postUpVote = async (id: string) =>
  apiRequest<undefined, QuoteNumberType[]>(
    'post',
    apiRoutes.FETCH_QUOTE + '/' + id + '/upvote',
  )

export const postDownVote = async (id: string) =>
  apiRequest<undefined, QuoteNumberType[]>(
    'post',
    apiRoutes.FETCH_QUOTE + '/' + id + '/downvote',
  )

export const checkVote = async (id: string) =>
  apiRequest<undefined, QuoteNumberType[]>(
    'get',
    apiRoutes.FETCH_QUOTE + '/' + id + '/check',
  )
