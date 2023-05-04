import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { RegisterUserFields } from 'hooks/react-hook-form/useRegister'
import { UpdateUserFields, UserType } from 'models/auth'

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
