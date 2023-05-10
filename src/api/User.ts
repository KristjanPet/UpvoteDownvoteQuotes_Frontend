import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { RegisterUserFields } from 'hooks/react-hook-form/useRegister'
import { UpdatePasswordFields, UpdateUserFields, UserType } from 'models/auth'
import { QuoteType, createQuoteField } from 'models/quote'

export const fetchMe = async () =>
  apiRequest<undefined, UserType>('get', apiRoutes.FETCH_ME)

export const fetchUser = async (id: string) =>
  apiRequest<undefined, UserType>('get', apiRoutes.FETCH_USER + '/' + id)

// export const fetchUsers = async (pageNumber: number) =>
//   apiRequest<number, UserType[]>(
//     'get',
//     `${apiRoutes.FETCH_USERS}?page=${pageNumber}`,
//   )

export const signout = async () =>
  apiRequest<undefined, void>('post', apiRoutes.SIGNOUT)

export const login = async (data: LoginUserFields) =>
  apiRequest<LoginUserFields, UserType>('post', apiRoutes.LOGIN, data)

export const register = async (data: RegisterUserFields) =>
  apiRequest<RegisterUserFields, void>('post', apiRoutes.SIGNUP, data)

export const updateUser = async (data: UpdateUserFields) =>
  apiRequest<UpdateUserFields, void>(
    'patch',
    `${apiRoutes.FETCH_USER}/update-user`,
    data,
  )

export const updatePassword = async (data: UpdatePasswordFields) =>
  apiRequest<UpdatePasswordFields, void>(
    'patch',
    `${apiRoutes.FETCH_USER}/update-password`,
    data,
  )

export const createQuote = async (data: createQuoteField) =>
  apiRequest<createQuoteField, QuoteType>(
    'post',
    apiRoutes.FETCH_USER + '/myquote',
    data,
  )

export const updateQuote = async (data: createQuoteField, id: string) =>
  apiRequest<createQuoteField, QuoteType>(
    'patch',
    apiRoutes.FETCH_USER + '/quotes/' + id,
    data,
  )

export const deleteQuote = async (id: string) =>
  apiRequest<QuoteType, void>('delete', apiRoutes.FETCH_USER + '/quotes/' + id)

export const fetchQuotesNumber = async (id: string) =>
  apiRequest<undefined, UserType>(
    'get',
    apiRoutes.FETCH_USER + '/' + id + '/quotes',
  )

export const fetchVotesNumber = async (id: string) =>
  apiRequest<undefined, UserType>(
    'get',
    apiRoutes.FETCH_USER + '/' + id + '/votes',
  )

export const uploadAvatar = async (formData: FormData, id: string) =>
  apiRequest<FormData, void>(
    'post',
    `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${id}`,
    formData,
  )
