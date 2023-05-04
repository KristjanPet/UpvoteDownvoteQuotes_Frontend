import { UserType } from './auth'

export interface QuoteType {
  id: string
  author: UserType
  text: string
}
