import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { RegisterUserFields } from 'hooks/react-hook-form/useRegister'
import { UserType } from 'models/auth'

export const fetchUser = async () =>
  apiRequest<undefined, UserType>('get', apiRoutes.FETCH_USER)

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

export const uploadAvatar = async (formData: FormData, id: string) =>
  apiRequest<FormData, void>(
    'post',
    `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${id}`,
    formData,
  )
