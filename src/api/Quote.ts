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

export const getAllMostLikedQuotes = async (page: number) =>
  apiRequest<undefined, QuoteNumberType[]>(
    'get',
    `${apiRoutes.FETCH_QUOTE}/?page=${page}`,
  )

export const getAllRecentQuotes = async (page: number) =>
  apiRequest<undefined, QuoteNumberType[]>(
    'get',
    `${apiRoutes.FETCH_QUOTE}/recent/get?page=${page}`,
  )

export const getMostLikedQuotesByUser = async (id: string, page: number) =>
  apiRequest<undefined, QuoteNumberType[]>(
    'get',
    `${apiRoutes.FETCH_QUOTE}/${id}/mostliked?page=${page}`,
  )

export const getRecentQuotesByUser = async (id: string, page: number) =>
  apiRequest<undefined, QuoteNumberType[]>(
    'get',
    `${apiRoutes.FETCH_QUOTE}/${id}/recent?page=${page}`,
  )

export const getLikedQuotesByUser = async (id: string, page: number) =>
  apiRequest<undefined, QuoteNumberType[]>(
    'get',
    `${apiRoutes.FETCH_QUOTE}/${id}/liked?page=${page}`,
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
