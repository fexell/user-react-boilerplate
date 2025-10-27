import { useState } from 'react'

/**
 * Hook for async api calls
 * @returns 
 */
const useAsyncStatus                        = () => {
  const [ status, setStatus ]               = useState({
    loading                                 : false,
    successMessage                          : null,
    errorMessage                            : null,
  })

  // Start state
  const start                               = () => setStatus({ loading: true, errorMessage: null, successMessage: null })
  // Set success state
  const setSuccess                          = ( message ) => setStatus({ loading: false, errorMessage: null, successMessage: message })
  // Set error state
  const setError                            = ( message ) => setStatus({ loading: false, errorMessage: message, successMessage: null })

  // Run promise
  const run                                 = async ( promise ) => {

    // Start/reset state
    start()

    try {

      // Run promise
      const result                          = await promise

      // Get message from result of api call
      const message                         = result?.data?.message || result?.data?.success

      // Set success
      setSuccess( message )

      // Return result
      return result

    } catch ( error ) {

      // Get message from error
      const message                         = error?.response?.data?.message || error?.response?.data?.error

      // Set error
      setError( message )

      // Throw error
      throw error
    }
  }

  // Return everything
  return { ...status, start, setSuccess, setError, run }
}

export default useAsyncStatus
