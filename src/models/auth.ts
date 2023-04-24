import { QuoteType } from './quote'

export type UserType = {
  id: string
  first_name: string
  last_name: string
  email: string
  quote?: QuoteType[]
  avatar?: string
}

export interface QuoteNumberType {
  quote: QuoteType
  voteNum: number
}
