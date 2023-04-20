import DashboardLayout from 'components/ui/DashboardLayout'
import Layout from 'components/ui/Layout'
import RegisterForm from 'components/user/RegisterForm'
import { FC } from 'react'

const Register: FC = () => {
  return (
    <Layout>
      <RegisterForm />
    </Layout>
  )
}

export default Register
