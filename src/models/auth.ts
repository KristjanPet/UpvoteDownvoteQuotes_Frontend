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
  votes: number
}

export interface UpdateUserFields {
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  confirm_password?: string
  avatar?: string
}
