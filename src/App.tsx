import { FC } from 'react'
import Routes from 'routes/Routes'
import { usePageIdentification } from 'hooks/usePageIdentification'
import { observer } from 'mobx-react'
import { useAuthIdentification } from 'hooks/useAuthIdentification'

const App: FC = () => {
  usePageIdentification()
  useAuthIdentification()
  return <Routes />
}

export default observer(App)
