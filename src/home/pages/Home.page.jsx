

import useAuthStore from '../../auth/stores/Auth.store'

import { apiClient } from '../../auth/api/Axios.api'

import useAsyncStatus from '../../auth/hooks/useAsyncStatus.hook'

const HomePage                              = () => {
  const { clearUserId }                     = useAuthStore()
  const { run }                             = useAsyncStatus()

  const handleLogout                        = async () => {
    try {
      await run( apiClient.post( '/auth/logout' ) )

      clearUserId()
    } catch ( error ) {
      console.warn(error)
    }
  }

  return (
    <>
      <div className='flex min-h-screen max-h-full justify-center items-center bg-neutral-900'>
        <div>
          <button
            className='block w-54 p-4 text-white rounded-full bg-red-600 hover:bg-red-700 cursor-pointer shadow-2xl shadow-red-600/50'
            onClick={ handleLogout }>Logout</button>
        </div>
      </div>
    </>
  )
}

export default HomePage
