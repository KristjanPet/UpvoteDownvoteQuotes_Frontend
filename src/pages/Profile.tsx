import DashboardLayout from 'components/ui/DashboardLayout'
import Layout from 'components/ui/Layout'
import { FC } from 'react'
import Avatar from 'react-avatar'
import authStore from 'stores/auth.store'

const Profile: FC = () => {
  return (
    <Layout>
      <div className="d-flex justify-content-center rectangle flex-column">
        <div className="align-self-center mb-3 mg-top-100">
          <Avatar
            className="signup-avatar"
            round
            src={
              authStore.user?.avatar
                ? `${process.env.REACT_APP_API_URL}/files/${authStore.user?.avatar}`
                : '/images/blankAvatarIcon.svg'
            }
            alt={
              authStore.user?.first_name || authStore.user?.last_name
                ? `${authStore.user?.first_name} ${authStore.user?.last_name}`
                : authStore.user?.email
            }
          />
        </div>
        <div className="align-self-center text-white">
          <h2>
            {authStore.user?.first_name || ''} {authStore.user?.last_name || ''}
          </h2>
        </div>
        <div className=" align-self-center profile-box  d-flex justify-content-center gap-5">
          <div className="text-center">
            <p className="mb-1 signup-text-small">Quotes</p>
            <p className="m-0 text-orange h4">99</p>
          </div>
          <div className="text-center">
            <p className="mb-1 signup-text-small">Quotastic karma</p>
            <p className="m-0 h4">70</p>
          </div>
        </div>
      </div>
      <div className="d-flex bg-primary align-items-flex-end"></div>
    </Layout>
  )
}

export default Profile
