import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

import useAuthStore from '../../auth/stores/Auth.store'

const HomeLayout                            = () => {
  const navigate                            = useNavigate()
  const userId                              = useAuthStore(( state ) => state.userId)
  
  useEffect(() => {
    if( !userId ) return navigate( '/login' )
  }, [ navigate, userId ])

  return (
    <>
      <Outlet />
    </>
  )
}

export default HomeLayout
