import { UserType } from 'models/auth'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as API from 'api/Api'
import { routes } from 'constants/routesConstants'
import authStore from 'stores/auth.store'

export const useAuthIdentification = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const checkLogin = async () => {
    try {
      const response = await API.fetchMe()
      const authData: UserType = response.data

      // If there is no data or the user is not authenticated, redirect to login
      if (
        !authData ||
        (!authData.id &&
          location.pathname !== routes.SIGNUP &&
          location.pathname !== routes.HOME)
      ) {
        authStore.signout()
        navigate(routes.LOGIN)
        return
      }

      // User is authenticated, you can do something else here if needed
      console.log('User is authenticated:', authData)
    } catch (error) {
      console.error('Error while checking authentication:', error)

      // Redirect to login page in case of error
      // authStore.signout()
      // navigate(routes.LOGIN)
    }
  }

  useEffect(() => {
    if (location.pathname) checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
}
