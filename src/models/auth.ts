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
  avatar?: string
}

export interface UpdatePasswordFields {
  old_password: string
  confirm_password: string
  password: string
}
