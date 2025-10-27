import { useState } from 'react'

const useAsyncStatus                        = () => {
  const [ status, setStatus ]               = useState({
    loading                                 : false,
    successMessage                          : null,
    errorMessage                            : null,
  })

  const start                               = () => setStatus({ loading: true, errorMessage: null, successMessage: null })
  const setSuccess                          = ( message ) => setStatus({ loading: false, errorMessage: null, successMessage: message })
  const setError                            = ( message ) => setStatus({ loading: false, errorMessage: message, successMessage: null })

  const run                                 = async ( promise ) => {
    start()

    try {
      const result                          = await promise
      const message                         = result?.data?.message || result?.data?.success

      setSuccess( message )

      return result
    } catch ( error ) {
      const message                         = error?.response?.data?.message || error?.response?.data?.error

      setError( message )

      throw error
    }
  }

  return { ...status, start, setSuccess, setError, run }
}

export default useAsyncStatus
